---
title: mac 使用 homebrew
urlname: bace4x
date: '2020-05-07 22:26:03 +0800'
tags: []
categories: []
abbrlink: c6cbe756
---

使用 brew update 指令

# 报错

Error: The following directories are not writable by your user:
/usr/local/sbin
/usr/local/share/man/man5
/usr/local/share/man/man7

解决办法：

```javascript
sudo chown -R $(whoami) /usr/local/*
```

重新调用即可：

```
brew update
```
