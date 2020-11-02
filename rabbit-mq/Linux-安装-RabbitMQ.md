# Linux 安装 RabbitMQ

## 安装

```bash
# 安装 erlang 环境（需要 root 权限）
sudo yum install erlang

# 指定一个你自己的安装路径
INSTALL_DIR='/opt'
cd $INSTALL_DIR

# 安装 RabbitMQ
wget https://www.rabbitmq.com/releases/rabbitmq-server/v3.6.15/rabbitmq-server-generic-unix-3.6.15.tar.xz
tar -xJvf rabbitmq-server-generic-unix-3.6.15.tar.xz
ln -s rabbitmq_server-3.6.15 rabbitmq
echo "RABBITMQ_HOME=$INSTALL_DIR/rabbitmq" >> ~/.bash_profile
echo 'export PATH=$PATH:$RABBITMQ_HOME/sbin' >> ~/.bash_profile
source ~/.bash_profile

# 启动 RabbitMQ
rabbitmq-server -detached
```

## 安装插件

```bash
# 后台管理插件，其他插件可根据需求安装
rabbitmq-plugins enable rabbitmq_management
# 项目中使用到了 STOMP 协议
rabbitmq-plugins enable rabbitmq_stomp
```

## 用户授权

默认用户（`guest`）只能本地访问。

> 如果搭建集群的话，只在一台节点上创建就可以，搭建集群后会同步元数据。

```bash
# 创建管理员用户，并赋权
rabbitmqctl add_user admin Pa55WOrd1
rabbitmqctl set_user_tags admin administrator

# 创建业务用户，并赋权
rabbitmqctl add_user abc Pa55WOrd2
# 赋权（参数说明：用户名 资源正则表达式 写权限 读权限）
rabbitmqctl set_permissions abc '.*' '.*' '.*'
```
