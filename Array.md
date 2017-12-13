# Array 对象归纳

> Array 仍然是一个对象，拥有自己的属性，它的方法都放在原型上。

## Array 构造函数的属性

1. constructor

`constructor`属性是指向构造函数`Array`。

1. length

`length`属性返回的是数组的长度。

## Array 原型上的方法

1. concat

将两个数组拼接一起，并返回拼接后的数组。

```javascript
var a = [4, 5, 6], b = [1, 2, 3]
a.concat(b)    // [4, 5, 6, 1, 2, 3]
a.concat(2) // [4, 5, 6, 2]
```

1. join

将数组的每一项通过传进来的分隔符**(默认是',')**拼接成一个字符串，并返回拼接后的字符串。

```javascript
var a = [1, 2, 3, 4]
a.join()    // '1,2,3,4'
a.join('|')    // '1|2|3|4|'
```

1. pop

删除并返回数组的最后一项。(无参数)

```javascript
var a = ['a', 'b', 'c', 'd']
a.pop()    // 'd'
```

1. push

向数组的末尾添加一项，并返回新数组的长度。

```javascript
var a = [1, 2, 3]
a.push('a')    // 4
```

1. shift

删除并返回数组的第一项。(无参数)

```javascript
var a = ['a', 'b', 'c']
a.shift()    // 'a'
```

1. unshift

向数组的头部添加一项，并返回新数组的长度。

```javascript
var a = [1, 2, 3]
a.unshift('a')    // 4
```

1. reverse

颠倒数组的排序，并返回新数组。(无参数)

```javascript
var a = [1, 2, 3, 4]
a.reverse() // [4, 3, 2, 1]
```

1. slice
