# vsftpd 配置虚拟用户

## 前置条件

配置虚拟用户需要安装 pam-devel，源码安装时，编译前，如果没有需要先安装，否则客户端登陆会出现 `530 Login incorrect` 错误

```bash
yum -y install pam-devel
```

## 配置

### 第一步：开放配置

修改 `/etc/vsftpd.conf`（源安装 `/etc/vsftpd/vsftpd.conf`）：

```
# 以下配置用于配置虚拟用户
# pam配置文件（对应 /etc/pam.d 下的配置文件名）
pam_service_name=vsftpd
# 启用虚拟用户
guest_enable=YES
# 虚拟用户宿主用户（本地用户）
guest_username=work
# 虚拟用户使用宿主用户权限
virtual_use_local_privs=YES
# 虚拟用户配置文件（用于为每个虚拟用户定制配置项）
user_config_dir=/etc/vsftpd/vconf
# 限制用户只能在自己根目录下
chroot_local_user=YES
chroot_list_enable=NO
allow_writeable_chroot=YES
```

### 第二步：创建虚拟用户名和密码

创建 vsftpd 配置文件夹

```bash
mkdir -p /etc/vsftpd
cd /etc/vsftpd

# 创建以下文件（文件名无所谓）
# 文件名以loginuser.txt为例
# 奇数行为用户名，偶数行为密码
vi loginuser.txt
```

`loginuser.txt`：

```
upload-user
pa55word
```

### 第三步：生成虚拟用户名和密码的数据库

创建数据库（数据库名称无所谓），数据库名以 `login.db` 为例，输入参数为第二步中的用户名密码文件名一致

```bash
db_load -T -t hash -f /etc/vsftpd/loginuser.txt /etc/vsftpd/login.db
```

> 生成数据库后用户名密码文件就没用了，出于安全考虑可以删掉

以上操作基于 `db4-utils`，如果没有请先安装

```bash
yum -y install db4-utils
```

### 第四步：配置 pam

创建或修改 `/etc/pam.d/vsftpd`（源码安装时需要创建，源安装需要修改，只保留下面两行，其他全注掉）

修改为以下下内容：（此处的 `db` 属性中的文件名需要与第三步中一致）

vsftpd：

```
auth     sufficient  pam_userdb.so  db=/etc/vsftpd/login
account  sufficient  pam_userdb.so  db=/etc/vsftpd/login
```

### 第五步：创建虚拟用户定制配置

文件夹名无所谓（但需要与第一步中 `user_config_dir` 属性匹配），以 `/etc/vsftpd/vconf` 为例

```bash
mkdir -p /etc/vsftpd/vconf
cd /etc/vsftpd/vconf
```

为某个虚拟用户创建配置文件，文件名需要和用户名一致，以 `work` 为例。

work：

```
# 指定虚拟用户的具体主路径
local_root=/home/work/shell
# 设定并发客户端访问个数
max_clients=10
# 设定该用户的最大传输速率，单位b/s
local_max_rate=20000000
```

### 第六步：重启 vsftpd 服务即可
