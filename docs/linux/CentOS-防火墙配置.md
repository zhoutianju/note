# CentOS 防火墙配置

## CentOS6

查看当前状态：

```bash
/etc/init.d/iptables status
```

修改权限：

```bash
vi /etc/sysconfig/iptables
```

重启防火墙：

```bash
service iptables restart
```

## CentOS7

查看端口列表：

```bash
firewall-cmd --permanent --list-port
```

打开端口：

```bash
firewall-cmd --zone=public --add-port=80/tcp --permanent
firewall-cmd --reload
```

关闭端口：

```bash
firewall-cmd --zone=public --remove-port=80/tcp --permanent
firewall-cmd --reload
```

检查端口是否打开：

```bash
firewall-cmd --zone=public --query-port=8888/tcp
```

查看状态：

```bash
systemctl status firewalld
```