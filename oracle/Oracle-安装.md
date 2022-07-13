# Oracle 安装

## Oracle Docker 安装部署

```bash
docker pull registry.cn-hangzhou.aliyuncs.com/helowin/oracle_11g
docker run -d -p 1521:1521 --name oracle registry.cn-hangzhou.aliyuncs.com/helowin/oracle_11g
docker ps 
docker exec -it oracle /bin/bash
```

### docker shell

```bash
cd /home/oracle
source .bash_profile
sqlplus /nolog
```

### sqlplus 命令

```sql
conn /as sysdba
alter user system identified by system;
alter user sys identified by system;
create user rd identified by 123456;
grant connect,resource,dba to rd; 
ALTER PROFILE DEFAULT LIMIT PASSWORD_LIFE_TIME UNLIMITED;
alter system set processes=2000 scope=spfile;
select * from dba_users t where t.username = 'rd';
```

### 远程 sqlcl 测试

```bash
./sql rd/123456@10.26.62.137:1521/helowin
```
