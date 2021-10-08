# mysqldump

## 导出命令

```
mysqldump -h${host} -P${port} -u${user} -p${password} ${db} ${table} -w ${where} > ${dump_file}
```

例子

```
mysqldump -htjtx-126-196.58os.org -P23197 -ufeiliu_58dp -p4fd399017f290ea3 db58_feiliu storm_realtime_analyse_task_web6 -w "id >= 1441" --skip-lock-tables --set-gtid-purged=OFF > feiliu-dump.sql
```

### LOCK TABLES 问题

报错信息

```
mysqldump: Got error: 1044: Access denied for user 'feiliu_58dp'@'10.126.%' to database 'db58_feiliu' when doing LOCK TABLES
```

解决办法：增加参数`--skip-lock-tables`

### GTID 问题

报错信息

```
Warning: A partial dump from a server that has GTIDs will by default include the GTIDs of all transactions, even those that changed suppressed parts of the database. If you don't want to restore GTIDs, pass --set-gtid-purged=OFF. To make a complete dump, pass --all-databases --triggers --routines --events.
```

> GTID 是MySQL5.6+提供的全局事务ID，用于主从复制使用，开启GTID的数据库导出时都会报这个警告

***GTID是运维需要关注的，开发过程中使用一下方式简单解决***

解决办法：增加参数`--set-gtid-purged=OFF`

### 不导出`CREATE`语句

解决方法：增加参数` --no-create-info`

### 不导出结构化注释语句

解决方法：增加参数`--compact`

### 使用`REPLACE INTO`替代`INSERT INTO`

解决方法：增加参数`--replace`

## 导入命令

```
mysql -h${host} -P${port} -u${user} -p${password} ${db} < ${dump_file}
```

***注意，如果导入`mysqldump -w ${where}`导出的条件筛选sql文件，并且需要保留导入目的数据库的当前数据，需要把sql文件中的`drop table`和`create table`手动去掉***
