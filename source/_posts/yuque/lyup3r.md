---
title: yuque文档一键同步到 hexo
urlname: lyup3r
date: 2020-05-02 17:09:18 +0800
tags: []
categories: []
---

```javascript
"scripts"{
		"clean": "hexo clean",
    "publish": "npm run clean && npm run deploy",
    "deploy": "npm run sync && hexo g -d",
    "server": "hexo server",
    "clean:yuque": "yuque-hexo clean",
    "sync": "yuque-hexo sync",
    "reset": "npm run clean:yuque && npm run sync"
  }
```
