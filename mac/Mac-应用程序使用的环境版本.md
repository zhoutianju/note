# Mac 应用程序使用的环境版本

起因：需要在 mac 上用到 eclipse mat 分析 dump 文件，mat 只能运行在 jdk11+

本地已存在：
* archive 安装的 oracal jdk 17（通过 $PATH 配置）
* dmg 包安装的 oracal jdk jdk1.8.0_261（可以在【系统偏好设置】里的【java 控制面板】看到具体路径）
* brew 安装的 openjdk@8(1.8.0_282)

安装了 mat 后，报 jdk 版本错误，说我用的是 1.8.0_282

于是通过 brew 安装了 openjdk@15，在启动还是报错，用

```bash
brew info openjdk@15
```

看了下，加了软连接

```bash
sudo ln -sfn /usr/local/opt/openjdk@15/libexec/openjdk.jdk /Library/Java/JavaVirtualMachines/openjdk-15.jdk
```

同时看了下

```bash
ls /usr/local/opt/openjdk -l
```

指向的也是新安装的 openjdk@15，再启动就可以了