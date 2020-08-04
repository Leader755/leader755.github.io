---
tags:
  - PWA
categories: hexo
abbrlink: 19561
date: 2020-08-01 10:15:24
updated: 2020-08-01 10:15:24
---

## 简介

---

**PWA(Progressive Web App)的中文名叫做渐进式网页应用，早在 2014 年， W3C 公布过 Service Worker 的相关草案，但是其在生产环境被 Chrome 支持是在 2015 年。因此，如果我们把 PWA 的关键技术之一 Service Worker 的出现作为 PWA 的诞生时间，那就应该是 2015 年。**
**自 2015 年以来，PWA 相关的技术不断升级优化，在用户体验和用户留存两方面都提供了非常好的解决方案。PWA 可以将 Web 和 App 各自的优势融合在一起：渐进式、可响应、可离线、实现类似 App 的交互、即时更新、安全、可以被搜索引擎检索、可推送、可安装、可链接。**

**由于 hexo 为静态博客，因此不需要具备推送功能（其实是我没搞懂）。因此 PWA 的特性包括其渐进式、可离线，可以作为提高网站体验和提高网站家在速度的一个方法。因此下面将从其主要内容和 hexo 如何安装两个方面以“吃白饭的休伯利安号”为例来简单演示一遍安装过程。**

## 内容

---

### 渐进式

什么是渐进式，即将传统的 web 应用，应用现代的技术和方法使之在能够有桌面应用一般的体验，即为渐进式 web 应用。渐进式 web 应用可以同时运行在传统的浏览器上，像普通的网站一样进行浏览和操作；其同时也可以运行在现代功能完善的浏览器中，可以使其具备更多的效果和功能。比较常见的有**可安装**，即在支持的浏览器和操作系统上可以生成访问图标，通过图标可以可桌面应用一样访问应用；**消息推送**，即访问应用时服务器端可以通过应用的后台进程主动向客户端推送消息，类似于桌面应用的消息队列。

### 可离线

支持应用离线访问，即正常访问应用时，后台进程会自动缓存内容，下次访问时应用优先从缓存区读取数据，然后是进行 web 请求。因此可离线实质上充当了 web 代理服务器的职责，先是将正常请求代理到缓存区，再是将缓存区不足的文件进行正常的网络请求，通过此方法实现了离线的目标。根据可离线的规律，应用在一次访问缓存之后二次访问即可断网。

## 安装

---

### 1>安装 pwa

离线使用依赖`Service Work`，其本质是一段运行在并行于主进程的后台进程上，他不参与 web 交互功能，主要职责是和服务器交互，和指示缓存的内容。其详细的生命周期和原理文档详见：[Using Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers)。可以通过文档中的生命周期对这段后台脚本进行深度开发。
hexo 为静态博客，因此只需要实现离线使用即可，不需要进行消息推送，因此可以使用固定服务注册脚本，在 hexo 中服务注册脚本有着专门的插件进行生成：

|       hexo-offline        |                             hexo-pwa                              | hexo-service-worker  |
| :-----------------------: | :---------------------------------------------------------------: | :------------------: |
| hexo 的离线插件不包括安装 | 百度出的 PWA 综合插件，支持同时生成 manifest.json，有很多的配置项 | 和 hexo-offline 类似 |

三个插件的原理相同，通过注册 SW 服务，配合`manifest.json`，文件达到**可安装**和**可离线**的功能，本站使用的是 hexo-pwa 插件，下面是插件使用的细节：

> `hexo@4.2.0`  目前赞不兼容  `hexo-pwa`,使用  `hexo@4.2.0`  版本的用户推荐降级到  `hexo@4.1.1`

#### 1>检查 hexo 版本

```javascript
hexo -v

//注意如果hexo版本大于4.11，使用以下命令重装 hexo
npm install hexo@4.1.1 --save
```

#### 2>安装 hexo-pwa

```javascript
npm install hexo-pwa --save
```

##

###

### 2>新建 manifest.json 文件

首先要实现 PWA 的可安装性，需要有一个清单文件`manifest.json`。`manifest.json`是一个简单的`json`文件，它描述了我们的图标在主屏幕上如何显示，以及图标点击进去的启动页是什么，自动生成`manifest.json`的工具：[manifest.json 生成工具](https://app-manifest.firebaseapp.com/)（需要梯子），本站的 JSON 格式如下所示：

在站点根目录中创建[manifest.json](https://app-manifest.firebaseapp.com/)文件，并将以下内容放入其中，
在站点根目录中创建 images 文件夹 放入生成的 icons 图标

```javascript
{
  "name": "Autumn cicada Blogs",
  "short_name": "Autumn cicada Blogs",
  "theme_color": "#3a311c",
  "background_color": "#3a311c",
  "display": "standalone",
  "Scope": "/",
  "start_url": "/",
  "icons": [{
      "src": "/images/icons/icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png"
    },
    {
      "src": "/images/icons/icon-96x96.png",
      "sizes": "96x96",
      "type": "image/png"
    },
    {
      "src": "/images/icons/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png"
    },
    {
      "src": "/images/icons/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png"
    },
    {
      "src": "/images/icons/icon-152x152.png",
      "sizes": "152x152",
      "type": "image/png"
    },
    {
      "src": "/images/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/images/icons/icon-384x384.png",
      "sizes": "384x384",
      "type": "image/png"
    },
    {
      "src": "/images/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    },
    {
      "src": "/images/icons/apple-touch-icon.png",
      "sizes": "180x180",
      "type": "image/png"
    }
  ],
  "splash_pages": null
}
```

其中：

> - start_url 可以设置启动网址
> - icons 可以设置各个分辨率下页面的图标，适配不同的尺寸的路径
> - background_color 会设置背景颜色， Chrome 在网络应用启动后会立即使用此颜色，这一颜色将保留在屏幕上，直至网络应用首次呈现为止。
> - theme_color 会设置主题颜色
> - display 设置启动样式

### 3>新建 sw.js 文件

在站点根目录下新建一个名为 sw.js 的文件，在文件里填入一下内容

```javascript
importScripts("https://g.alicdn.com/kg/workbox/3.3.0/workbox-sw.js");

if (workbox) {
  workbox.setConfig({
    modulePathPrefix: "https://g.alicdn.com/kg/workbox/3.3.0/",
  });

  workbox.precaching.precache(["/", "/index.html"]);

  workbox.routing.registerRoute(
    new RegExp("^https?://m-blog.cn/?$"),
    workbox.strategies.networkFirst()
  );

  workbox.routing.registerRoute(
    new RegExp(".*.html"),
    workbox.strategies.networkFirst()
  );

  workbox.routing.registerRoute(
    new RegExp(".*.(?:js|css|jpg|png|gif)"),
    workbox.strategies.staleWhileRevalidate()
  );
}
```

> 将其中域名改为你自己主页的域名：`https?://m-blog.cn/`改为你的域名，格式要和我的一样。

### 4>配置站点根目录下的 \_config.yml 配置文件

注意路径要根据实际情况变化。

```javascript
# PWA配置  npm i --save hexo-pwa
pwa:
  manifest:
    path: /manifest.json  #当前 manifest.json文件在根目录
    body:
      name: Autumn cicada Blogs
      short_name: Autumn cicada Blogs
      theme_color: white
      background_color: white
      display: standalone
      orientation: portrait
      scope: /
      start_url: /
      icons:
        - src: /images/icons/icon-72x72.png  #当前 images文件夹在根目录
          type: image/png
          sizes: 72x72
        - src: /images/icons/icon-72x72.png,
          sizes: 72x72,
          type: image/png
        - src: /images/icons/icon-96x96.png,
          sizes: 96x96,
          type: image/png
        - src: /images/icons/icon-128x128.png,
          sizes: 128x128,
          type: image/png
        - src: /images/icons/icon-144x144.png,
          sizes: 144x144,
          type: image/png
        - src: /images/icons/icon-152x152.png,
          sizes: 152x152,
          type: image/png
        - src: /images/icons/icon-192x192.png,
          sizes: 192x192,
          type: image/png
        - src: /images/icons/icon-384x384.png,
          sizes: 384x384,
          type: image/png
        - src: /images/icons/icon-512x512.png,
          sizes: 512x512,
          type: image/png
  serviceWorker:
    path: /sw.js  #当前 sw.js 文件在根目录
    preload:
      urls:
        - /
      posts: 12
    opts:
      networkTimeoutSeconds: 30
    routes:
      - pattern: !!js/regexp /hm.baidu.com/
        strategy: networkOnly
      - pattern: !!js/regexp /www.google-analytics.com/
        strategy: networkOnly
      - pattern: !!js/regexp /.*\.(js|css|jpg|jpeg|png|gif)$/
        strategy: cacheFirst
      - pattern: !!js/regexp /\//
        strategy: networkFirst
  priority: 5
```

### 5>检查 PWA 服务

```javascript
hexo cl && hexo g && hexo s

//成功后可以执行 ，发布。
hexo d
```

> 按`F12`或者`Ctrl + Shift + I`或者直接鼠标右键弹出的菜单中，有个检查，鼠标点击，就可以进入开发者调试模式，然后选择`Application`—>`Service Workers`，查看是否成功？

以下 分别是本地版和在线版成功的标识
![image.png](https://cdn.nlark.com/yuque/0/2020/png/241787/1596352726824-1f14ab5b-af44-4e71-a5d4-04e87fb4eeaa.png#align=left&display=inline&height=510&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1020&originWidth=1522&size=198650&status=done&style=none&width=761)
![image.png](https://cdn.nlark.com/yuque/0/2020/png/241787/1596352652911-78e9aa18-1666-47a8-9afe-5db07dc0a273.png#align=left&display=inline&height=408&margin=%5Bobject%20Object%5D&name=image.png&originHeight=816&originWidth=1466&size=163517&status=done&style=none&width=733)

##

### 6>附加增强功能(可选)

#### 添加 IOS Safari PWA 图标支持

在`manifest.json`文件中添加下面的代码，代码是关于`apple-touch-icon`图标的

```javascript
{
    "src": "/images/apple-touch-icon.png",
    "sizes": "180x180",
    "type": "image/png"
}
```

> 图标大小设置为`180 x 180`

####

#### 修改 head.ejs 文件

在`themes/halo/layout/_partial/head.ejs`，在 head.ejs 文件中的`<head></head>`标签之间添加下面的代码：

```
<link rel="apple-touch-icon" href="<%- theme.appletouchicon %>">
<meta name="theme-color" content="white"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
```

- theme-color：中的 content 对应的是你 `manifest.json` 中的 `theme_color` 的值
- viewport: 用于针对移动屏幕优化 PWA 应用 详细链接[viewport](https://links.jianshu.com/go?to=https%3A%2F%2Fsitoi.cn%2Fgo.html%3Fu%3DaHR0cHM6Ly93ZWIuZGV2L3ZpZXdwb3J0Lz91dG1fc291cmNlPWxpZ2h0aG91c2UmdXRtX21lZGl1bT11bmtub3du)
- apple-touch-icon：配置 `apple-touch-icon` 图标链接

**在\*\***主题配置文件`_config.yml`\***\*下添加下面的代码**

```javascript
appletouchicon: /images/apple-touch-icon.png #你图片的路径
```

#### 部署

```javascript
hexo clean && hexo g -d
```

参考文档：
1> [https://sitoi.cn/posts/49115.html](https://links.jianshu.com/go?to=https%3A%2F%2Fsitoi.cn%2Fposts%2F49115.html)
2> [https://juejin.im/post/6844903670639771662](https://juejin.im/post/6844903670639771662)
3> [https://www.jianshu.com/p/74ee8695140c](https://www.jianshu.com/p/74ee8695140c)
