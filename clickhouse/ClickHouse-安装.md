# Clickhouse 安装

## yum 安装

```bash
# 安装 yum-utils
sudo yum install -y yum-utils

# 添加 ClickHouse 的 yum repo
sudo yum-config-manager --add-repo https://packages.clickhouse.com/rpm/clickhouse.repo

# 安装 ClickHouse
yum install -y clickhouse-server clickhouse-client

# 启动 ClickHouse 系统服务
systemctl start clickhouse-server.service
# 默认使用 9000 端口作为管理端口（与 php-fpm 默认端口冲突，如果部署了 php-fpm，需要修改其中一个的默认端口）

# 8123 是客户端访问的默认端口
clickhouse-client --port 8123
```