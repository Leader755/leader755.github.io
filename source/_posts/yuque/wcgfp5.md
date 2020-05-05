---
title: 6&gt;hexo插件篇（必看）
urlname: wcgfp5
date: '2020-05-01 18:00:28 +0800'
tags: []
categories: []
abbrlink: dde88f77
---

## 1>安装插件说明

如果应用官网的主题你会发现，有可能出现打不开的情况，这是由于有些主题使用的插件，本地并没有安装导致的报错。所以本篇文章为补充说明篇。（无问题的可以跳过）

## 2>常用的插件

### 代码高亮（建议安装）

由于 Hexo 自带的代码高亮主题显示不好看，所以主题中使用到了 [hexo-prism-plugin](https://github.com/ele828/hexo-prism-plugin) 的 Hexo 插件来做代码高亮，安装命令如下：

```javascript
npm i -S hexo-prism-plugin
```

然后，修改 Hexo 根目录下 `_config.yml` 文件中 `highlight.enable` 的值为 `false`，并新增 `prism` 插件相关的配置，主要配置如下：

```javascript
highlight:
  enable: false
  line_number: true
  auto_detect: false
  tab_replace: false
  wrap: true
  hljs: false

prism_plugin:
  mode: 'preprocess'    # realtime/preprocess
  theme: 'tomorrow'
  line_number: false    # default false
  custom_css:
```

### 搜索（建议安装）

本主题中还使用到了 [hexo-generator-search](https://github.com/wzpan/hexo-generator-search) 的 Hexo 插件来做内容搜索，安装命令如下：

```javascript
npm install hexo-generator-search --save
```

在 Hexo 根目录下的 `_config.yml` 文件中，新增以下的配置项：

```javascript
search: path: search.xml;
field: post;
```

###

### 文章字数统计插件（建议安装）（使用了 halo 主题则必须安装）

如果你想要在文章中显示文章字数、阅读时长信息，可以安装 [hexo-wordcount](https://github.com/willin/hexo-wordcount)插件。安装命令如下：

```javascript
npm i --save hexo-wordcount
```

然后只需在本主题下的 `_config.yml` 文件中，将各个文章字数相关的配置激活即可：
(此处注意源文档的 postInfo 是错的，应该为 post_wordcount)

```javascript
post_wordcount:
  date: true # 发布日期
  update: true # 更新日期
  wordCount: true # 文章字数统计
  totalCount: true # 站点总文章字数
  min2read: true # 文章阅读时长
  readCount: true # 文章阅读次数
```

### 添加代码压缩（建议安装）

[hexo-neat](https://github.com/rozbo/hexo-neat)插件实现压缩代码，底层是通过 gulp 来实现的。但是这个插件是有 Bug 的：

- 压缩 md 文件会使 markdown 语法的代码块消失
- 会删除全角空格

在博客站点根目录执行安装代码：

```
npm install hexo-neat --save
```

紧接着在站点根目录下的配置文件添加如下代码：

```
neat_enable: true
neat_html:
  enable: true
  exclude:
neat_css:
  enable: true
  exclude:
    - '*.min.css'
neat_js:
  enable: true
  mangle: true
  output:
  compress:
  exclude:
    - '*.min.js'
```

然后直接 hexo cl&&hexo g 就可以了，会自动压缩文件 。
补充：为了解决以上 Bug，对于`halo`主题（其他主题自行解决）需要将以上默认配置修改为：

```
#hexo-neat 优化提速插件（去掉HTML、css、js的blank字符）
neat_enable: true
neat_html:
  enable: true
  exclude:
    - '**/*.md'
neat_css:
  enable: true
  exclude:
    - '**/*.min.css'
neat_js:
  enable: true
  mangle: true
  output:
  compress:
  exclude:
    - '**/*.min.js'
    - '**/**/instantpage.js'
    - '**/matery.js'
```

###

### 外链跳转插件 hexo-external-link（可选安装）（使用了 halo 主题则必须安装）

> [hexo-external-link](https://github.com/hvnobug/hexo-external-link)是一个跳转外链相关插件。自动为所有 html 文件中外链的 a 标签生成对应的属性。 比如 设置`target=’_blank’`, `rel=’external nofollow noopener noreferrer’`告诉搜索引擎这是外部链接,不要将该链接计入权重。 同时自动生成外链跳转页面,默认在根目录下 go.html;

安装:

```javascript
npm install hexo-external-link --save
```

配置插件 在 Hexo 根目录的\_config.yml 文件中添加如下配置。

```javascript
hexo_external_link:
  enable: true
  enable_base64_encode: true
  url_param_name: 'u'
  html_file_name: 'go.html'
  target_blank: true
  link_rel: 'external nofollow noopener noreferrer'
  domain: 'your_domain' # 如果开启了防盗链
  safety_chain: true
```

- enable：是否开启 hexo_external_link 插件 - 默认 false
- enable_base64_encode：是否对跳转 url 使用 base64 编码 - 默认 fasle
- url_param_name：url 参数名,在跳转到外链传递给 html_file_name 的参数名 - 默认 ‘u’
- html_file_name：跳转到外链的页面文件路径 - 默认 'go.html'
- target_blank：是否为外链的 a 标签添加 target='\_blank' - 默认 true
- link_rel：设置外链的 a 标签的 rel 属性 - 默认 'external nofollow noopener noreferrer'
- domain：如果开启了防盗链,除了 localhost 和 domain 之外调用会跳到主页,同时也是判断链接是否为外链的依据 - 默认 window.location.host
- safety_chain：go.html 为了防止外链盗用 对域名进行的判断 - 默认 false 即关闭防盗链

###

### 添加 RSS 订阅支持（可选安装）（使用了 halo 主题则必须安装）

本主题中还使用到了 [hexo-generator-feed](https://github.com/hexojs/hexo-generator-feed) 的 Hexo 插件来做 `RSS`，安装命令如下：

```javascript
npm install hexo-generator-feed --save
```

在 Hexo 根目录下的 `_config.yml` 文件中，新增以下的配置项：

```javascript
feed: type: atom;
path: atom.xml;
limit: 20;
hub: content: content_limit: 140;
content_limit_delim: " ";
order_by: -date;
```

### 添加 sitemap 站点地图（可选安装）（使用了 halo 主题则必须安装）

本主题中还使用到了 [hexo-generator-sitemap](https://github.com/hexojs/hexo-generator-sitemap) 的 Hexo 插件来做 `Sitemap`，安装命令如下：

```javascript
npm install hexo-generator-sitemap --save
```

访问地址：/sitemap.xml

### 中文链接转拼音（可选安装）

如果你的文章名称是中文的，那么 Hexo 默认生成的永久链接也会有中文，这样不利于 `SEO`，且 `gitment` 评论对中文链接也不支持。我们可以用 [hexo-permalink-pinyin](https://github.com/viko16/hexo-permalink-pinyin) Hexo 插件使在生成文章时生成中文拼音的永久链接。
这里为可选安装，因为我希望使用`urlname`进行连接访问，中文链接转拼音由一个缺点就是当文章名字过长会显示十分臃肿。`urlname`的方式见下文。
安装命令如下：

```javascript
npm i hexo-permalink-pinyin --save
```

在 Hexo 根目录下的 `_config.yml` 文件中，新增以下的配置项：

```javascript
permalink_pinyin:
  enable: true
  separator: '-' # default: '-'
```

> **注**：除了此插件外，[hexo-abbrlink](https://github.com/rozbo/hexo-abbrlink) 插件也可以生成非中文的链接。

###

###

### 添加 emoji 表情支持（可选安装）

本主题新增了对`emoji`表情的支持，使用到了 [hexo-filter-github-emojis](https://npm.taobao.org/package/hexo-filter-github-emojis) 的 Hexo 插件来支持 `emoji`表情的生成，把对应的`markdown emoji`语法（`::`,例如：`:smile:`）转变成会跳跃的`emoji`表情，安装命令如下：

```javascript
npm install hexo-filter-github-emojis --save
```

在 Hexo 根目录下的 `_config.yml` 文件中，新增以下的配置项：

```javascript
githubEmojis:
  enable: true
  className: github-emoji
  inject: true
  styles:
  customEmojis:
```

### deploy 发布插件（可选安装）（部署到 github 需要安装）

如果你想通过`deploy`的方式进行推送`public文件夹`到托管网站，你需要安装

```javascript
npm install hexo-deployer-git --save
```

当然你也可以选择不装，使用 Github Actions、docker 等方式
执行 `hexo clean && hexo g` 重新生成博客文件，然后在 `public` 文件夹中即可看到 `atom.xml` 文件，说明你已经安装成功了。

### 添加 [DaoVoice](http://www.daovoice.io/) 在线聊天功能（可选的）

前往 [DaoVoice](http://www.daovoice.io/) 官网注册并且获取 `app_id`，并将 `app_id` 填入主题的 `_config.yml` 文件中。

### 添加 [Tidio](https://www.tidio.com/) 在线聊天功能（可选的）

前往 [Tidio](https://www.tidio.com/) 官网注册并且获取 `Public Key`，并将 `Public Key` 填入主题的 `_config.yml` 文件中。

### 修改页脚

页脚信息可能需要做定制化修改，而且它不便于做成配置信息，所以可能需要你自己去再修改和加工。修改的地方在主题文件的 ` /layout/_partial/footer.ej``s ` 文件中，包括站点、使用的主题、访问量等。

### 修改社交链接

在主题的 `_config.yml` 文件中，默认支持 `QQ`、`GitHub` 和邮箱等的配置，你可以在主题文件的 `/layout/_partial/social-link.ejs` 文件中，新增、修改你需要的社交链接地址，增加链接可参考如下代码：

```javascript
<% if (theme.socialLink.github) { %>
    <a href="<%= theme.socialLink.github %>" class="tooltipped" target="_blank" data-tooltip="访问我的GitHub" data-position="top" data-delay="50">
        <i class="fab fa-github"></i>
    </a>
<% } %>
```

其中，社交图标（如：`fa-github`）你可以在 [Font Awesome](https://fontawesome.com/icons) 中搜索找到。以下是常用社交图标的标识，供你参考：

- Facebook: `fab fa-facebook`
- Twitter: `fab fa-twitter`
- Google-plus: `fab fa-google-plus`
- Linkedin: `fab fa-linkedin`
- Tumblr: `fab fa-tumblr`
- Medium: `fab fa-medium`
- Slack: `fab fa-slack`
- Sina Weibo: `fab fa-weibo`
- Wechat: `fab fa-weixin`
- QQ: `fab fa-qq`
- Zhihu: `fab fa-zhihu`
  > **注意**: 本主题中使用的 `Font Awesome` 版本为 `5.11.0`。

### 修改打赏的二维码图片

在主题文件的 `source/medias/reward` 文件中，你可以替换成你的的微信和支付宝的打赏二维码图片。

### 配置音乐播放器（可选的）

要支持音乐播放，就必须开启音乐的播放配置和音乐数据的文件。
首先，在你的博客 `source` 目录下的 `_data` 目录（没有的话就新建一个）中新建 `musics.json` 文件，文件内容如下所示：

```javascript
[
  {
    name: "五月雨变奏电音",
    artist: "AnimeVibe",
    url: "http://xxx.com/music1.mp3",
    cover: "http://xxx.com/music-cover1.png",
  },
  {
    name: "Take me hand",
    artist: "DAISHI DANCE,Cecile Corbel",
    url: "/medias/music/music2.mp3",
    cover: "/medias/music/cover2.png",
  },
  {
    name: "Shape of You",
    artist: "J.Fla",
    url: "http://xxx.com/music3.mp3",
    cover: "http://xxx.com/music-cover3.png",
  },
];
```

> **注**：以上 JSON 中的属性：`name`、`artist`、`url`、`cover` 分别表示音乐的名称、作者、音乐文件地址、音乐封面。

然后，在主题的 `_config.yml` 配置文件中激活配置即可：

# 是否在首页显示音乐.

```javascript
# 是否在首页显示音乐.
music:
  enable: true
  showTitle: false
  title: 听听音乐
  fixed: false # 是否开启吸底模式
  autoplay: false # 是否自动播放
  theme: '#42b983'
  loop: 'all' # 音频循环播放, 可选值: 'all', 'one', 'none'
  order: 'list' # 音频循环顺序, 可选值: 'list', 'random'
  preload: 'auto' # 预加载，可选值: 'none', 'metadata', 'auto'
  volume: 0.7 # 默认音量，请注意播放器会记忆用户设置，用户手动设置音量后默认音量即失效
  listFolded: false # 列表默认折叠
  listMaxHeight: # 列表最大高度
```

### 文章 Front-matter 介绍

1. **直接将`themes/halo/config/scaffolds`内所有内容拷贝到\*\***`Hexo`根目录下\***\*的`scaffolds`文件夹内替换**
1. 或者自己重新修改，修改请参考下面

### Front-matter 选项详解

`Front-matter` 选项中的所有内容均为**非必填**的。但我仍然建议至少填写 `title` 、`urlname` 和 `date` 的值。

| 配置选项         | 默认值                         | 描述                                                                                                                                                                                       |
| ---------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| title            | `Markdown` 的文件标题          | 文章标题，强烈建议填写此选项                                                                                                                                                               |
| date             | 文件创建时的日期时间           | 发布时间，强烈建议填写此选项，且最好保证全局唯一                                                                                                                                           |
| author           | 根 `_config.yml` 中的 `author` | 文章作者                                                                                                                                                                                   |
| img              | `featureImages` 中的某个值     | 文章特征图，推荐使用图床(腾讯云、七牛云、又拍云等)来做图片的路径.如: `[http://xxx.com/xxx.jpg](http://xxx.com/xxx.jpg)`                                                                    |
| top              | `true`                         | 推荐文章（文章是否置顶），如果 `top` 值为 `true`，则会作为首页推荐文章                                                                                                                     |
| cover            | `false`                        | `v1.0.2`版本新增，表示该文章是否需要加入到首页轮播封面中                                                                                                                                   |
| coverImg         | 无                             | `v1.0.2`版本新增，表示该文章在首页轮播封面需要显示的图片路径，如果没有，则默认使用文章的特色图片                                                                                           |
| password         | 无                             | 文章阅读密码，如果要对文章设置阅读验证密码的话，就可以设置 `password` 的值，该值必须是用 `SHA256` 加密后的密码，防止被他人识破。前提是在主题的 `config.yml` 中激活了 `verifyPassword` 选项 |
| urlname          | index                          | 文章访问路径，需要在`Hexo`根目录下`_config.yml`文件中使用`permalink: :urlname/`和`permalink_defaults:`                                                                                     |
| `urlname: index` |
| toc              | `true`                         | permalink_defaults:是否开启 TOC，可以针对某篇文章单独关闭 TOC 的功能。前提是在主题的 `config.yml` 中激活了 `toc` 选项                                                                      |
| mathjax          | `false`                        | urlname: index 是否开启数学公式支持 ，本文章是否开启 `mathjax`，且需要在主题的 `_config.yml` 文件中也需要开启才行                                                                          |
| summary          | 无                             | 文章摘要，自定义的文章摘要内容，如果这个属性有值，文章卡片摘要就显示这段文字，否则程序会自动截取文章的部分内容作为摘要                                                                     |
| categories       | 无                             | 文章分类，本主题的分类表示宏观上大的分类，只建议一篇文章一个分类                                                                                                                           |
| tags             | 无                             | 文章标签，一篇文章可以多个标签                                                                                                                                                             |
| keywords         | 文章标题                       | 文章关键字，SEO 时需要                                                                                                                                                                     |
| reprintPolicy    | cc_by                          | 文章转载规则， 可以是 cc_by, cc_by_nd, cc_by_sa, cc_by_nc, cc_by_nc_nd, cc_by_nc_sa, cc0, noreprint 或 pay 中的一个                                                                        |

> **注意**:
>
> 1. 如果 `img` 属性不填写的话，文章特色图会根据文章标题的 `hashcode` 的值取余，然后选取主题中对应的特色图片，从而达到让所有文章都的特色图**各有特色**。
> 1. `date` 的值尽量保证每篇文章是唯一的，因为本主题中 `Gitalk` 和 `Gitment` 识别 `id` 是通过 `date` 的值来作为唯一标识的。
> 1. 如果要对文章设置阅读验证密码的功能，不仅要在 Front-matter 中设置采用了 SHA256 加密的 password 的值，还需要在主题的 `_config.yml` 中激活了配置。有些在线的 SHA256 加密的地址，可供你使用：[开源中国在线工具](http://tool.oschina.net/encrypt?type=2)、[chahuo](http://encode.chahuo.com/)、[站长工具](http://tool.chinaz.com/tools/hash.aspx)。
> 1. 您可以在文章 md 文件的 front-matter 中指定 reprintPolicy 来给单个文章配置转载规则

以下为文章的 `Front-matter` 示例。

### 自定制修改

在本主题的 `_config.yml` 中可以修改部分自定义信息，有以下几个部分：

- 菜单
- 我的梦想
- 首页的音乐播放器和视频播放器配置
- 是否显示推荐文章名称和按钮配置
- `favicon` 和 `Logo`
- 个人信息
- TOC 目录
- 文章打赏信息
- 复制文章内容时追加版权信息
- MathJax
- 文章字数统计、阅读时长
- 点击页面的'爱心'效果
- 我的项目
- 我的技能
- 我的相册
- `Gitalk`、`Gitment`、`Valine` 和 `disqus` 评论配置
- [不蒜子统计](http://busuanzi.ibruce.info/)和谷歌分析（`Google Analytics`）
- 默认特色图的集合。当文章没有设置特色图时，本主题会根据文章标题的 `hashcode` 值取余，来选择展示对应的特色图

**我认为个人博客应该都有自己的风格和特色**。如果本主题中的诸多功能和主题色彩你不满意，可以在主题中自定义修改，很多更自由的功能和细节点的修改难以在主题的 `_config.yml` 中完成，需要修改源代码才来完成。以下列出了可能对你有用的地方：

### 修改主题颜色

在主题文件的 `/source/css/matery.css` 文件中，搜索 `.bg-color` 来修改背景颜色：

```javascript
/* 整体背景颜色，包括导航、移动端的导航、页尾、标签页等的背景颜色. */
.bg-color {
    background-image: linear-gradient(to right, #4cbf30 0%, #0f9d58 100%);
}

@-webkit-keyframes rainbow {
   /* 动态切换背景颜色. */
}

@keyframes rainbow {
    /* 动态切换背景颜色. */
}
```

/

### 修改 banner 图和文章特色图

你可以直接在 `/source/medias/banner` 文件夹中更换你喜欢的 `banner` 图片，主题代码中是每天动态切换一张，只需 `7` 张即可。如果你会 `JavaScript` 代码，可以修改成你自己喜欢切换逻辑，如：随机切换等，`banner` 切换的代码位置在 `/layout/_partial/bg-cover-content.ejs` 文件的 `<script></script>` 代码中：

```javascript
$(".bg-cover").css(
  "background-image",
  "url(/medias/banner/" + new Date().getDay() + ".jpg)"
);
```

在 `/source/medias/featureimages` 文件夹中默认有 24 张特色图片，你可以再增加或者减少，并需要在 `_config.yml` 做同步修改。

### 修改文章访问路径 urlname

在`Hexo`根目录`_config.yaml`中添加以下配置

```
# permalink: :year/:month/:day/:title/
permalink: :urlname/
permalink_defaults:
  urlname: index
```

##

### 全站 CDN

> CDN 的全称是`Content Delivery Network`，即内容分发网络。CDN 是构建在网络之上的内容分发网络，依靠部署在各地的边缘服务器，通过中心平台的负载均衡、内容分发、调度等功能模块，使用户就近获取所需内容，降低网络拥塞，提高用户访问响应速度和命中率。CDN 的关键技术主要有内容存储和分发技术。——百度百科

放在 Github 的资源在国内加载速度比较慢，因此需要使用 CDN 加速来优化网站打开速度，jsDelivr + Github 便是免费且好用的 CDN，非常适合博客网站使用。

用法：
[https://cdn.jsdelivr.net/gh/](https://cdn.jsdelivr.net/gh/)你的用户名/你的仓库名@发布的版本号/文件路径

如：
[http://cdn.jsdelivr.net/gh/hongweifuture/hongweifuture.github.io/medias/featureimages/](http://cdn.jsdelivr.net/gh/hongweifuture/hongweifuture.github.io/medias/featureimages/)12.jpg
注意：版本号不是必需的，是为了区分新旧资源，如果不使用版本号，将会直接引用最新资源，如果需要版本，请创建`releases`然后按照格式添加
当然最直接的办法就是使用 `username/username.github.io/`
