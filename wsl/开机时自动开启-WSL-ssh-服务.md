# 开机时自动开启 WSL ssh 服务

## 背景

WSL 的默认终端软件虽然强于 CMD 但体验还是不太好（比如复制、粘贴等操作），习惯用 SSH 终端软件登录公司服务器，同时登录本地的 WSL。

由于 WSL 目前不支持 `systemd`（可参考：[https://github.com/systemd/systemd/issues/8036](https://github.com/systemd/systemd/issues/8036)），就需要每次开机或重启都先在 wsl 终端中执行 `sudo service ssh start` 才能正常使用 SSH 登录，可以尝试用下面的方法开机启动 WSL 的 ssh 服务。

## 操作方法

### 添加 sudo 白名单

WSL 修改 sudo 白名单（使用默认用户权限执行）：

```bash
sudo chmod +w /etc/sudoers
sudo echo "$USER ALL=(ALL:ALL) NOPASSWD:ALL" >> /etc/sudoers
sudo chmod -w /etc/sudoers
```

**必须要在 `/etc/sudoers` 文件最后写，否则有可能被前面的策略覆盖导致不生效**

### 配置 Windows 计划任务

配置计划任务参考：[Windows 安装 Nginx - 开机启动 - 计划任务](/nginx/Windows-安装-Nginx.html#计划任务)

Windows 环境启动 WSL ssh 服务命令：

```batch
C:\Windows\System32\wsl.exe sudo service ssh start
```