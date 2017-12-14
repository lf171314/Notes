# Array 对象归纳

> Array 仍然是一个对象，拥有自己的属性，它的方法都放在原型上。

## Array 构造函数的属性

1. constructor

`constructor`属性是指向构造函数`Array`。

2. length

`length`属性返回的是数组的长度。

## Array 原型上的方法

1. concat

将两个数组拼接一起，并返回拼接后的数组。

```javascript
var a = [4, 5, 6], b = [1, 2, 3]
a.concat(b)  // [4, 5, 6, 1, 2, 3]
a.concat(2)  // [4, 5, 6, 2]
```

2. join

将数组的每一项通过传进来的分隔符**(默认是',')**拼接成一个字符串，并返回拼接后的字符串。

```javascript
var a = [1, 2, 3, 4]
a.join()  // '1,2,3,4'
a.join('|')  // '1|2|3|4|'
```

3. pop

删除并返回数组的最后一项。(无参数)

```javascript
var a = ['a', 'b', 'c', 'd']
a.pop()  // 'd'
```

4. push

向数组的末尾添加一项，并返回新数组的长度。

```javascript
var a = [1, 2, 3]
a.push('a')  // 4
```

5. shift

删除并返回数组的第一项。(无参数)

```javascript
var a = ['a', 'b', 'c']
a.shift()  // 'a'
```

6. unshift

向数组的头部添加一项，并返回新数组的长度。

```javascript
var a = [1, 2, 3]
a.unshift('a')  // 4
```

7. reverse

颠倒数组的排序，并返回新数组。(无参数)

```javascript
var a = [1, 2, 3, 4]
a.reverse()  // [4, 3, 2, 1]
```

8. slice

截取并返回选定的数组元素。(startIndex, endIndex)

- startIndex: 起始索引。
- endIndex: 截止索引(不包含)。

```javascript
var a = [1, 2, 3, 4, 5]
a.slice(1, 3) // [2, 3]
```

- startIndex 可以为负值，从后往前截取。
- endIndex 可以不传值，表示从 startIndex 开始截取到末尾的所有元素。
- startIndex 一定要比 endIndex 的值小。

9. sort

对数组元素排序, 返回排序后的数组。

```javascript
var a = [1, 3, 5, 2, 4]
a.sort() // [1, 2, 3, 4, 5]
```

可以往 sort 方法传一个方法，返回值是 true 时降序排序，false 时升序排序。

```javascript
var a = [1, 3, 5, 2, 4]
a.sort((a, b) => a - b)	// [1, 2, 3, 4, 5]
```

- sort 排序是根据元素的ASCII码值的大小进行排序。
- sort 返回的数组是原来数组的引用。

10. splice

对数组进行增删改操作，并返回被修改的数组。(index, count, item1, …, itemX)

- index: 起始索引。
- count: 删除的数量。
- item1…itemX: 替换的元素。

```javascript
var a = [1, 'a', 2, 'b', 3, 'c']
 
 // 增加元素
a.splice(0, 0, 6)  // a = [6, 1, 'a', 2, 'b', 3, 'c']
console.log(a.splice(0, 0, 6))  // []

// 修改元素
a.splice(0, 2, 'x', 'y')  // a = ['x', 'y', 2, 'b', 3, 'c']
console.log(a.splice(0, 2, 'x', 'y'))  // [1, 'a']

// 删除元素
a.splice(0, 2)  // a = [2, 'b', 3, 'c']
console.log(a.splice(0, 2))  // [1, 'a']
```

- index 可以为负值，从数组末尾开始计算。

11. ​

