---
tags:
  - valine
  - leancloud
categories: hexo
abbrlink: 38478
date: 2020-07-21 22:07:21
updated: 2020-07-21 22:07:21
---

## 1.这里推荐的评论功能插件为[valine](https://valine.js.org/)

官网：[https://valine.js.org/](https://valine.js.org/)
注册登录网站：[https://leancloud.cn/](https://leancloud.cn/)
      需要实名注册登记，可以使用支付宝来实名认证，很快的，秒过。

## 2.去[leancloud](https://leancloud.cn/)注册

注册完成后去创建应用，选择开发版就可以了。（需要实名登记才能创建应用）
![image.png](https://cdn.nlark.com/yuque/0/2020/png/241787/1588779620815-f8a3fc6e-f667-4959-9cb2-53b5777427c7.png#align=left&display=inline&height=445&margin=%5Bobject%20Object%5D&name=image.png&originHeight=890&originWidth=1232&size=83220&status=done&style=none&width=616)

## 3.获取 appkey 和 appid

创建完成应用后，**进入应用->设置->应用 key，找到相应的 appkey 和 appid。**
**![image.png](https://cdn.nlark.com/yuque/0/2020/png/241787/1588779969891-d05a06f8-bcf5-4b7e-84cb-bcedabc8f762.png#align=left&display=inline&height=248&margin=%5Bobject%20Object%5D&name=image.png&originHeight=796&originWidth=2394&size=185376&status=done&style=none&width=746)**

## 4.配置主题文件\_config.yml

**搜索 valine，一般可看到如下，将 enbled:true, 并填写 appid 和 appkey(从 leancloud 中获取的 appid 和 appkey)。**

```javascript
# The configuration of the Valine comment module is not activated by default.
# To use it, activate the configuration item and set appId and appKey.
# Valine 评论模块的配置，默认为不激活，如要使用，就请激活该配置项，并设置 appId 和 appKey.
valine:
  enable: true
  appId:
  appKey:
  notify: false
  verify: false
  visitor: true
  avatar: 'mp' # Gravatar style : mp/identicon/monsterid/wavatar/retro/hide
  pageSize: 10
  placeholder: 'just go go' # Comment Box placeholder
  background: /medias/comment_bg.png
```

## 5.配置域名

在 Leancloud -> 设置 -> 安全中心 -> Web 安全域名 把你的域名加进去.

![image.png](https://cdn.nlark.com/yuque/0/2020/png/241787/1588780306061-73286643-1359-4efe-b2a1-5545f880dd4a.png#align=left&display=inline&height=500&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1000&originWidth=1804&size=166396&status=done&style=none&width=902)

## 6.重启你的博客

大功告成！！
