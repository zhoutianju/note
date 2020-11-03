# vsftpd 安装、配置

## 源码安装

### 安装
```bash
# 源码包下载地址（需要翻墙）
wget https://security.appspot.com/downloads/vsftpd-3.0.3.tar.gz

# 安装
make && make install

# 编译时-lcap 找不到，需要先安装libcap-devel
yum install libcap-devel

# 无法使用虚拟用户登录，原因：编译 vsftpd 时没有使用 pam，由于 vsftpd/dummy 下有假的 security/pam_appl.h 头文件，如果检测到没有安装 pam-devel 则不会链接 pam 的库，需要安装 pam-devel
yum -y install pam-devel
```

### 配置

将源码包中的 `vsftpd.conf` 拷贝到 `/etc`，修改相关配置

```
# 端口号
listen_port=2121
# 禁用匿名用户
anonymous_enable=NO
# 启用本地用户
local_enable=YES
# 启用写权限
write_enable=YES
# 启用文件夹信息
dirmessage_enable=YES
# 启用日志
xferlog_enable=YES
# 限制带宽（B/s）
local_max_rate=20000000
```

### 启动

```bash
/usr/local/sbin/vsftpd &
```

## 源安装

### 安装

```bash
yum -y install vsftpd
```

### 配置

```
# 默认是 NO
listen=YES
# 默认是 YES
listen_ipv6=NO
# 限制带宽（B/s）
local_max_rate=20M
# 匿名用户访问根目录，默认是 /var/ftp
anon_root=/root/ftp-root
# 设定匿名用户的最大传输速率，单位（B/s）
anon_max_rate=20000000
```

### 启动

```bash
# 建议用root权限运行，否则会有各种问题
service vsftpd start
```

## 常见错误

`426 Failure writing network stream.`：以上错误由磁盘空间不足导致。


`Starting vsftpd for vsftpd: 500 OOPS: vsftpd: not configured for standalone, must be started from inetd`：
`service vsftpd start`（yum安装）启动时报以上错误，需要增加 `listen=YES` 配置