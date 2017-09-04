

# [NUXT](https://zh.nuxtjs.org/guide) 笔记

[TOC]

## NUXT 简介

> Nuxt 是基于 Vue 的服务端渲染框架， 是用来解决 Vue 的 SEO 的问题

## NUXT 运行流程

![nuxt-schema](https://zh.nuxtjs.org/nuxt-schema.png)

## Nuxt安装

> Nuxt 提供了三个模板 start，express，koa

### 安装 start 模板

```shell
npm install -g vue-cli	// 安装 vue-cli 
vue init nuxt/start <project name>	// 创建 nuxt 的 start 模板
cd <project name>	// 进入项目根目录
npm install		// 安装依赖
npm run dev		// 启动项目
```

### 安装 expres 模板

```shell
npm install -g vue-cli	// 安装 vue-cli 
vue init nuxt/express <project name>	// 创建 nuxt 的 express 模板
cd <project name>	// 进入项目根目录
npm install		// 安装依赖
npm run dev		// 启动项目
```

### 安装 koa 模板

```shell
npm install -g vue-cli	// 安装 vue-cli 
vue init nuxt/koa <project name>	// 创建 nuxt 的 koa 模板
cd <project name>	// 进入项目根目录
npm install		// 安装依赖
npm run dev		// 启动项目
```

> `npm run dev`后在浏览器输入 http://127.0.0.1:3000 来访问运行的项目

[^项目启动未成功且依赖安装完成，报错说没有找到与 nuxt 相关的文件，重新构建下]: 执行下`npm run build`后在重新启动下项目

## Nuxt 路由

> Nuxt 根据 `pages` 的目录结构生成 vue-router 路由文件配置 

### 基础路由

`pages` 目录结构如下：

   ```javascript
pages/
--| users/
----| shop.vue
----| index.vue
--| index.vue
   ```

Nuxt 生成对应的路由配置：

```javascript
router: {
  routes: [
    {
      path: '/',
      name: 'index',
      component: 'pages/index.vue'
    },
    {
      path: '/users',
      name: 'users',
      component: 'pages/users/index.vue'
    },
    {
      path: '/users/shop',
      name: 'users-shop',
      component: 'pages/users/shop.vue'
    }
  ]
}
```

### 动态路由

`pages`目录结构如下：

```javascript
pages/
--| users/
----| index.vue
----| _id.vue
--| index.vue
```

Nuxt 生成对应的路由配置：

```javascript
router: {
  routes: [
    {
      path: '/',
      name: 'index',
      component: 'pages/index.vue'
    },
    {
      path: '/users',
      name: 'users',
      component: 'pages/users/index.vue'
    },
    {
      path: '/users/:id',
      name: 'users-id',
      component: 'pages/users/_id.vue'
    }
  ]
}
```

### 嵌套路由

`pages`目录如下：

```javascript
pages/
--| shops/
----| _id/
------| index.vue
------| product.vue
----| _id.vue
----| index.vue
--| index.vue
```

Nuxt 生成对应的路由配置：

```javascript
router: {
  routes: [
    {
      path: '/',
      name: 'index',
      component: 'pages/index.vue'
    },
    {
      path: '/shops',
      name: 'shops',
      component: 'pages/shops/index.vue'
    },
    {
      path: '/shops/:id',
      component: 'pages/shops/_id.vue',
      children: [
        {
          path: '',
          name: 'shops-id',
          component: 'pages/shops/_id/index.vue'
        },
        {
		  path: '/product',
          name: 'shops-id-product',
          component: 'pages/shops/_id/product.vue'
        }
      ]
    }
  ]
}
```

## [Vuex 状态树](https://zh.nuxtjs.org/guide/vuex-store#使用状态树)

> Nuxt 会找到应用根目录下的 `store`目录， 生成对应的状态树
>
> - **普通方式** ：`store/index.js` 返回一个 Vuex.store 实例
> - **模块方式** ：`store`目录下的每个`.js`文件会被转换成状态树的指定命名的子模块

## Nuxt 扩展的方法

> Nuxt 自己在 Vue.js 的基础上扩展了两个方法`asyncData`和`fetch`

### asyncData 方法

> 这是 Nuxt 在 Vue 的基础上增加的一个方法，叫`asyncData`，可以在设置组件数据之前异步获取或处理数据

`asyncData`方法会在**页面组件**（仅限于`pages`目录下的组件）每次加载之前被调用。 利用`asyncData`方法来获取数据，第一个参数是当前页面的`上下文对象`，Nuxt 会将 `asyncData`返回的数据与当前页面的`data`方法返回的数据融合一起返回个当前组件。

> `ayncData` 可以使用几种不同的方法来获取数据

1. 返回一个`Promise`，Nuxt 会等待该`Promise`被解析之后才会设置组件，从而渲染组件

2. 使用`async await`

3. 为第二个参数指定一个回调函数

> 注意：因为`asyncData`方法在组件**初始化**前被调用，所以该方法内没有办法通过`this`指向引用组件的实例对象，可以利用第一个参数`context`来获取当前组件的上下文。

### fetch 方法

> `fetch`方法用于在渲染页面前填充应用的状态树 *(store)* 数据，与`asyncData`方法类似，不同的是它不会设置组件数据。第一个参数是**页面组件**的上下文对象`context`。为了让获取过程可以异步，需要返回一个`Promise`，Nuxt 会等这个`Promise`完成后在渲染组件。

代码示例`pages/index.vue`：

```html
<script>
  export default {
  	async fetch ({store, params}) {
  	  let { data } = await axios.get(`http://api.douban.com/v2/book/${params.id}`)
	  store.commit('book', data)
	}
  }
</script>
```

## Nuxt 的目录结构

> Nuxt 的每个目录都有各自的作用，层级分明。

### Nuxt 主要目录说明

```
<project name>
--| assets/			// 资源目录
----| css
----| img
--| layouts/ 		// 布局目录
----| default.vue		// 默认模板  
----| error.vue			// 错误页面
--| components		// 组件目录
--| middleware		// 中间件目录
--| plugins/		// 插件目录
----| axios.js			// axios 配置文件
--| static			// 静态文件目录
--| store			// Vuex 目录（默认不存在的）
--| nuxt.config.js	// Nuxt.js 的配置文件
```

### Nuxt 的配置别名

| 别名          | 目录          |
| ----------- | ----------- |
| ~           | /           |
| ~assets     | /assets     |
| ~components | /components |
| ~pages      | /pages      |
| ~plugins    | /plugins    |
| ~store      | /store      |
| ~static     | /static     |



