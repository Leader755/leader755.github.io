---
tags:
  - 搜索
categories: hexo
abbrlink: 31782
date: 2020-07-18 23:06:23
updated: 2020-07-18 23:06:23
---

## 1.根目录安装插件 hexo-generator-searchdb

```javascript
npm install hexo-generator-searchdb --save
```

## 2.配置根目录文件\_config.yml

```javascript
search: path: search.xml;
field: post;
format: html;
limit: 10000;
```

##

## 3.配置主题文件\_config.yml

```javascript
local_search: enable: true;
```

## 4.完成效果图示

![image.png](https://cdn.nlark.com/yuque/0/2020/png/241787/1588695774509-2476d128-a52b-4d6b-8e64-7269b5c7389b.png#align=left&display=inline&height=568&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1136&originWidth=2180&size=310201&status=done&style=none&width=1090)
