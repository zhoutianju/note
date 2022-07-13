# Docker 安装


### 集成脚本安装

官方文档：https://docs.docker.com/engine/install/centos/#install-using-the-convenience-script

```bash
# 更新 yum
yum update -y

# 使用阿里云 yum 镜像安装 docker
curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun

# 启动 docker 系统服务
systemctl start docker
# 查询 docker 系统服务状态
systemctl status docker
# 关闭 docker 系统服务
# systemctl stop docker
# 前台运行 dockerd
# dockerd

# docker hello-world 测试
docker run hello-world
```

### yum 安装（可选）

官方文档：https://docs.docker.com/engine/install/centos/#install-using-the-repository

```bash
# 安装 yum-utils
yum install -y yum-utils

# yum add-repo
yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo

# yum 安装 docker
yum install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

yum 库相关其他操作

```bash
# 列出目前所有 yum 库
yum repolist all

# yum disable
yum-config-manager --disable beike-salt-3000 
yum-config-manager --disable centos-extras

# yum enable
yum-config-manager --enable lianjia-extras
yum-config-manager --enable lianjia-base
```
