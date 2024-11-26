# process-exporter

> Github: [https://github.com/ncabatoff/process-exporter](https://github.com/ncabatoff/process-exporter)
>
> _process-exporter 的作者已经不在维护了！_
>
> 参考其他博客：
>
> * [https://leohsiao.com/DevOps/%E7%9B%91%E6%8E%A7%E5%91%8A%E8%AD%A6/Prometheus/exporter.html](https://leohsiao.com/DevOps/%E7%9B%91%E6%8E%A7%E5%91%8A%E8%AD%A6/Prometheus/exporter.html)
> * [https://chenzhonzhou.github.io/2020/11/19/prometheus-process-exporter-jian-kong-fu-wu-jin-cheng/](https://chenzhonzhou.github.io/2020/11/19/prometheus-process-exporter-jian-kong-fu-wu-jin-cheng/)

* 包选择

<pre class="language-bash"><code class="lang-bash"># 检查操作系统的架构
uname -a
# > ... x86_64 ...
# 选择与操作系统架构对应的包 amd64 下载
# https://github.com/ncabatoff/process-exporter/releases
<strong>wget https://github.com/ncabatoff/process-exporter/releases/download/v0.7.10/process-exporter-0.7.10.linux-amd64.tar.gz
</strong></code></pre>

* 配置文件

场景：捕获特定格式的进程参数

```bash
ps -ef | grep hive | head -1
# > work       5140 164719  1 07:51 ?        00:03:17 /home/ke/bin/jdk/bin/java -Dproc_jar -Djava.net.preferIPv4Stack=true -Djava.net.preferIPv4Stack=true -XX:+HeapDumpOnOutOfMemoryError -Dyarn.log.dir=/home/ke/logs/hadoop-logs -Dyarn.log.file=hadoop.log -Dyarn.home.dir=/home/ke/bin/hadoop -Dyarn.root.logger=INFO,console -Djava.library.path=/home/ke/bin/hadoop/lib/native -Xmx2048m -Dhadoop.log.dir=/home/ke/logs/hadoop-logs -Dhadoop.log.file=hadoop.log -Dhadoop.home.dir=/home/ke/bin/hadoop -Dhadoop.id.str=work -Dhadoop.root.logger=INFO,console -Dhadoop.policy.file=hadoop-policy.xml -Dhadoop.security.logger=INFO,NullAppender org.apache.hadoop.util.RunJar /home/ke/bin/hive/lib/hive-cli-1.2.1.jar org.apache.hadoop.hive.cli.CliDriver --hiveconf mapred.job.name=wangjingyuan001_256698_287106770_320162129@10.201.13.32 --hiveconf tez.queue.name=bigdata --hiveconf mapred.job.queue.name=bigdata --hiveconf spark.app.name=wangjingyuan001_256698_287106770_320162129@10.201.13.32 --hiveconf hive.session.id=wangjingyuan001_256698_287106770_320162129@10.201.13.32 --hiveconf hive.execution.engine=tez --hiveconf spark.queue.name=bigdata -f /home/work/tmp/8f9c15313d7e443d1521414a6b6814f3_20240123.sql
# 目标：捕获 wangjingyuan001_256698_287106770_320162129@10.201.13.32 这个字段作为进程标识
```

配置文件 `config.yml`

```yaml
process_names:
  # diaodu executor subprocess
  - name: "{{.Matches.name}}"
    cmdline:
    - '.*[= ](?P<name>\S+?_\d+?_\d+?_\d+?@\d+.\d+.\d+.\d+).*'
```

* 启动脚本

自己编写的启动脚本 `start.sh`，可用于重启

```bash
#!/bin/bash

# set -x
set -eu

cd $(dirname $0)

if ps -ef | grep -v grep | grep -v start | grep -v deploy | grep process-exporter > /dev/null ; then
  kill -9 $(ps -ef | grep -v grep | grep -v start | grep -v deploy | grep process-exporter | awk '{print $2}')
fi

nohup ./process-exporter -config.path=config.yml 2>stderr.log >stdout.log &
```

* 定时重启

Issue: [https://github.com/ncabatoff/process-exporter/issues/282](https://github.com/ncabatoff/process-exporter/issues/282)

如果 process-exporter 的 metrics 接口一直有调用的话，process-exporter 就会把曾经检测到的进程都放到内存中（即使进程已经结束了），直到一段时间没有调用才会释放，这种方式对于定时采集 metrics 接口不太友好，会导致 metrics 接口的指标项目过多和 process-exporter 自身内存溢出的隐患，但由于 process-exporter 的作者不在维护了，相关的 issue 也没有人处理了，可以简单通过 crontab 定时重启的方式避免这个问题。

* 常用的 metrics

| metrics                                      | 说明     | 常用 labels                    |
| -------------------------------------------- | ------ | ---------------------------- |
| process\_exporter\_build\_info               | 用于测试   | instance, version            |
| namedprocess\_namegroup\_num\_procs          | 进程数量   | instance, groupname          |
| namedprocess\_namegroup\_cpu\_seconds\_total | CPU 使用 | instance, groupname, mode    |
| namedprocess\_namegroup\_memory\_bytes       | 内存使用   | instance, groupname, memtype |

&#x20;
