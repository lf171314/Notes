# Vuex

## Vuex 简介

> Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式，一种单项数据流的表现。

`vuex`的整体流程如下：

![vuex](https://vuex.vuejs.org/zh-cn/images/vuex.png)

`vuex`使用的单一状态树，用一个对象就包含了所有的应用层级状态。因此，每个应用都仅仅包含一个`store`实例。

## 简单的 Store 实例  

> 一个 store 有四个属性：state、getters、mutations、actions。

下面创建一个简单的 Store 实例

```javascript
const store = new Vuex.Store({
  state: {
    count: 0
  },
  gettes: {
    getCount: state => {
        return state.count
    }  
  },
  mutations: {
    addCount (state, payload) {
      state.count += payload.count
    }
  },
  actions: {
      async asyncCount ({commit}, payload) {
          const {total} = await axios.get('https://api.douban.com/v2/book/search?q=python')
          commit('addCount', { total })
      }
  }
})

export default store
```

Vuex 通过 `store` 选项，提供了一种机制将状态从根组件『注入』到每一个子组件中（需调用 `Vue.use(Vuex)`）

```javascript
import store from './store'
const app = new Vue({
  el: '#app',
  store,
  components: { App }
})
```

在 Store 实例里，可以通过`store.state`来获取状态对象，通过`store.commit`方法触发状态变更：

```javascript
store.commit('addCount')	// state.count => 1
```

在 vuex 里只能通过`mutations`的方式来提交更改`state`的操作。

## State

> `state`上存放的是 Vue 实例的状态，也是需要在非父子组件上和全局使用的数据。

在使用这些状态的时候，需要使用计算属性`computed`来声明这些状态。

```javascript
export default {
  name: 'Hello',
  computed: {
    count () {
      return this.$store.state.count 
      // 或者使用 getters 来获取状态 `this.$store.getters.getCount`
    }
  }
}
```

Vuex 还提供了一个辅助函数`mapState`帮助我们生成计算属性，减少获取多个状态的代码。

```javascript
import { mapState } from 'vuex'

export default {
  computed: mapState({
    // 基础的方式
    count: state => state.count,
    // 传入字符串'count'，等同于 `state => state.count`
    countAlias: 'count',
    // 为了能够使用 `this` 获取局部状态，必须使用常规函数
    countPlus (state) {
      return state.count + this.current
    }
  })
}
```

当映射的计算属性的名称与 state 的子节点名称相同时，我们也可以给 `mapState` 传一个字符串数组。

```javascript
computed: mapState([
  // 映射 this.count 为 store.state.count
  'count'
])
```

因为`mapState`函数返回的是一个对象，因此，可以通过**对象展开运算符**，展开该对象。

```javascript
computed: {
  ...mapState({
    count: state => state.count
  })
}
```

