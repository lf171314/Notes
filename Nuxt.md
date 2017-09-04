# NUXT 笔记

[TOC]

## [NUXT 简介](https://zh.nuxtjs.org/guide)

> Nuxt 是基于 Vue 的服务端渲染框架， 是用来解决 Vue 的 SEO 的问题

## [NUXT 流程图](https://zh.nuxtjs.org/guide#流程图)

![nuxt-schema](https://zh.nuxtjs.org/nuxt-schema.png)

## [Nuxt 安装](https://zh.nuxtjs.org/guide/installation)

> Nuxt 提供了三个模板 start，express，koa

### 安装 start 模板

```
npm install -g vue-cli	// 安装 vue-cli
vue init nuxt/start <project name>	// 创建 nuxt 的 start 模板
cd <project name>	// 进入项目根目录
npm install		// 安装依赖
npm run dev		// 启动项目
```

### 安装 expres 模板

```
npm install -g vue-cli	// 安装 vue-cli
vue init nuxt/express <project name>	// 创建 nuxt 的 express 模板
cd <project name>	// 进入项目根目录
npm install		// 安装依赖
npm run dev		// 启动项目
```

### 安装 koa 模板

```
npm install -g vue-cli	// 安装 vue-cli
vue init nuxt/koa <project name>	// 创建 nuxt 的 koa 模板
cd <project name>	// 进入项目根目录
npm install		// 安装依赖
npm run dev		// 启动项目
```

> `npm run dev`后在浏览器输入 <http://127.0.0.1:3000> 来访问运行的项目

[^项目启动未成功且依赖安装完成，报错说没有找到与 nuxt 相关的文件，重新构建下]: 执行下`npm run build`后在重新启动下项目

## [Nuxt 的目录结构](https://zh.nuxtjs.org/guide/directory-structure)

> Nuxt 的每个目录都有各自的作用，层级分明。

### Nuxt 主要目录说明

```shell
<project name>
--| assets/            // 资源目录
----| css
----| img
--| layouts/         // 布局目录
----| default.vue        // 默认模板  
----| error.vue            // 错误页面
--| components        // 组件目录
--| middleware        // 中间件目录
--| plugins/        // 插件目录
----| axios.js            // axios 配置文件
--| static            // 静态文件目录
--| store            // Vuex 目录（默认不存在的）
--| nuxt.config.js    // Nuxt.js 的配置文件
--| backpack.config.js // Nuxt.js 入口文件配置
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

## [Plugins 目录](https://zh.nuxtjs.org/guide/plugins)

> 需要在 **根vue.js应用** 实例化之前需要运行的插件，可以自己写的库或者第三方模块。需要注意的是，在任何Vue 组件的**生命周期**内只有`beforeCreate`和`created`这两个钩子函数会在**服务端渲染和客户端渲染**时被调用，其他钩子函数只能在客户端渲染时被调用。

### [axios](https://github.com/mzabriskie/axios/blob/master/README.md)

> `axios` 是 Nuxt 默认使用的 HTTP 请求库，它将会在服务端跟客户端共同使用。

在不同的页面都引入了`axios`插件，那么在打包的时候将会把`axios`多次打包，而实际上只需要打包一次。可以通过在`nuxt.config.js`里面设置`build.vendor`来解决。

```javascript
module.exports = {
  build: {
    vendor: ["axios"]
  }
}
```

经过上面的配置后，我们可以在任何页面里面引入 `axios` 而不用担心它会被重复打包。

### [ElementUi](http://element.eleme.io/#/zh-CN/component/installation)

> 饿了么推出的基于Vue2开发的组件库。

在`plugins`目录下创建`element-ui.js`文件，在里面完成`element-ui`的引入。

```javascript
import Vue form 'vue'
import ElementUI form 'element-ui'

// 如果引入这个语言包 可能存在 ElementUI 没效果的问题
const locale = require('element-ui/lib/locale/zh_CN')

Vue.use(ElementUI, { locale })
```

组件按需引入，参考<http://element.eleme.io/#/zh-CN/component/quickstart#yin-ru-element。>

```javascript
// nuxt.config.js
module.exports = {
  build: {
    vendor: ["element-ui"],
    babel: {
      plugins: [
        ["component", [{
          libraryName: "element-ui",
          styleLibraryName: "theme-default"
        }]]
      ]
    }
  },
  plugins: ["~plugins/element-ui"]
}
```

## [Middleware 目录](https://zh.nuxtjs.org/guide/routing#中间件)

> 中间件允许一个自定义函数运行在一个页面或者一组页面渲染之前。每个中间件应放在`middleware/`目录，文件名成文中间件的名称，一个中间件接受`context`为第一个参数。

`stats.js`内容如下:

```javascript
import axios form 'axios'

export default function ({ route }) {
  return axios.post("http://my-stats-api.com", {
    url: route.fullPath
  })
}
```

`nuxt.config.js` 对应配置：

```javascript
module.exports = {
  router: {
    middleware: ["stats"]
  }
}
```

`stats` 中间件将在每个路由改变时被调用。

## [Nuxt 路由](https://zh.nuxtjs.org/guide/routing)

> Nuxt 根据 `pages` 的目录结构生成 vue-router 路由文件配置，可在`.nuxt`文件下查看生成后的路由文件。

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

## [Store](https://vuex.vuejs.org/zh-cn/) 目录

> Nuxt 会找到应用根目录下的 `store`目录， 生成对应的状态树

> - **普通方式** ：`store/index.js` 返回一个 Vuex.store 实例
> - **模块方式** ：`store`目录下的每个`.js`文件会被转换成状态树的指定命名的子模块

## [异步数据](https://zh.nuxtjs.org/guide/async-data)

> Nuxt 自己在 Vue.js 的基础上扩展了两个方法`asyncData`和`fetch`

### [asyncData 方法](https://zh.nuxtjs.org/api/)

> 这是 Nuxt 在 Vue 的基础上增加的一个方法，叫`asyncData`，可以在设置组件数据之前异步获取或处理数据

`asyncData`方法会在**页面组件**（仅限于`pages`目录下的组件）每次加载之前被调用。 利用`asyncData`方法来获取数据，第一个参数是当前页面的`上下文对象`，Nuxt 会将 `asyncData`返回的数据与当前页面的`data`方法返回的数据融合一起返回个当前组件。

> `ayncData` 可以使用几种不同的方法来获取数据

1. 返回一个`Promise`，Nuxt 会等待该`Promise`被解析之后才会设置组件，从而渲染组件

2. 使用`async await`

3. 为第二个参数指定一个回调函数

> 注意：因为`asyncData`方法在组件**初始化**前被调用，所以该方法内没有办法通过`this`指向引用组件的实例对象，可以利用第一个参数`context`来获取当前组件的上下文。

### [fetch 方法](https://zh.nuxtjs.org/api/pages-fetch)

> `fetch`方法用于在渲染页面前填充应用的状态树 _(store)_ 数据，与`asyncData`方法类似，不同的是它不会设置组件数据。第一个参数是**页面组件**的上下文对象`context`。为了让获取过程可以异步，需要返回一个`Promise`，Nuxt 会等这个`Promise`完成后在渲染组件。

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

## 注意事项

### 反向代理设置

> 设置反向代理的时候使用官方的`@nuxt/proxy`包。

+ 通过 `npm install @nuxt/proxy -D`命令安装。
+ 对应的`nuxt.config.js`配置如下：

```javascript
module.exports = {
  proxy: {
    "/webapi/v1/": {
      target: "http://api.douban.com",
      ws: false
    }
  }
}
```

参考：[http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware) 和 [@nuxt/proxy](https://github.com/nuxt-community/modules/blob/master/modules/proxy/README.md)

### HTML 书写

> 服务端渲染通过比对虚拟ODM来比较页面差异，因此书写HTML时需要注意一些问题，比如：

- **注意标签嵌套合理**，例如`p`标签和内联标签内部不能嵌套块级元素。
- **注意浏览器自动添加的标签**，例如`table`标签内浏览器会自动添加`tbody`标签。

### 客户端宿主对象的使用

> 服务端渲染是没有`window`跟`document`这些宿主对象的。可以使用 [jsdom](https://github.com/tmpvar/jsdom) 模拟生成这些宿主对象。

- 对于只想在客户端使用的插件，可以通过设置`ssr: false`配置只在客户端运行的插件。
- 对于只想在服务端使用的插件，可以在 webpack 打包`server.bundle.js`文件时将`process.SERVER_BUILD`变量设置为`true`。

### 路由的使用

- Nuxt 结合了 vue-router， 重写了`a`标签，通过`<nuxt-link>`标签进行路由跳转，参考 [vue-router](https://router.vuejs.org/zh-cn/essentials/getting-started.html)。

### 视图的加载

- 同样的 Nuxt 自定义了`<nuxt-child>`标签来加载子组件，参考 `<router-view>`标签。
- 主体视图是用过`<nuxt>`标签来加载的，参考：https://zh.nuxtjs.org/guide/views。

### vue-meta的使用

> Nuxt 集成了 vue-meta 插件，来设置页面的`head`标签的内容。

- 通过对 vue-meta 的使用来快速完成页面的 SEO 设置。参考：[vue-meta](https://github.com/declandewet/vue-meta) 和 https://zh.nuxtjs.org/api/pages-head。

### css提取

`nuxt.config.js`配置如下

```javascript
module.exports = {
  css: ['~/node_modules/element-ui/lib/theme-default/index.css', {
    src: '~assets/css/main.scss',
    lang: 'scss'
  }],
  build: {
	filenames: {
        css: 'styles.[chunkhash:7].css'
    }
    extractCSS: true
  }
}
```

这样配置完成后，页面上只保留当前页面的 css 内联标签，其他 css 均是以外联的方式引入。

## 其他

- Nuxt 官方网站 https://zh.nuxtjs.org/guide
- Nuxt 常见问题 https://zh.nuxtjs.org/faq


- Nuxt 模块案例 https://github.com/nuxt-community/modules
- 相关的 Nuxt 资源文章 https://github.com/nuxt-community/awesome-nuxt
- Vue 官方网站 https://router.vuejs.org/zh-cn/
- 使用 Nuxt 构建的博客 https://github.com/surmon-china/surmon.me
