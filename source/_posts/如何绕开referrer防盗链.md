---
tags:
  - referrer
  - 防盗链
categories: hexo
abbrlink: 32ce62eb
---

## 什么是 referrer

当一用户点击当前页面中的一个链接，然后跳转到目标页面时，目标页面会收到一个信息，即用户是从哪个源链接跳转过来的。如下图所示：
![image.png](https://cdn.nlark.com/yuque/0/2020/png/241787/1595703140078-870fec1d-0742-4dea-828a-1f32819af187.png#align=left&display=inline&height=543&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1086&originWidth=1184&size=153142&status=done&style=none&width=592)
![](https://cdn.nlark.com/yuque/0/2020/webp/241787/1595702418075-1743cd6e-ed7c-4b5b-9f96-7f89fff17373.webp#align=left&display=inline&height=543&margin=%5Bobject%20Object%5D&originHeight=543&originWidth=896&size=0&status=done&style=none&width=896)
也就是说，当你发起一个 http 请求，请求头中的`referrer`字段就说明了你是从哪个页面发起该请求的。

## 使用场景

有时候我们需要控制这个`referrer`字段的值，即是否让其显示在请求头中，或者是否显示完整路径等。尤其是在以下两个使用场景：

### 隐私

在社交网站的个人中心页面，也许会存在一些外链，这时候社交网站肯定不希望用户在点击这些链接跳转到其他第三方网站时会将自己个人中心的 URL 信息显示在`referrer`字段中传过去，尤其是个人中心页面的 URL 往往会带着用户数据和一些敏感信息。这时候可以选择不显示来源页面 URL 信息或者只显示一个网站根地址 hostname。

### 安全

有些使用了 https 的网站，可能在 URL 中使用一个参数（sid）来作为用户身份凭证，而又需要引入其他 https 网站的资源，这种情况，网站肯定不希望泄露用户的身份凭证信息。当 https 网站需要引入不安全的 http 网站的资源或者有链接要跳转到 http 网站时，这时候将 https 源网站的 URL 信息传过去也是不太安全的。
当然还有其他情况下需要`referrer`的值，比如最近公司所做的项目中，有一个请求由于请求头过大导致响应是 400，我们的`Referrer Policy`是默认的情况，显示的`referrer`是完整的 URL 信息，该 URL 带了很多敏感数据比如加密后的 token，sessionID 等，长度特别长，请求头中的 cookie 和请求的 URL 也带着很大块的信息，最终我们决定让`referrer`只携带网站根地址的信息而不是其完整路径，由此减小了 header 的大小。

## Referrer-Policy

`Referrer-Policy`的作用就是为了控制请求头中`referrer`的内容，目前`Referrer-Policy`只包含以下几种值：

| 策略名称                   | 属性值（新）               | 属性值（旧） |
| :------------------------- | :------------------------- | :----------- |
| No Referrer                | no-referrer                | never        |
| No Referrer When Downgrade | no-referrer-when-downgrade | default      |
| Origin Only                | origin                     | -            |
| Origin When Cross-origin   | origin-when-crossorigin    | -            |
| Unsafe URL                 | unsafe-url                 | always       |

简单介绍下这五种类型的具体含义：

- **No Referrer**：任何情况下都不发送 Referrer 信息；
- **No Referrer When Downgrade**：仅当发生协议降级（如 HTTPS 页面引入 HTTP 资源，从 HTTPS 页面跳到 HTTP 等）时不发送 Referrer 信息。这个规则是现在大部分浏览器默认所采用的；
- **Origin Only**：发送只包含 host 部分的 Referrer。启用这个规则，无论是否发生协议降级，无论是本站链接还是站外链接，都会发送 Referrer 信息，但是只包含协议 + host 部分（不包含具体的路径及参数等信息）；
- **Origin When Cross-origin**：仅在发生跨域访问时发送只包含 host 的 Referrer，同域下还是完整的。它与 `Origin Only` 的区别是多判断了是否 `Cross-origin`。需要注意的是协议、域名和端口都一致，才会被浏览器认为是同域；
- **Unsafe URL**：无论是否发生协议降级，无论是本站链接还是站外链接，统统都发送 Referrer 信息。正如其名，这是最宽松而最不安全的策略；

## Referrer-Policy 更改方法

可以有以下 4 种方法：

**1.** `Referrer-Policy` HTTP `header`设置：

```javascript
Referrer-Policy: origin
```

**2.** 通过`<meta>`元素改变`Referrer Policy`，直接修改名为`referrer`的内容

```javascript
<meta name="referrer" content="origin">复制代码
```

**3.** 给 [`<a>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a), [`<area>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/area), [`<img>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img), [`<iframe>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe), 或者[`<link>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link)元素设置`referrerpolicy`属性

```javascript
<a href="http://example.com" referrerpolicy="origin">复制代码
```

**4.** 如需设置不显示`referrer`信息时，也可以给 [`<a>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a), [`<area>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/area), [`<link>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link)元素设置`rel`的链接关系。

```
<a href="http://example.com" rel="noreferrer">复制代码
```

## 总结

使用何种`Referrer Policy`取决于网站的需求，但是一般来说，`unsafe-url`是不太建议用的，同样，如果是只想显示网站的根地址，那么建议用`strict-origin`和 s`trict-origin-when-cross-origin`。如果 URL 中没有什么敏感信息，那就默认使用`no-referrer-when-downgrade`。

特别声明，文章转载自：[https://juejin.im/post/5cd81b59518825686a06fd05](https://juejin.im/post/5cd81b59518825686a06fd05) 。
