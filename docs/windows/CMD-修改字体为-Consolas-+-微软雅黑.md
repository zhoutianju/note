# CMD 修改字体为 Consolas + 微软雅黑

> 参考 CSDN 博客：[https://blog.csdn.net/u011086331/article/details/81542848](https://blog.csdn.net/u011086331/article/details/81542848)

**第一步**，备份以下注册表路径，可用于异常恢复：

1. `HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Console`
1. `HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\FontLink`

**第二步**，执行以下 Windows 批处理脚本，写入注册表：

CMD.reg：

```batch
Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Console\TrueTypeFont]
"0"="Lucida Console"
"00"="Consolas"
"936"="x"

[HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Console\RasterFonts]
"微软雅黑"="msyh.ttc"

[HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\FontLink\SystemLink]
"Consolas"=hex(7):4d,00,53,00,59,00,48,00,2e,00,54,00,54,00,43,00,2c,00,ae,5f,\
  6f,8f,c5,96,d1,9e,2c,00,31,00,32,00,38,00,2c,00,38,00,30,00,00,00,00,00
```

**第三步**，执行后重启