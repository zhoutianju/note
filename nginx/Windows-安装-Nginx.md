# Windows 安装 Nginx

参考官方说明：[http://nginx.org/en/docs/windows.html](http://nginx.org/en/docs/windows.html)

下载：[http://nginx.org/en/docs/windows.html](http://nginx.org/en/docs/windows.html)

说明：由于 Windows 编译环境不太好搭，就别用源码编译了，直接下载 zip 版本即可

安装步骤（本地安装了部分 MSYS2 的命令）：

```bash
# 解压
unzip nginx-*.zip
cd nginx-*

# 以下命令需要使用 Windows cmd 环境运行！

# 启动（后台）
start nginx

# 查看后台进程
tasklist /fi "imagename eq nginx.exe"

# 其他命令和 Linux 下一致
nginx -s stop	# fast shutdown
nginx -s quit	# graceful shutdown
nginx -s reload	# changing configuration, starting new worker processes with a new configuration, graceful shutdown of old worker processes
nginx -s reopen	# re-opening log files
```