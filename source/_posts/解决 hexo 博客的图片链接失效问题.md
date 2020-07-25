---
categories: hexo
abbrlink: 8ca51668
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
