---
title: hexo博客的生成永久标题链接
urlname: tl2gcc
date: '2020-05-05 23:48:30 +0800'
tags: []
categories: []
abbrlink: 4976fe22
---

## 1.hexo 博客默认链接规则：

**hexo 生成的标题默认规则（年、月、日、标题）：:year/:month/:day/:title。复制后的链接是一长串，非常不利于阅读，也不简洁。**

## 2.解决方案：

### 1.使用[hexo-permalink-pinyin]()

将中文转英文，这样方案也存在一定的缺陷，比如修改了文章标题，重新 hexo 三连后，URL 就变了，以前的文章地址变成了 404。而且这样生成的 URL 层级也很深，不利于 SEO。

#### 1>安装 hexo-permalink-pinyin

```javascript
npm i hexo-permalink-pinyin --save
```

#### 2>修改根目录下的\_config.yml 文件，找到 permalink。

```javascript
permalink_pinyin:
  enable: true
  separator: '-' # default: '-'
permalink_pinyin:
  enable: true             # Enable this plugin
  separator: '-'           # Separator of the slug, default: '-'
  exclude: /ignore_post/   # Regex for which post should skip
```

###

### 2.使用[hexo-abbrlink](https://github.com/Rozbo/hexo-abbrlink)

生成唯一不变的 URl 链接，链接可以调整自己想要的。弊端

#### 1>安装 hexo-abbrlink

```javascript
npm i hexo-permalink-pinyin --save
```

####

#### 2>修改根目录下的\_config.yml 文件，找到 permalink。

```javascript
permalink: post/:abbrlink.html  # 文章的永久链接格式,post可以自定义
abbrlink:
  alg: crc32  # 算法： crc16(default) and crc32
  rep: hex    # 进制： dec(default) and hex
```

生成后的博客链接如下：
![image.png](https://cdn.nlark.com/yuque/0/2020/png/241787/1588694804547-5dbe637d-46af-4bfc-9b3d-4d5228b573a6.png#align=left&display=inline&height=37&margin=%5Bobject%20Object%5D&name=image.png&originHeight=74&originWidth=908&size=11417&status=done&style=none&width=454)

如果觉得对你有帮助，点个赞呗。
