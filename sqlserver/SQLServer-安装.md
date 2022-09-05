# SQLServer 安装

### docker 安装 MSSQL

```bash
# 拉镜像
docker pull mcr.microsoft.com/mssql/server

# 启动
docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=yourStrong@Password" -p 1433:1433 -d mcr.microsoft.com/mssql/server:latest

# 查看状态
docker stats # 复制 CONTAINER ID

# 本地客户端连接，创建数据库
docker exec -it ${CONTAINER_ID} /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P yourStrong@Password
# 1> CREATE DATABASE test
# 2> go
```

### 客户端测试

```bash
# 查询版本
mssql-cli -S 10.26.62.137,1433 -U SA -P yourStrong@Password -d test -l 3 -Q 'select @@version'

# 建表、插入数据、查询
mssql-cli -S 10.26.62.137,1433 -U SA -P yourStrong@Password -d test -l 3
# test> CREATE TABLE word_count (
# .....     id INT PRIMARY KEY IDENTITY (1, 1),
# .....     word VARCHAR (50) NOT NULL
# ..... );
# Time: 0.252s
# Commands completed successfully.

# test> insert into word_count (word) values ('hello'), ('world');
# Time: 0.252s
# (2 rows affected)

# test> select * from word_count;
# Time: 0.452s
# +------+--------+
# | id   | word   |
# |------+--------|
# | 1    | hello  |
# | 2    | world  |
# +------+--------+
# (2 rows affected)
```