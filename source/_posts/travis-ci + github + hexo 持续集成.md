---
tags:
  - travis-ci
  - github
categories: hexo
abbrlink: 34284
date: 2020-07-20 19:57:21
updated: 2020-07-20 19:57:21
---

## Hexo 博客源代码 GitHub 托管

## 1.注册 travis-ci

Travis CI 的网站有两个，
`travis-ci.org`  专门针对开源项目，GitHub 上所有的公开仓库都能够免费使用；
`travis-ci.com`  针对私有及商业项目，新用户前 100 次构建是免费的，后面就要收费了。

## 2.登录 Travis CI 网站

1. 前往 [Travis-ci.com](https://travis-ci.com/) and Sign up with GitHub.
1. 接受授权
1. 选择你想要使用 Travis CI 的仓库 或者 你也可以在 Github-settings-Applications-TravisCI-Configure 中去更新配置；
1. 在你仓库怎增加 `.travis.yml` 文件，这个文件定义了构建的步骤，例如[安装依赖](https://docs.travis-ci.com/user/job-lifecycle/#customizing-the-installation-phase)等等。
1. 将 `.travis.yml` 文件推送到你的远端仓库，然后就会触发 Travis CI 构建；
1. 登录 [Travis CI](https://travis-ci.com/)然后选择你的仓库查看构建任务的执行详情；

## 3.配置 Travis CI

#### 1>网页端配置

首先进入 [Travis CI 官网](https://travis-ci.org/)，这里我们使用的是免费版的，因为考虑到一般放在 GitHub 上的博客都是公开的，所以不需要付费版本。如果有私有仓库要使用这种方式，可以使用 [付费版的 Travis CI](https://travis-ci.com/)。然后直接通过 GitHub 账户登陆即可，登陆后可以看到我们的共有仓库，找到博客的仓库，我这里是选择 blog-master 源码仓库（博客仓库：leader755.github.io），把旁边的勾勾上，然后点击旁边的 `Settings` 进入设置页面。
![image.png](https://cdn.nlark.com/yuque/0/2020/png/241787/1595728277292-624821ea-7b95-4db8-89fe-22ece79e75db.png#align=left&display=inline&height=457&margin=%5Bobject%20Object%5D&name=image.png&originHeight=914&originWidth=1686&size=85154&status=done&style=none&width=843)
![image.png](https://cdn.nlark.com/yuque/0/2020/png/241787/1595728301454-068409c1-f596-4e35-aa3a-d9d2d3c5b39c.png#align=left&display=inline&height=527&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1054&originWidth=1752&size=108378&status=done&style=none&width=876)

在设置页面中，General 中只勾选 `Build pushed branches`，表示当有新的代码 push 到 GitHub 仓库时，自动执行构建任务。其他设置保持默认即可。
![image.png](https://cdn.nlark.com/yuque/0/2020/png/241787/1595728534111-16bc9014-0036-44ef-8036-8117eb15dffd.png#align=left&display=inline&height=532&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1064&originWidth=1910&size=135305&status=done&style=none&width=955)

接下来为 Travis 添加对 GitHub 仓库的读写权限。进入 [Personal access tokens](https://github.com/settings/tokens) 页面，点击 `Generate new token`，选择 token 权限(这里直选 repo 即可)，设置别名并生成。然后将生成的 token 值复制。
![image.png](https://cdn.nlark.com/yuque/0/2020/png/241787/1595728617792-342093c6-0176-4ece-90e0-f1395c93d7cf.png#align=left&display=inline&height=645&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1290&originWidth=2304&size=230289&status=done&style=none&width=1152)
接着在原来 Travis 的设置界面添加 token。如图所示：
![image.png](https://cdn.nlark.com/yuque/0/2020/png/241787/1595728826735-1b3d72da-2248-4837-9c46-4b6ce410bfdf.png#align=left&display=inline&height=324&margin=%5Bobject%20Object%5D&name=image.png&originHeight=648&originWidth=2006&size=113373&status=done&style=none&width=1003)
在 Name 中填入 token 的别名，Value 中填入刚刚得到的 token，然后点击 Add 进行添加即可。注意 token 一旦生成，只能在生成时得到其值，后面无法查看。所以如果还有需要，可以记下来或者重新生成新的 token。

#### 2>Travis 配置文件

接下来还需要编写 Travis 的配置文件，用于指定构建时使用哪些命令。配置文件名为 `.travis.yml`，是自动化构建的配置文件。文件内容示例如下：

```javascript
# 指定构建环境是Node.js，当前版本是稳定版 (stable),版本这里我们选择最新的长期支持版本（ LTS） 应该就够用了
anguage: node_js
node_js:
  - lts/*  # 稳定版 (stable) ,最新长期支持版（ - lts/* ）

# 指定缓存模块，可加快编译速度
cache:
  directories:
    - node_modules

# 在构建之前
before_install:
  - export TZ='Asia/Shanghai' # 更改时区
  - npm install -g hexo-cli # 安装hexo环境

#部署环境的安装(安装一个部署插件)
install:
  - npm install
  - npm install hexo-deployer-git --save

before_script:
 #

# 执行清缓存，生成网页操作
script:
  - hexo clean && hexo g

after_script:  # 未能成功
  - git config user.name "Leader755"
  - git config user.email "1181012791@qq.com"
   # 替换同目录下的_config.yml文件中gh_token字符串为travis后台刚才配置的变量，注意此处sed命令用了双引号。单引号无效！
  - sed -i "s/gh_token/${GH_TOKEN}/g" ./_config.yml
  - hexo deploy

	# 版本 二（未能成功）
  # - cd .deploy_git
  # - git checkout master
  # - cd ../
  # - sed -i'' "s~${GH_REF}~${GH_TOKEN}:x-oauth-basic@${GH_REF}~" _config.yml
  # - hexo d > log.txt 2>&1
  # - cat log.txt | sed "自动构建Travis CI Auto Builder at $(date +'%Y-%m-%d %H:%M:%S')"
  # - echo "自动构建Travis CI Auto Builder at $(date +'%Y-%m-%d %H:%M:%S')" # 构建后输出时间标识

	# 版本三（能正常构建提交到博客 leader755.github.io,但是并不是使用 hexo d  命令触发的）
	# after_script:
  # - cd ./public
  # - git init
  # - git config user.name "your-git-name"
  # - git config user.email "your-email-address"
  # - git add .
  # - git commit -m "Travis CI Auto Builder at $(date +'%Y-%m-%d %H:%M:%S')"
  # - git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master:master


# 指定博客源码分支，Travis CI 监控哪一个分支的变动，这里是 master 分支（若博客备份文件和 GitHub Pages 共用一个仓库的话需设置为博客备份文件所在分支）。
branches:
  only:
    - master

# End: Build LifeCycle

# configure notifications (email, IRC, campfire etc)
# please update this section to your needs!
# https://docs.travis-ci.com/user/notifications/
notifications:
  email:
    - 1181012791@qq.com
  on_success: change
  on_failure: always


```

到这里我就出问题了，虽然能成功触发构建，但是并不能使用 hexo d 发布到 leader755.github.io 这个博客仓库。目前还没找出问题在哪里，出现问题地方应该在生命周期 after_script: ,如果有知道还请留言回复，感激不尽。虽然没有成功使用吧。但是也算对 travis-ci 有初步的认识吧。继续折腾吧。

## 4.认识 Job Lifecycle–Job 的生命周期

Travis CI 为每种编程语言提供默认构建环境和默认的阶段集。 创建虚拟机为你的 Job 提供构建环境，将存储库克隆到其中，安装可选的插件，然后运行构建阶段。
job 的声明周期，主要包含两大部分：
install：安装依赖，官网有专门讲解的 [Installing Dependencies](https://docs.travis-ci.com/user/installing-dependencies/)
script：运行构建脚本；
在 installation 阶段之前（beofore_install）、在 script phase 之前（before_script）或之后（after_script），你可以运行自定义命令；
当构建成功或失败置换后，可以使用 after_success（例如构建文档）或 after_failure（例如上载日志文件）阶段执行其他操作（actions）。 在 after_failure 和 after_success 中，您可以使用\$TRAVIS_TEST_RESULT 环境变量获取构建结果。

完整的 job 生命周期(包括三个可选的部署阶段，以及在检出 git 存储库 和更改到存储库目录) 如下：

- [**apt addons**](https://docs.travis-ci.com/user/installing-dependencies/#installing-packages-with-the-apt-addon)** 可选安装**
- [**cache components**](https://docs.travis-ci.com/user/caching)** 可选安装**
- **before_install**
- **install**
- **before_script**
- **script**
- **before_cache (for cleaning up cache) 可选**
- **after_success or after_failure**
- **before_deploy 可选**
- **deploy 可选**
- **after_deploy 可选**
- **after_script**

一次构建任务可有许多 job 组成。
