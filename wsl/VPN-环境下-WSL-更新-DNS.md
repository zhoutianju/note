# VPN 环境下 WSL 更新 DNS

## 背景

由于在公司需要链接 VPN，链接后 VPN 设置了 DNS，但每次 WSL 启动会重置 DNS 配置（`/etc/resolv.conf`），无法同步 Windows 配置

## 解决方案

在终端登录脚本中增加从 Windows 同步 DNS 的命令（WSL 是可以执行 Windows `ipconfig` 命令的）

```bash
echo '/mnt/c/Windows/system32/ipconfig.exe /all | iconv -f gbk -t utf-8 | grep "DNS 服务器" | cut -d ":" -f 2 | grep -e "^ [0-9]" | sed "s/^/nameserver/" | sudo tee /etc/resolv.conf > /dev/null' >> ~/.bash_profile
```

**具体过滤条件取决于你 Windows 的 `ipconfig` 命令的执行结果以及你本地的网络环境**