---
tags:
  - setData
categories: 小程序
abbrlink: 611009a3
---

## 1.修改对象属性

##

### 1>第一种

```javascript
 changePerson:function(e){
    var str = 'person.name';
    this.setData({
      [str]: 'fxjzzyo'
    })
  },
```

###

### 2>第二种

```javascript
changePerson:function(e){
    this.setData({
      'person.name': 'fxjzzyo'
    })
  },
```

#

## 2.修改数组属性

```javascript
this.setData({
  ["array[" + index + "].amount"]: amount,
});
```
