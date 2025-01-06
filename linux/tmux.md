# tmux

- 官方: https://github.com/tmux/tmux
- 参考: https://louiszhai.github.io/2017/09/30/tmux/

```bash

# for macos
brew info tmux
brew install tmux

# for centos7
# yum install http://galaxy4.net/repo/galaxy4-release-8-current.noarch.rpm
yum install http://galaxy4.net/repo/galaxy4-release-7-current.noarch.rpm
yum repolist
yum install gcc kernel-devel make ncurses-devel
yum info tmux
yum install tmux

# install plugins
mkdir -p ~/.tmux/plugins
cd ~/.tmux/plugins
git clone https://github.com/tmux-plugins/tmux-sensible.git
git clone https://github.com/tmux-plugins/tmux-resurrect.git
git clone https://github.com/tmux-plugins/tmux-continuum.git

# plugins runtime
cd ~/.local/share/tmux

# configuration
echo "set -g prefix C-a
set -g @continuum-restore 'on'
set -g @continuum-save-interval '15'
unbind C-b
bind C-a send-prefix
bind C-a last-window
bind Escape copy-mode
run-shell ~/.tmux/plugins/tmux-sensible/sensible.tmux
run-shell ~/.tmux/plugins/tmux-resurrect/resurrect.tmux
run-shell ~/.tmux/plugins/tmux-continuum/continuum.tmux
" > ~/.tmux.conf

# macos additional
echo "set -g default-shell /opt/homebrew/bin/bash
" >> ~/.tmux.conf

# load configuration
tmux source ~/.tmux.conf

# usage
tmux --help # help
man tmux # manual
tmux -V # version
tmux # start
tmux new -s 'diaodu' # new by name
tmux a # attache
tmux a -t 'diaodu' # attache by name
tmux ls # ls

# sub command ( prefix + : )
swap-window -s 3 -t 1 # to let window number 3 and window number 1 swap their positions
swap-window -t +1 # move the current window to the right
swap-window -t -1 # move the current window to the left
swap-window -t 0 # To swap the current window with the top window
move-window -t 0 # In the unlikely case of having no window at index 0

```
