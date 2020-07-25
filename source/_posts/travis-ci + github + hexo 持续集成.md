---
tags:
  - travis-ci
  - github
categories: hexo
abbrlink: '57697582'
---

![image.png](https://cdn.nlark.com/yuque/0/2020/png/241787/1595663167477-d0887ed2-2d07-44de-8bd3-047da48b1907.png#align=left&display=inline&height=101&margin=%5Bobject%20Object%5D&name=image.png&originHeight=201&originWidth=642&size=23963&status=done&style=none&width=321)

## Hexo 博客源代码 GitHub 托管

## 1.注册 travis-ci

Travis CI 的网站有两个，
`travis-ci.org`  专门针对开源项目，GitHub 上所有的公开仓库都能够免费使用；
`travis-ci.com`  针对私有及商业项目，新用户前 100 次构建是免费的，后面就要收费了。

### 登录 Travis CI 网站

1. 前往 [Travis-ci.com](https://travis-ci.com/) and Sign up with GitHub.
1. 接受授权
1. 选择你想要使用 Travis CI 的仓库 或者 你也可以在 Github-settings-Applications-TravisCI-Configure 中去更新配置；
1. 在你仓库怎增加 `.travis.yml` 文件，这个文件定义了构建的步骤，例如[安装依赖](https://docs.travis-ci.com/user/job-lifecycle/#customizing-the-installation-phase)等等。
1. 将 `.travis.yml` 文件推送到你的远端仓库，然后就会触发 Travis CI 构建；
1. 登录 [Travis CI](https://travis-ci.com/)然后选择你的仓库查看构建任务的执行详情；
