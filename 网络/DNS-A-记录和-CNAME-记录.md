# DNS A 记录和 CNAME 记录

## A 记录

A 记录（Adress 记录），创建域名和 IP 地址的映射，同时也可以设置域名的二级域名。

A 记录用途：可以在输入域名时不用输入 `WWW.` 来访问网站。

## CNAME 记录

CNAME 记录（别名记录），创建域名到另外域名的映射，通常用于同时提供 WWW 和 MAIL 服务的计算机，例如，有一台计算机名为 `host.mydomain.com`（A 记录）。它同时提供 WWW 和 MAIL 服务，为了便于用户访问服务。可以为该计算机设置两个别名（CNAME）：WWW 和 MAIL。这两个别名的全称就 `http://www.mydomain.com/` 和 `mail.mydomain.com`。实际上他们都指向 `host.mydomain.com`。

CNAME 记录用途：CNAME 将几个主机名指向一个别名，其实跟指向 IP 地址是一样的，因为这个别名也要做一个 A 记录的。但是使用 CNAME 记录可以很方便地变更 IP 地址。如果一台服务器有100个网站，他们都做了别名，该台服务器变更 IP 时，只需要变更别名的 A 记录就可以了。
