# Windows 一键上传 FTP 脚本配置

## 问题及思路

公司开发环境需要通过堡垒机跳转服务器，传输文件比较麻烦，搭建了 FTP 服务后，考虑在 Windows 开发环境下配置一套一键上传文件到 FTP 的脚本，增加日常工作效率。

## 配置步骤

在指定位置创建以下两个 bat 脚本：

* `ftp-cmd.bat`：

```bat
@echo off
set tmp=%*
set tmp=%tmp: =%
set tmp=%tmp:\=%
set tmp=%tmp::=%
echo open %FTP_SERVER_IP% > %tmp%
echo user %FTP_USER% %FTP_PASSWORD% >> %tmp%
echo %* >> %tmp%
echo quit >> %tmp%
ftp -v -i -n -s:%tmp% 2>&1
del %tmp%
```

* `copy-ftp-url.bat`：

```bat
@echo off
setlocal EnableDelayedExpansion
set filepath=%1
set dir=%cd%
set filename=!filepath:*%dir%\=!
set/p="ftp://%FTP_SERVER_IP%/%filename%"<nul | clip
```

注册表配置自定义右键菜单：

* 创建 `HKEY_CLASSES_ROOT\*\shell\upload ftp` 及 `HKEY_CLASSES_ROOT\*\shell\upload ftp\command` 两个目录

* 在 `HKEY_CLASSES_ROOT\*\shell\upload ftp\command` 的默认值中写入：`%DIR_TO_SAVE_BAT_SCRIPT%\ftp-cmd.bat put %1 && %DIR_TO_SAVE_BAT_SCRIPT%\copy-ftp-url.bat %1`

以上配置完成后，就可以在任意文件上邮件点击 `upload ftp` 实现上传该文件到 FTP，并把 FTP 的 URL 复制到剪贴板，在服务器上可运行 `wget $url` 进行下载

## 说明

主要思路是把交互式命令 `ftp` 转为非交互式，在 Windows 下比较麻烦，需要用到 `-s:file` 参数，把要执行的命令预先存到一个临时文件中，这一点在 Linux 下可用以下脚本轻松实现：

> `ftp-cmd.sh`：
```bash
#!/bin/bash
# Usage: ./ftp-cmd.sh put ${filename}
ftp -in ${FTP_SERVER_IP} << EOF
user ${FTP_USER} ${FTP_PASSWORD}
$@
quit
EOF
```

`ftp-cmd.bat` 脚本说明：

用输入的所有参数拼接为临时文件名（为了避免同时执行多个命令时有冲突），并替换掉其中一些 Windwos 下的文件名关键字

```bat
set tmp=%*
set tmp=%tmp: =%
set tmp=%tmp:\=%
set tmp=%tmp::=%
```

拼接 FTP 命令存到临时文件，使用 `-s:file` 指定命令从临时文件读取，执行后删除临时文件

```bat
echo open %FTP_SERVER_IP% > %tmp%
echo user %FTP_USER% %FTP_PASSWORD% >> %tmp%
echo %* >> %tmp%
echo quit >> %tmp%
ftp -v -i -n -s:%tmp% 2>&1
del %tmp%
```