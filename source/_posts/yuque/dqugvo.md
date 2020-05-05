---
title: 1&gt;搭建本地的 hexo 的博客
urlname: dqugvo
date: '2020-04-30 23:44:24 +0800'
tags: []
categories: []
abbrlink: 8e435d4c
---

## 1>官方文档   [https://github.com/hexojs/hexo](https://github.com/hexojs/hexo)

## 2>搭建博客

### 1.全局安装 hexo，创建博客

```javascript
npm install hexo-cli -g
```

### 2.初始化

```javascript
hexo init blog
```

### 3.启动本地 hexo-server

```javascript
hexo server
```

## 4.新建一个 hexo 博客，富文本 makedown 文档

```javascript
$ hexo new "Hello Hexo"
```

## 5.打包发布到 hexo

```
//打包发布 hexo
hexo generate


//重启服务(可以看到新增的文档)
hexo server

```

## 6.packge.json 的命令行（备份文件）

```javascript
"scripts": {
    "build": "hexo generate",
    "clean": "hexo clean",
    "deploy": "hexo deploy",
    "server": "hexo server"
  },
```
