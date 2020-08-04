---
tags:
  - history
  - tomcat
categories: vue
abbrlink: 14064
date: 2019-10-20 13:15:23
updated: 2019-10-20 13:15:23
---

## 1.项目发布后通常有两种访问方式，

第一种： IP+端口直接访问的方式，如 [http://192.168.1.107:8080/](http://192.168.4.160:6090/)
第二种：IP+端口+项目名，如 [http://192.168.1.107:8080/saas/](https://links.jianshu.com/go?to=http%3A%2F%2F192.168.4.160%3A6090%2Fhuangshi%2F)

## 2.第一种方式：ip+端口（前端后端修改）

范例：vue-cli 项目使用路由，tomcat 作为服务器，项目文件夹名 saas

步骤：

### 1.修改配置文件 router.js

```javascript
export default new Router({
  mode: "history", // 将mode值改为history
  routes: [
    {
      path: "/",
      name: "HelloWorld",
      component: HelloWorld,
    },
  ],
});
```

### 2.1 将 tomcat 下的 ROOT 文件中的内容替换(选择其一)

（此种方式需要删除 ROOT 文件夹下的全部内容，将打包的文件放进去，无需修改配置文件）
**找到 tomcat 目录，将 tomcat->ROOT 文件夹中文件全部删除，将打包好的 dist 文件夹中的文件全部放到 ROOT 文件夹中。**
![image.png](https://cdn.nlark.com/yuque/0/2020/png/241787/1579239963286-48f67f71-308e-49dc-9953-8cc2cc1be528.png#align=left&display=inline&height=166&margin=%5Bobject%20Object%5D&name=image.png&originHeight=331&originWidth=1486&size=32467&status=done&style=none&width=743)

### 2.2 修改 tomcat->conf/server.xml 配置(选择其一)

(此种方式无需删除 ROOT 文件夹中的内容，只需修改 serve.xml 中的配置)
**找到 tomcat 目录，修改 tomcat->conf/server.xml，增加 Context 节点。设置 docBase="/saas" 。其中的 saas 就是 webapps 目录下的项目名称（文件夹名）**
\*\*
![微信图片_20200116134505.png](https://cdn.nlark.com/yuque/0/2020/png/241787/1579153518666-35db848d-44c8-411f-a40d-02dc81ae9ae8.png#align=left&display=inline&height=696&margin=%5Bobject%20Object%5D&name=%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20200116134505.png&originHeight=696&originWidth=1277&size=80321&status=done&style=none&width=1277)

## 3.第二种方式：ip+端口+项目名（前端修改）

范例：vue-cli 项目使用路由，tomcat 作为服务器，项目文件夹名 saas

步骤：

### 1.首先创建 WEB-INF 文件，文件夹中创建 web.xml 文件：

因为是 history 模式, 要防止在路由下刷新变成 404 错误，这需要让 tomcat 都定位到首页，也就是 index.html 页，以往我们使用 Java 写 web 项目部署在 tomcat 时，通常都会有一个 WEB-INF 文件夹，并包含一个 web.xml 文件，而 vue 项目 build 之后只是纯静态资源项目，所以我们需要在 build 之后的 dist 文件夹里新增一个 WEB-INF 文件夹，并新建 web.xml 文件。
![image.png](https://cdn.nlark.com/yuque/0/2020/png/241787/1579014872343-c8253ec9-d3d5-4b53-bda6-3983472244ae.png#align=left&display=inline&height=421&margin=%5Bobject%20Object%5D&name=image.png&originHeight=842&originWidth=482&size=57023&status=done&style=none&width=241)

**在项目目录下新建\*\***`WEB-INF`\***\*文件夹， 接着在\*\***`WEB-INF`\***\*文件夹下新建 \*\***`web.xml`\***\*文件，内容如下：**

```xml
<?xml version='1.0' encoding='UTF-8'?>
<web-app xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee/web-app_2_5.xsd"
         id="scplatform" version="2.5">
  <display-name>/</display-name>
  <error-page>
    <error-code>404</error-code>
    <location>/index.html</location>
  </error-page>
</web-app>
```

### 2.修改配置文件 router.js

```javascript
export default new Router({
  mode: "history", // 开启history模式需要后端配置404时返回/index.html
  base: "/saas/", //当项目不在根目录时，必须添加子目录路径，否则空白页面
  routes: [
    {
      path: "/home", // '/saas/home'
      name: "home",
      component: home,
    },
  ],
});
```

### 3.修改 config 文件夹下的 index.js 中配置

```javascript
build: {
    // Template for index.html
    index: path.resolve(__dirname, "../dist/index.html"),

    // Paths
    assetsRoot: path.resolve(__dirname, "../dist"),//构建输出目录,也就是构建后的东西都扔这里
    assetsSubDirectory: "static",//源子目录 除了index.html，其余的js img css都分在这里

    /**添加开始**/
    //tomcat webapps/sass/
    assetsPublicPath: "/saas/", //需要加上这一行项目目录,一个 / 表示根目录
		/**添加结束**/
  }
```

### 4.webpack 设置不打包文件`WEB-INF`

到此处已经可以成功配置一个 tomcat 服务下的 vue 的 history 模式的项目，但是不能每次打包去手动**添加和更改新建`WEB-INF`文件夹**吧，遇到过设置不打包文件 WEB-INF 文件时的配置未生效，导致 WEB-INF 下的 web.xml 文件被打包成 js 文件，导致当前路由刷新报 404 错误。
(这个错误找了 好久，以为配置好了，就 Ok 了，由于代码同步问题，没注意可能就发生问题，所以上传服务器前一定要记得检查下**`WEB-INF`文件夹是否存在 web.xml 文件**)

**修改 webpack.prod.conf.js 配置**

```javascript
plugins: [
  // copy custom static assets
  new CopyWebpackPlugin([
    {
      from: path.resolve(__dirname, "../static"),
      to: config.build.assetsSubDirectory,
      ignore: [".*"],
    },
    /**添加开始**/
    {
      from: path.resolve(__dirname, "../WEB-INF"), // 不打包直接输出的文件
      to: "dist", // 打包后静态文件放置位置
      ignore: [".*"], // 忽略规则。（这种写法表示将该文件夹下的所有文件都复制）
    },
    /**添加结束**/
  ]),
];
```

关于此处的的设置不打包问题可以自行搜索，关键词：**webpack 设置不打包文件**
\*\*
\*\*

### 5.到此处前端已经成功配置了 tomcat 下 vue 的 history 模式

项目最终目录如下图
![image.png](https://cdn.nlark.com/yuque/0/2020/png/241787/1579015282523-603258d7-6c26-49bd-8f0c-cb6453d65a11.png#align=left&display=inline&height=464&margin=%5Bobject%20Object%5D&name=image.png&originHeight=928&originWidth=504&size=64927&status=done&style=none&width=252)

### 6.注意 vue-cli 3.x vue-cli 打包配置还需要设置以下内容：

```javascript
module.exports = {
  publicPath: "/saas",
  configureWebpack: {
    performance: {
      hints: false,
    },
  },
};
```

## 4.结语

终于完成了，也是踩了不少坑和加上一些搜索，感觉目前给的文档都不太详细，所以自己写了一篇关于 tomcat 下的 vue 的 history 模式，希望能帮到大家，欢迎大家一起交流。
