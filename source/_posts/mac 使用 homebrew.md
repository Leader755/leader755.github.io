---
tags:
  - homebrew
  - mac
categories: 工具
abbrlink: 65348
date: 2019-11-20 22:05:21
updated: 2019-11-20 22:05:21
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
