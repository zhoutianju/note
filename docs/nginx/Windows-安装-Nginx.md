# Windows 安装 Nginx

参考官方说明：[http://nginx.org/en/docs/windows.html](http://nginx.org/en/docs/windows.html)

下载：[http://nginx.org/en/docs/windows.html](http://nginx.org/en/docs/windows.html)

> **说明**：由于 Windows 编译环境不太好搭，就别用源码编译了，直接下载 zip 版本即可

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

配置开机启动（以 `d:\opt\nginx-1.16.1` 作为安装目录为例），`start.bat` 文件内容如下：

```batch
@ECHO OFF
REM Start Nginx
tasklist /FI "IMAGENAME eq nginx.exe" 2>NUL | find /I /N "nginx.exe">NUL
IF NOT "%ERRORLEVEL%"=="0" (
   REM Nginx is NOT running, so start it
   d:
   cd  \opt\nginx-1.16.1
   start nginx.exe
   ECHO Nginx started.
) else (
   ECHO Nginx is already running.
)
```

Windows 创建计划任务（Windows 开始菜单搜索“计划”即可），开机启动，修改了以下配置项

> 常规 > 不管用户是否登陆都要运行、使用最高权限运行  
> 触发器 > 启动时  
> 操作 > 启动程序 `start.bat`