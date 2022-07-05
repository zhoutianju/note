# logrotate 切割日志

## 背景

需要 Flume 采集 Tomcat 的日志 catalina.out，就需要按天切分日志，过程中遇到一些坑，记录一下，供遇到相同问题的同学参考。

## 环境

CentOS 6.5（非 root 权限）、Tomcat 6.0.35、logrotate 3.15.1（由于后面提到的特殊需求，后来自己安装的 logrotate 版本，没有使用系统集成的版本）

## 方案

前期考虑过的几种方案：

1. logrotate、cronolog 等日志切分工具
2. 改造 Tomcat 的日志框架为可支持时间切分的 log4j 等
3. 自己写脚本重启 Tomcat、备份日志，cron 定时执行

最终基于以下优势决定使用 logrotate：

1. CentOS 集成的工具，不需要额外安装、配置环境（不需要高版本功能的话）
2. 对 Tomcat 本身脚本无侵入，不需要重启

## 实现

### 用到的路径

* 系统集成的 logrotate（最终没有使用）：`/usr/sbin/logrotate`
* 自己安装的 logrotate：`/home/hadoop/bin/logrotate`
* Tomcat 路径：`/home/hadoop/apache-tomcat-6.0.35`
* logrotate 配置文件路径：`/home/hadoop/apache-tomcat-6.0.35/tomcat-log-cut`

### logrotate 配置文件：tomcat-log-cut

```
/home/hadoop/apache-tomcat-6.0.35/logs/catalina.out {
    rotate 7
    dateext
    dateyesterday # 3.8.6 版本开始支持
    # datehourago # 3.14.0 版本开始支持
    dateformat .%Y%m%d
    notifempty
    missingok
    copytruncate
}
```

### 测试方法

logrotate 的 `-d` 参数用于调试，不会真正执行文件切分

```bash
/home/hadoop/bin/logrotate -s /tmp/logrotate.status -d -f /home/hadoop/apache-tomcat-6.0.35/tomcat-log-cut
```

logrotate的 `-v` 参数用于真正执行文件切分同时打印详细日志

```bash
/home/hadoop/bin/logrotate -s /tmp/logrotate.status -v -f /home/hadoop/apache-tomcat-6.0.35/tomcat-log-cut
```

### cron配置

```
# daily
0 0 * * * cd /your/conf/logrotate && /your/bin/logrotate -s daily.status -f daily.conf
# hourly
0 * * * * cd /your/conf/logrotate && /your/bin/logrotate -s hourly.status -f hourly.conf
```

## 遇到的几个坑

### 全路径

crontab 脚本中需要使用全路径，包括命令和文件，建议参考上面的模版配置

### root 权限

logrotate 默认使用 `/var/lib/logrotate.status` 记录状态，需要root权限，可使用 `-s /xxx/logrotate.status` 参数来指定其他有权限的文件记录状态

### 每日执行时间

之前在 logrotate 配置文件中配了 `daily` 参数，并且把配置文件放到了 `/etc/logrotate.d/` 下面（需要 root 权限），但由于 logrotate 的 `daily`/`weekly`/`monthly` 使用 anacron 来执行的，每天执行时间是凌晨 3 点左右，不想改 anacron 的配置了，于是就没有再把配置文件托管到 `/etc/logrotate.d/` 下，而是放到自定义的目录下手动配置 cron 来执行，可以精确指定到每天的 00:00 执行

### 时间后缀

由于Flume收集文件会根据文件创建时间做 HDFS 的分片，所以需要每天 00:00 分执行，而不是 23:59，而这样带来的问题是，时间后缀为当天的日期，但其实归档的日志是前一天的，查了下高版本的 logrotate 是支持配置文件里写 `dateyesterday` 参数的（[3.8.0](https://github.com/logrotate/logrotate/blob/master/ChangeLog.md#380---2011-06-21) 版本开始支持的），使用前一天的日期做文件后缀，附 logrotate github 地址：[https://github.com/logrotate/logrotate](https://github.com/logrotate/logrotate)

### 归档文件重名

由于测试时手动执行生成过日期后缀的日志归档文件，再次执行时会因为文件重名而失败，需要注意将测试的归档文件删掉或移走，不然可能会影响 cron 定时调起的执行结果，错误信息类似：`error: destination /home/hadoop/apache-tomcat-6.0.35/logs/catalina.out.20200217 already exists, skipping rotation`