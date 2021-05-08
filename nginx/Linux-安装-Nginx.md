# Linux 安装 Nginx

### 安装

```bash
# 官网下载源码包
wget http://nginx.org/download/nginx-1.19.10.tar.gz
tar -xzvf nginx-1.19.10.tar.gz
cd nginx-1.19.10

# 配置安装（YOUR_DIST_PATH 设置为你需要安装的目标目录，例如：../nginx-1.19.10-dist）
./configure --prefix=${YOUR_DIST_PATH} --user=${USER} --with-stream --with-stream=dynamic --with-stream_realip_module --without-http_rewrite_module --without-http_gzip_module
make && make install

# 配置 PATH
echo "PATH=${PATH}:${YOUR_DIST_PATH}/sbin" >> ~/.bash_profile
source ~/.bash_profile

# 启动（非 root 账号把 80 端口的 server 注释掉，否则会报错：没权限绑定 80 端口）
nginx
```

### 配置文件 Demo

nginx 根配置文件 Demo `conf/nginx.conf`：

```nginx
# ...
load_module modules/ngx_stream_module.so;
# ...
http {
    # ...
    # server { # 非 root 账号把 80 端口的 server 注释掉
    #     # ...
    #     listen       80;
    #     # ...
    # }
    # ...

    include include-l7/*.conf; # 七层代理
}
stream {
    include include-l4/*.conf; # 四层代理
}
```

四层代理配置文件 Demo `conf/include-l4/db-proxy.conf`：

```nginx
server {
    listen {LISTEN_PORT};
    proxy_pass {REMOTE_HOST}:{REMOTE_PORT};
}
```

七层静态资源配置文件 Demo `conf/include-l7/static.conf`：

```nginx
server {
    listen {LISTEN_PORT};
    charset utf-8;
    # access_log "{NGINX_LOG_DIR}/access.log";
    # error_log "{NGINX_LOG_DIR}/error.log";
    location / {
        root "{YOUR_STATIC_PATH}"; # 以 / 结尾
        expires -1;
    }
}
```

七层后端负载均衡配置文件 Demo `conf/include-l7/upstream.conf`：

```nginx
upstream {UPSTREAM_NAME} {
    server {REMOTE_SERVER_HOST}:{REMOTE_SERVER_PORT};
    server {REMOTE_SERVER_HOST}:{REMOTE_SERVER_PORT};
}
server {
    listen {LISTEN_PORT};
    charset utf-8;
    location / {
        client_max_body_size 500m;
        proxy_pass http://{UPSTREAM_NAME}/;
        proxy_set_header Host $http_host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Scheme $scheme;
    }
}
```