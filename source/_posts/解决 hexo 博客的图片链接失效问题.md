---
tags:
  - 图片链接失效
  - 第三方链接
categories: hexo
abbrlink: 3275
date: 2020-06-02 18:58:21
updated: 2020-06-02 18:58:21
---

## 1.首先找到 hexo 博客的主题文件夹目录

```javascript
D: \Blog_leader755\Blog_leader755\themes\Blog_leader755\themes\halo\Blog_leader755\themes\halo\layout\Blog_leader755\themes\halo\layout\_partial\Blog_leader755\themes\halo\layout\_partial\head.ejs;
```

修改上述路径的文件 head.ejs ，因为每个页面都会包含 head 这个文件，在里面加上一行代码就能解决。

## 2.加入此行代码到页面<head></head>

```javascript
<meta name="referrer" content="no-referrer" />
```

## 3.暂时解决载了外链限制的问题

![image.png](https://cdn.nlark.com/yuque/0/2020/png/241787/1595671131433-aced588a-b41e-406a-acf6-6133df722701.png#align=left&display=inline&height=195&margin=%5Bobject%20Object%5D&name=image.png&originHeight=390&originWidth=1288&size=105257&status=done&style=none&width=644)

## 4.随之而来的问题出现了

如果你同时使用了[不蒜子](https://busuanzi.ibruce.info/)(https://busuanzi.ibruce.info/)统计，你会发现问题，查看控制台会出现不蒜子出现跨域的请求。这是为什么呢。由于使用了 no-referrer。

关于 no-refferrer 的相关问题可以查看此篇文章，在这里就不一一解释，直接给出解决方案。

## 5.目前的解决方案

### 1>方案-：

按照网友的说法是，meta 是可以放在 `<body>` 里的吧。
所以把 `<meta name="referrer" content="never">` 放到 **archive-book.ejs** 的最前面。
然后在网页结构里就会是这个样子：

```javascript
......
<head> </head>
<body class="main-center no-sidebar okayNav-loaded" ...>
  <header class="header" ...>
  <aside class="sidebar" ...>
  <main class="main" role="main">
    <meta name="referrer" content="never">
    <article class="article article-links article-type-list" ...>
......
```

在它之上的所有链接都会带来源信息，之后的就是 no-referrer 了。所以理论上也就规避了图片的防盗链了。
划重点，但是并没有如愿解决不蒜子的跨域问题。

### 2>方案二：终极解决方案

由于可以给  [`<a>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a), [`<area>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/area), [`<img>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img), [`<iframe>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe), 或者[`<link>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link)元素设置`referrerpolicy`属性。

```javascript
<a href="http://example.com" referrerpolicy="no-referrer">
```

所以，可以为所有文章内的图片动态添加 referrerpolicy 属性，通过查看控制台找到图片 img 的类名
![image.png](https://cdn.nlark.com/yuque/0/2020/png/241787/1595702030353-1e6505c0-c918-4e4a-864b-12077c39bc66.png#align=left&display=inline&height=275&margin=%5Bobject%20Object%5D&name=image.png&originHeight=550&originWidth=2056&size=252165&status=done&style=none&width=1028)

在文件夹中全局搜索类名，找到如下代码：
![image.png](https://cdn.nlark.com/yuque/0/2020/png/241787/1595702163492-a013ed03-25f0-4474-a3d1-39aa2753081c.png#align=left&display=inline&height=387&margin=%5Bobject%20Object%5D&name=image.png&originHeight=774&originWidth=1204&size=160420&status=done&style=none&width=602)

```javascript
//为文章内的图片添加no-referrer来隐藏referer（解决第三方图片外链不显示问题）
$(this).attr("referrerPolicy", "no-referrer");
```

注意每个主题中的文章下的图片类名应该都不一致，所以类名需要根据实际情况，在控制台中查找文章中的图片类名，再去找相应的代码，为其动态添加 referrerPolicy 属性。
