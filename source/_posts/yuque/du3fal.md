---
title: 给文件添加一个.gitignore
urlname: du3fal
date: '2020-05-01 19:48:14 +0800'
tags: []
categories: []
abbrlink: 6f1cbacf
---

## 1.WHY?

.gitignore 文件只要在这个文件中申明那些文件你不希望添加到 git 中去，这样当你使用`git add .`这些文件就会被自动忽略掉

## 2.忽略文件的原则

- 忽略操作系统自动生成的文件，比如缩略图等；
- 忽略编译生成的中间文件、可执行文件等，也就是如果一个文件是通过另一个文件自动生成的，那自动生成的文件就没必要放进版本库，比如 Java 编译产生的.class 文件；
- 忽略你自己的带有敏感信息的配置文件，比如存放口令的配置文件。

## 3.使用方法

首先，在你的工作区新建一个名称为`.gitignore`的文件。
然后，把要忽略的文件名填进去，Git 就会自动忽略这些文件。
不需要从头写.gitignore 文件，GitHub 已经为我们准备了各种配置文件，只需要组合一下就可以使用了。所有配置文件可以直接在线浏览：[https://github.com/github/gitignore](https://link.jianshu.com?t=https://github.com/github/gitignore)

## 4.例子

比如你的项目是 java 项目，`.java`文件编译后会生成`.class`文件，这些文件多数情况下是不想被传到仓库中的文件。这时候你可以直接适用 github 的.gitignore 文件模板。[https://github.com/github/gitignore/blob/master/Java.gitignore](https://link.jianshu.com?t=https://github.com/github/gitignore/blob/master/Java.gitignore) 将这些忽略文件信息复制到你的.gitignore 文件中去：

```
*.class
# Mobile Tools for Java (J2ME)
.mtj.tmp/
# Package Files #
*.jar
*.war
*.ear
# virtual machine crash logs, see http://www.java.com/en/download/help/error_hotspot.xml
hs_err_pid*
```

可以看到 github 为我们提供了最流行的.gitignore 文件配置。
保存.ignore 文件后我们查看下 git status，检查下是否还有我们不需要的文件会被添加到 git 中去：

```
$ git status
On branch master
Initial commit
Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
        new file:   .gitignore
        new file:   HelloWorld.java
Untracked files:
  (use "git add <file>..." to include in what will be committed)
        Config.ini
```

比如我的项目目录下有一个 Config.ini 文件，这个是个本地配置文件我不希望上传到 git 中去，我们可以在 gitignore 文件中添加这样的配置：

```javascript
Config.ini;
```

或者你想忽略所有的.ini 文件你可以这样写：

```javascript
*.ini
```

如果有些文件已经被你忽略了，当你使用`git add`时是无法添加的，比如我忽略了`*.class`，现在我想把`HelloWorld.class`添加到 git 中去：

```javascript
$ git add HelloWorld.class
The following paths are ignored by one of your .gitignore files:
HelloWorld.class
Use -f if you really want to add them.
```

git 会提示我们这个文件已经被我们忽略了，需要加上`-f`参数才能强制添加到 git 中去：

```javascript
$ git status
On branch master
Initial commit
Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
        new file:   .gitignore
        new file:   HelloWorld.class
        new file:   HelloWorld.java
```

这样就能强制添加到缓存中去了。
如果我们意外的将想要忽略的文件添加到缓存中去了，我们可以使用`rm`命令将其从中移除：

```javascript
$ git rm HelloWorld.class --cached
rm 'HelloWorld.class'
```

如果你已经把不想上传的文件上传到了 git 仓库，那么你必须先从远程仓库删了它，我们可以从远程仓库直接删除然后 pull 代码到本地仓库这些文件就会本删除，或者从本地删除这些文件并且在.gitignore 文件中添加这些你想忽略的文件，然后再 push 到远程仓库。

## 5.查看 gitignore 规则

如果你发下`.gitignore`写得有问题，需要找出来到底哪个规则写错了，可以用`git check-ignore`命令检查：

```javascript
$ git check-ignore -v HelloWorld.class
.gitignore:1:*.class    HelloWorld.class
```

可以看到`HelloWorld.class`匹配到了我们的第一条`*.class`的忽略规则所以文件被忽略了。

## 6.忽略规则文件语法

### a.忽略指定文件/目录

```javascript
# 忽略指定文件
HelloWrold.class
# 忽略指定文件夹
bin/
bin/gen/
```

### b.通配符忽略规则

通配符规则如下：

```javascript
# 忽略.class的所有文件
*.class
# 忽略名称中末尾为ignore的文件夹
*ignore/
# 忽略名称中间包含ignore的文件夹
*ignore*/
```
