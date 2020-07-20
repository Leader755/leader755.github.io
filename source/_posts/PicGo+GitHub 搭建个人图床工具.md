---
tags:
  - github
  - PicGo
categories: 图床
abbrlink: '21250214'
---

> 方便程度：★★★★☆
> 配置难度：★★☆☆☆
> 适用环境：win + mac + linux
> 需要工具：GitHub 账号 + PicGo 客户端
> 稳定性：背靠 GitHub 和微软，比自建服务器都稳
> 隐私性：这算是唯一缺点，你的图片别人可以访问。

###

### 1. PicGo 介绍

这是一款图片上传的工具，目前支持微博图床，七牛图床，腾讯云，又拍云，GitHub 等图床，未来将支持更多图床。

所以解决问题的思路就是，将本地的文件，或者剪切板上面的截图发送图床，然后生成在线图片的链接

### 2.下载并安装 PicGo

#### 1.进入下载页面

[https://github.com/Molunerfinn/PicGo/releases](https://github.com/Molunerfinn/PicGo/releases)

#### 2.下载安装包

选择最新版本就行了，我下载时最新版是 2.1.2
[![](https://raw.githubusercontent.com/LicV587/img/master/picgo/20190528164711.jpg#align=left&display=inline&height=591&margin=%5Bobject%20Object%5D&originHeight=591&originWidth=1066&status=done&style=none&width=1066)
](https://raw.githubusercontent.com/LicV587/img/master/picgo/20190528164711.jpg)

#### 3.安装 PicGo

双击下载的安装包，一路默认就行，如果 360 报错，就允许执行，安装完成后，打开软件如下图所示：
[![](https://raw.githubusercontent.com/LicV587/img/master/picgo/20190528165026.png#align=left&display=inline&height=412&margin=%5Bobject%20Object%5D&originHeight=412&originWidth=787&status=done&style=none&width=787)
](https://raw.githubusercontent.com/LicV587/img/master/picgo/20190528165026.png)

### 3.创建 GitHub 图床

#### 1.需要注册/登陆 GitHub 账号

这个自行注册，不会的百度谷歌下

#### 2.创建 Repository

随便命名，我的比较简单，直接是 img

#### 3.创建 token 并复制保存

生成一个 Token 用于操作 GitHub repository
**Settings -> Developer settings -> Personal access tokens**

1.点击右上角头像，settings，进入设置
[
](https://raw.githubusercontent.com/LicV587/img/master/picgo/20190528170352.png)![image.png](https://cdn.nlark.com/yuque/0/2020/png/241787/1577937560770-a488dbd7-809f-4a83-9e61-fa65bc1d4b54.png#align=left&display=inline&height=540&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1080&originWidth=2184&size=234699&status=done&style=none&width=1092)

2.在页面最下找到 Developer settings，点击进入
[![](https://raw.githubusercontent.com/LicV587/img/master/picgo/20190528170636.png#align=left&display=inline&height=820&margin=%5Bobject%20Object%5D&originHeight=820&originWidth=1310&status=done&style=none&width=1310)
](https://raw.githubusercontent.com/LicV587/img/master/picgo/20190528170636.png)

3.点击 Generate new token
[![](https://raw.githubusercontent.com/LicV587/img/master/picgo/20190528170920.png#align=left&display=inline&height=668&margin=%5Bobject%20Object%5D&originHeight=668&originWidth=1260&status=done&style=none&width=1260)
](https://raw.githubusercontent.com/LicV587/img/master/picgo/20190528170920.png)

4.Note 随便填，勾选复选框 repo ，接着到页面底部 Generate token 就完成了
[![](https://raw.githubusercontent.com/LicV587/img/master/picgo/20190528171107.png#align=left&display=inline&height=783&margin=%5Bobject%20Object%5D&originHeight=783&originWidth=1266&status=done&style=none&width=1266)
](https://raw.githubusercontent.com/LicV587/img/master/picgo/20190528171107.png)

5.然后会生成一串字符 token，这个 token 只出现一次，所以要复制保存一下
[![](https://raw.githubusercontent.com/LicV587/img/master/picgo/20190528171329.png#align=left&display=inline&height=438&margin=%5Bobject%20Object%5D&originHeight=438&originWidth=1069&status=done&style=none&width=1069)
](https://raw.githubusercontent.com/LicV587/img/master/picgo/20190528171329.png)

### 4.配置 PicGo 客户端

如下图配置：[
](https://raw.githubusercontent.com/LicV587/img/master/picgo/20190528165451.jpg)![image.png](https://cdn.nlark.com/yuque/0/2020/png/241787/1577937641444-583cf8c1-ddd3-400b-aa6b-addaf3ecb388.png#align=left&display=inline&height=449&margin=%5Bobject%20Object%5D&name=image.png&originHeight=898&originWidth=1606&size=1014465&status=done&style=none&width=803)

说明：

- 仓库名 即你的仓库名
- 分支名 默认 master
- Token 就是刚刚复制的那一串字符
- 存储路径 这个可以填也可以不填，填了的话图片就上传到 git 中 picgo 这个文件夹
- 域名:[https://raw.githubusercontent.com/Leader755/github_PicGo/master](https://raw.githubusercontent.com/Leader755/github_PicGo/master) 这个要改一下，改成你自己的，格式：https://raw.githubusercontent.com/[用户名]/[仓库名]/master

然后点击确定，在点击设为默认图床，就 OK 了。
