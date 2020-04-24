# URL 参数改为 path 重定向

背景：两套服务，旧的 URL 使用传参方式，新的使用 RESTful 风格，旧服务的域名现在给新服务用了，但之前有人保存了旧服务某些页面的 URL 现在就访问不了了，会默认访问到首页，因此需要兼容旧服务的 URL 风格，重定向到新服务

目标：提取旧 URL 的参数，拼接到新 URL path 中并重定向

例如：`http://a.com/user?id=2333` -> `http://a.com/user/2333`

Nginx 配置如下：

```nginx
server {
    listen 8080;
    server_name a.com; # 说明：到这里之前还要经过域名的 Nginx，并且我无法修改，当前是一个下游的 Nginx

    # 中间省略其他配置 10000 行
    # 下面比较重要！！！

    # 旧版用户页 URL 重定向到新版用户页
    location ^~ /user {
        # 正则匹配出 URL 参数里的用户 ID，拼接到新版 URL path 中，重定向并把 URL 参数清空
        if ($args ~* "schedulerId=(\d+)") { # 正则匹配出一组参数
            set $id $1; # 这里必须要自定义一个变量赋值，不能在重定向里直接用 $1，不清楚为啥
            # set $args ''; # 重定向后默认带之前的 URL 参数，可以这样把参数置空，也可以用下面的方法
            rewrite /user http://a.com/user/$id? redirect; # 这里重定向的 URL 需要写域名，不然默认使用的是 http://a.com:8080/ 的域名，同理也可以重定向到任意其他域名
        }
    }
}
```