# screen

```bash
# 创建新 session
screen -S zhoutianju
# 列出所有 session
screen -ls
# 恢复某个被 detach 的 session（这两个一样）
screen -d zhoutianju
screen -r zhoutianju
# 先踢掉前一个用户，再恢复（解决 Attached 连不上的问题）
screen -D -r zhoutianju
# 无法恢复则创建新的 screen
screen -R zhoutianju
```

内部命令

```bash
# 创建新 window
ctrl+a c
# 杀掉 window
ctrl+a k
# 切换到指定 window
ctrl+a (0-9)
# 重命名 window 的 title
ctrl+a A
# 切换最近使用的两个 window
ctrl+a ctrl+a
# 按顺序切换到下一个 window
ctrl+a space
# detach 当前 session
ctrl+a d
# 列出全部 window 的 title
ctrl+a '"'
# 滚动
ctrl+a up/down/pgUp/pgDown
# 杀死某个 hang 住的 tab
ctrl+a :kill
```

.screenrc

```bash
# 打开下方状态条
autodetach on 
startup_message off 
hardstatus alwayslastline 
shelltitle 'bash'
hardstatus string '%{gk}[%{wk}%?%-Lw%?%{=b kR}(%{W}%n*%f %t%?(%u)%?%{=b kR})%{= w}%?%+Lw%?%? %{g}][%{d}%l%{g}][ %{= w}%Y/%m/%d %0C:%s%a%{g} ]%{W}'
# 加载 .bash_profile
shell -$SHELL
```

