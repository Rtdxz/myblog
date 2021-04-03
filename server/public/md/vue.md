# Vue

## 基础

### 1. 安装使用

1.cdn使用

```html
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>//开发版本
```

2.直接下载

3.npm

### 2. 插值操作

Mustach语法:{{message}}

{{}}里面可以写表达式,例如{{count*2}}



#### 指令

v-once:

添加了v-once的组件和节点只会被渲染一次，修改值后不会呈现改变



v-html:

添加了v-html的节点并赋予变量可以解析html

```html
<div id="#app">
    <h2 v-html="url"></h2>
</div>
<script>
const app = new Vue({
            el: "#app",
            data: {
                url: ''<a href="www.baidu.com">百度一下</a>'',
            },
        });
</script>
```



v-text：和Mustach语法类似，用法和v-html相同，但是会覆盖原节点里的文本



v-pre：添加v-pre的节点不作解析,Mustach语法不会显示出来直接显示{{message}}



v-cloak：在vue解析之前div中有v-cloak属性，vue解析之后去除掉v-cloak属性(可以用于防止js代码还没执行解析时显示源代码)

```html
<style>
      [v-cloak] {
        display: none;
      }
</style>
<div v-cloak>{{message}}</div>


```



### 3. v-bind

作用：动态绑定属性

语法糖： :

#### 基本使用

```html
<img v-bind:src="imgURL" alt="显示失败">
```

#### 对象语法

**用法一：直接绑定一个类**

```html
<style>
    .red {
      color: red;
    }
</style>
<div :class="{red:isActive}">red</div>
<button @click="turnRed">turn</button>
<script>
 
    const vm = new Vue({
      el: '#app',
      data: {
        isActive: true,
      },
      methods: {
        turnRed: function () {
          console.log(this.red);
          this.isActive = !this.isActive;
        }
      }
    });
  </script>
```

通过

```html
<div :class="{'red':isActive  /*一个bool值*/  }">red</div>
```

的方式给节点添加class为red的属性，其中isActive的值决定有没有这个class







**用法二：**

```html
<div :class="{'red':isActive ,'line':isLine, 'black':isBlack  }">red</div>
```

绑定多个class



并且假若div原有class也不冲突

```html
<div class="black" :class="{'red':isActive }">red</div>
```

同时有black和red的类



**用法三：**

如果过于复杂，可以放在methods或computed中

methods:

```html
<div class="black" :class="getClasses()">red</div>
```

```javascript
getClasses: function () {
          return { 'red': this.isActive, 'black': this.isBlack };
        }
```



#### 数组语法(少用)

```html
<div class="black" :class="['red','black']">red</div>
```

同样也可以使用methods或computed



### 4.v-style

```html
<div class="black" :style="{'属性名':'属性值'}">red</div>

//直接使用值
<div class="black" :style="{'fontSize':'14px'}">red</div>

//识别变量
<div class="black" :style="{'fontSize':fontsize}">red</div>
```

同样也有数组语法，里面放的是一个个对象



### 5.计算属性computed

基本使用

```html
<div id="#app">
    {{fullName}}              /*在这里使用不用加(),因为作为属性调用而不是函数,是一种语法糖*/
    							/*如果是方法就要加()*/
    							
</div>
<script>
    const vm = new Vue({
      el: '#app',
      data: {
        firstName:'fitstname',
        lastName:'lastname'
      },
      computed:{
         fullName:function(){						/*本质就是fullName是一个对象，只调用了														get方法*/
          return this.firstName+" "+this.lastName;
      }
      }
    });
  </script>
```

计算属性和methods区别，计算属性在多次调用时只会计算一次，而methods则会多次调用降低性能

(因为做了缓存，假如属性没变就直接调用了，只要有改变就会调用一次)



setter和getter

```html
 computed:{
         fullName:{
			set:function(){

			}//赋值数据
			get:function(){
	
			}//返回数据，默认只有get方法，前面基本使用就是使用了get
		} 
}
```



### 6.v-on事件监听

作用：绑定事件监听器

语法糖：@

#### 基本使用

```html
<button v-on:click="add">+</button>
methods: {
        add: function () {

          this.message += 1;
 		 }
}
```

不传参时可以不加括号



#### 参数传递

有括号但参数为空，传入undefined

```html
<button v-on:click="add()">+</button>	 /*上面加括号时*/
methods: {
        add: function (index) {
         console.log('result:'+index); 			/*无实参不会报错，默认为undefined*/
 		 }
}
/*result:undefined*/
```



无括号无参数而方法需要参数（默认传入event)

```html
<button v-on:click="add">+</button>	  /*上面不加括号时，该方法是有默认参数的*/
methods: {
      add: function (event) {
      console.log('result:'+event); /*vue会默认将浏览器生产的event事件对象作为参数传入到方法中*/
 		 }
}
/*result:[object MouseEvent]*/
```



同时需要两个参数，其中一个为event对象

```html
<button v-on:click="btnClick('abc',$event)">+</button>	/*$event就是浏览器的event对象*/  
methods: {												/*'abc'有引号时作为字符串*/
														/*abc无引号时作为变量*/
      btnClick: function (index,event) {
      console.log('result:',index,event); 
 		 }
}
```



#### 修饰符

阻止冒泡

.stop

```html
<div @click="divClick">
      <button @click.stop="btnClick"></button>     /*在click后加.stop修饰符可以阻止冒泡*/
    </div>
methods: {
        btnClick() {
          console.log('btnClick');
        },
        divClick() {
          console.log('divClick');
        }
      }
```



阻止默认事件

.prevent



监听特定键盘按键点击

```html
<input @keyup.enter="keyUp" >			/*key相关可以加.{按键名}来监听特定按键*/
```



自定义组件监听

添加.native

```html
<native @click.native="functionName"></native>
```



只触发一次

.once



### 7.v-if,v-else,v-else-if

决定要不要渲染(生成dom)

```html
<div v-if="isShow">当isShow为true时显示</div>				
<div v-else>当isShow为false时显示</div>
data:{
	isShow:true,
}
```

由于虚拟dom，有相同组件时会直接调用先前的(复用)，修改其中属性，可以通过key来区分开，当key不同就不会复用

```html
<span v-if="isUserName"><label for="">用户账号:</label><input type="text"></span>
<span v-else><label for="">用户邮箱:</label><input type="text"></span>
    <button @click="change">切换</button>
/*使用的input组件(<inpout></inpout>是一样的，但属性不同*/
/*加上key属性即可区分*/
<span v-if="isUserName"><label for="">用户账号:</label><input type="text" key='1'></span>
<span v-else><label for="">用户邮箱:</label><input type="text" key='2'></span

```



### 8.v-show

决定要不要显示，相当于添加了display:none,有生成dom



使用：当组件需要频繁切换时，使用v-show提高性能，当只有一次切换时，用v-if



### 9.v-for

遍历数组

```html
<ul>
      <li v-for="(item,index) in myArray">{{index}},{{item}}</li>
  </ul>
data:{
	myArray:['a','b','c']
}
/*
	0,'a'
	1,'b'
	2,'c'
*/
```



遍历对象

```html
<ul>
      <li v-for="value in myObject">{{value}}</li>		/*只有一个值时遍历的是value*/
  </ul>
data:{
	myObject:{
	'a':1,
	'b':2,
	'c':3
	}
}
/*
	1,2,3
*/

<ul>
      <li v-for="(value,key) in myObject">{{value}},{{key}}</li>		/*两个值时遍历先value后Key*/
  </ul>
data:{
	myObject:{
	'a':1,
	'b':2,
	'c':3
	}
}
/*
	1,'a'
	2,'b'
	3,'c'
*/
```



给每个v-for的元素添加key属性，用于标识每个元素，当更新时可以提高虚拟dom的插入效率（类似数组插入和链表插入）

官方解释;



`key` 的特殊 attribute 主要用在 Vue 的虚拟 DOM 算法，在新旧 nodes 对比时辨识 VNodes。如果不使用 key，Vue 会使用一种最大限度减少动态元素并且尽可能的尝试就地修改/复用相同类型元素的算法。而使用 key 时，它会基于 key 的变化重新排列元素顺序，并且会移除 key 不存在的元素。

有相同父元素的子元素必须有**独特的 key**。**重复的 key 会造成渲染错误。**

最常见的用例是结合 `v-for`：

```
<ul>
  <li v-for="item in items" :key="item.id">...</li>
</ul>
```

它也可以用于强制替换元素/组件而不是重复使用它。当你遇到如下场景时它可能会很有用：

- 完整地触发组件的生命周期钩子
- 触发过渡

例如：

```
<transition>
  <span :key="text">{{ text }}</span>
</transition>
```

当 `text` 发生改变时，`<span>` 总是会被替换而不是被修改，因此会触发过渡。



#### 数组响应式方法

直接修改数组里的数据没有响应(需要时用splice或者Vue.set(修改对象，索引值，修改后的值))

1.push,pop,shift,unshift

2.splice

3.sort

4.reverse



### 10. 过滤器filters

```html
<td>{{book.price | showPrice}}</td>			/*会把|之前的值传入给过滤器，以返回的值显示*/
filters(){
	showPrice(price){
	return '￥'+price.toFixed(2); 			/*toFixed(num)将一个数变成num位小数*/
	}
}
```



### 11.v-model表单绑定

双向绑定

```html
<input type="text" name="" id="" v-model="message">
```

之前的v-bind是单向绑定，从model层绑定到view，而双向绑定是view到model也有



#### 搭配radio（单选，要绑定同一个name)

v-model绑定被选中的radio的value

```html
<label for="man">男</label> <input type="radio" name="sex" id="man" value="man" v-model="sex">
    <label for="woman">女</label> <input type="radio" name="sex" id="woman" value="women" v-model="sex">

data:{
	sex:'默认选择'
}
```



#### 搭配checkbox(多选框)

单选

v-model绑定一个Bool值

```html
<label for="license"><input type="checkbox" name="" id="license" v-model="isAgree">同意协议</label>
    <button :disabled="!isAgree">下一步</button>
```

多选

v-model绑定的是数组

```html
<input type="checkbox" value="basketball" v-model="hobby">篮球
<input type="checkbox" value="football" v-model="hobby">足球
<input type="checkbox" value="pingpong" v-model="hobby">乒乓
<input type="checkbox" value="run" v-model="hobby">跑步
<input type="checkbox" value="swim" v-model="hobby">游泳

data: {
        hobby: []
      },
```



#### 搭配select

```html
<select name="abc" v-model="fruit">
      <option value="apple">苹果</option>
      <option value="banana">香蕉</option>
      <option value="orange">橘子</option>
    </select>
data:{
	fruit:'banana'
}
```

多选select

```html
<select name="abc" v-model="fruit" multiple>
      <option value="apple">苹果</option>
      <option value="banana">香蕉</option>
      <option value="orange">橘子</option>
    </select>
data:{
	fruit:[]
}
```



#### 修饰符

lazy

类似于防抖，直到用户输入完按回车时或失去焦点才更新

```html
<input type="text" name="" id="" v-model.lazy="message">
```



number

由于v-model绑定的属性默认都会变成字符串类型（在输入的时候），使用.number就可以把属性转换成number型

```html
<input type="number"  v-model.number="age">
```



trim

去除掉value中的所有空格





## 组件化开发

### 组件使用三步骤

1.创建组件构造器对象

```javascript
const cpnC = Vue.extend({
      template: `
      <div>
        <h1>hello first templtate</h1>					 /*这里使用反单引号可以换行*/
      </div>`
    });
 

```

2.注册组件

```javascript
Vue.component("my-cpn",cpnC);   			/*两个参数，第一个组件名，第二个构造器*/
```

3.使用组件

```html
<div id="app">
    <my-cpn></my-cpn>
  </div>
```

一定要在new Vue挂载的实例#app下



### 全局组件和局部组件

Vue.component()注册就是全局组件

全局组件可以在多个vue实例中使用



局部组件

```javascript
const vm = new Vue({
      el: '#app',
      data: {},
      methods: {},
      components: {
        cpn: cpnC,			/*写在components中为局部组件,key为组件名，value为构造器*/
      }
    });
```



### 语法糖(推荐)

省去Vue.extend

```javascript
//全局组件
Vue.component('cpn', {
      template: `
     	 <div>
        	<h1>hello</h1>  			/*直接把Vue.extend中的对象传入到component中*/
      	</div>
      `
    });

//局部组件
const vm = new Vue({
      el: '#app',
      data: {},
      methods: {},
      components: {
        cpn:{
            template: `
      		<div>
       		 <h1>hello</h1>  					/*直接把Vue.extend中的对象传入到component中*/
     		 </div>
      `,
        },			
      }
    });
```



### 模板抽离写法

1.通过script标签中的type="text/x-template" ，并且给id,这样就可以在下面template通过id调用

```html
<script type="text/x-template" id="cpn">
    <div>
      <h1>hello</h1>
    </div>
  </script>

<script>
Vue.component('cpn', {
      template: "#cpn"
    });
</script>
```



2.template标签,同样使用id

```html
<template id="cpn">
    <div>
      <h1>hello</h1>
    </div>
  </templates>

<script>
Vue.component('cpn', {
      template: "#cpn"
    });
</script>
```



### 组件访问数据

组件中有可以保存自己数据的地方(data)

其中data必须是一个函数，而且必须返回一个对象

```javascript
Vue.component('cpn', {
      template: "#cpn",
      data: function(){
      }
    });
```

组件中的data必须是函数是因为防止共用一个组件中的内容，比如一次使用多个组件，若是对象的话里面共享的内容是一样的，改变的时候全都会改，而作为函数返回对象相当于每次都是一个新的对象互不干扰





### 父组件与子组件

#### 创建

```javascript
const son = Vue.extend({
      template: `
      <div>
        <h1>son</h1>  
      </div>
      `
    });

    const father = Vue.extend({
      template: `
      <div>
      <div>
        <h1>father</h1>  		/*template要注意跟节点问题，同一个根节点只能在根处出现一次*/
      </div>
      <cpn1></cpn1>
      </div>
      `,
      components: {
        cpn1: son			/*在父组件构造器中添加components用于注册，因此上面可以用*/
      }
    });

    const vm = new Vue({
      el: '#app',
      data: {},
      methods: {},
      components: {
        cpn2: father		/*要记得在vue实例中也注册,才可以调用,因为该实例也可以看成根组件*/
      }
    });
```

#### 通信

##### 父传子

父组件通过props向子组件传递数据,

props里面的数据只能在父组件中改变，不要用其他方式改变

```html
/*父组件模板中使用子组件时，给子组件加上(v-bind:子组件的props)=(父组件中的data)*/ 
<cpn v-bind:cmovies="movies" :cmessage="message"></cpn>
/*如果不用v-bind直接使用的话会把cmovies的值变为movies字符串传入，而不会去寻找父组件的movies数据*/
/*v-bind传入动态值,直接赋值传入静态值*/
```

```javascript
//子组件
    const cpn = {
      template: '#cpn',
      props: ['cmovies', 'cmessage'],				/*子组件中的pros传入数组标识*/
      data() {
        return {

        }
      }
    }
  
```

props写法

注意props里面值用驼峰写法例如cInfo在v-bind中要写成c-info

```javascript
 /*props有多种写法*/	
    props: {
 		 title: String,
  		 likes: Number,
  		 isPublished: Boolean,					/*以对象的写法可以规定传入的值类型*/
 		 commentIds: Array,
 		 author: Object,
 		 callback: Function,
 		 contactsPromise: Promise // or any other constructor
}
	/*甚至可以再细分,给规定的值传入默认值*/ 
	props: {
        cmessage:{
            type:String,
             default:'aaaa'
        }
    }

/*官网写法*/
	为了定制 prop 的验证方式，你可以为 props 中的值提供一个带有验证需求的对象，而不是一个字符串数组。例如：

Vue.component('my-component', {
  props: {
    // 基础的类型检查 (`null` 和 `undefined` 会通过任何类型验证)
    propA: Number,
    // 多个可能的类型
    propB: [String, Number],
    // 必填的字符串
    propC: {
      type: String,
      required: true
    },
    // 带有默认值的数字
    propD: {
      type: Number,
      default: 100
    },
    // 带有默认值的对象
    propE: {
      type: Object,
      // 对象或数组默认值必须从一个工厂函数获取
      default: function () {
        return { message: 'hello' }
      }
    },
    // 自定义验证函数
    propF: {
      validator: function (value) {
        // 这个值必须匹配下列字符串中的一个
        return ['success', 'warning', 'danger'].indexOf(value) !== -1
      }
    }
  }
})
```

##### 子传父

子组件通过事件向父组件传递数据,(自定义事件)

子组件先发出一个事件(事件名不能写驼峰)

```javascript
 //发出事件
 this.$emit('item-click', item);     //发送一次父组件监听到就触发一次
```

父组件在调用子组件时进行监听

```html
<div id="app">
    <cpn v-on:item-click="cpnClick"></cpn>	/*此时监听事件即子组件发出的事件名，并能够接受参数*/
 </div>							/*触发时调用直接写方法名会默认传入￥emit的第二个参数*/
```





#### 访问

##### 父访问子

使用$children或$ref

在父组件中用this.$children就可以访问到所有的子组件，可以访问里面的data,methods等内容

```javascript
 methods: {
        btnClick() {
          console.log(this.$children);
        }
      },
```



使用$refs

```html
<div id="app">
    <cpn ref="a"></cpn>				/*使用子组件时挂载上ref属性,值为key*/
  </div>
```



```javascript
 methods: {
        btnClick() {
          console.log(this.$ref.a);					/*通过$ref.key的值能够获取对应的子组件*/
        }
      },
```





##### 子访问父

使用$parent或$root

子组件中

```javascript
methods: {
            showMessage() {
              console.log(this.$parent);
            }
          }
```

$root访问最顶层组件



## 组件化高级

### slot插槽

组件扩展性，在组件模板中放入<slot></slot>

如果有多个插槽，会被同时替换掉

```html
<template id='cpn'>
    <div>
      <h1>cpn</h1>
      <slot></slot>					/*里面也可以有默认值，当没被使用时就显示默认值*/
    </div>
  </template>
```

使用组件时在标签中添加不同的内容,

如果有多个值，会**一起**替换掉插槽

```html
<div id="app">
    <cpn><button>按钮</button></cpn>
    <cpn><span>插槽</span></cpn>
  </div>
```

根据不同的内容会放入插槽中从而同一个组件的使用有不同的结果

![1615996111(1)](mdimages\1615996111(1).png)

#### 具名插槽

如果有多个插槽，会被同时替换掉，这时用具名插槽

会替换没有名字的插槽

```html
<div>
      <h1>cpn</h1>
      <slot name="left"></slot>
      <slot name="center"></slot>
      <slot name="right"></slot>
      <slot></slot>
 </div>
```

替换有名字的插槽使用slot属性进行选择

```html
<cpn><button slot="left">按钮</button></cpn>s
```



#### 编译作用域

在模板内只能使用当前组件的data

官方解释：

父级模板里的所有内容都是在父级作用域中编译的；子模板里的所有内容都是在子作用域中编译的。



#### 作用域插槽

父组件在使用子组件，子组件模板具有slot插槽时，可以通过给slot绑定一个data属性，在调用时使用slot-scope绑定slot，就可以在使用子组件时进行调用子组件的data

```html
<cpn>
      <template slot-scope="slot">
        <span v-for=‘item in slot.data></span>
      </template>
    </cpn>
```

```javascript
<template id='cpn'>
    <div>
      <slot :data="languages">
        <ul>
          <li v-for='language in languages'>{{language}}</li>
        </ul>
      </slot>
    </div>
  </template>
```

官方解释：

父组件替换插槽的标签，子组件提供内容



### watch

监听改变



## 前端模块化

### commonJS

导入类似解构对象

```javascript
// CommonJS模块
let { stat, exists, readfile } = require('fs');
```

导出

```javascript
module.exports = {
    hello: hello,
    greet: greet
};
```

## Webpack

![Snipaste_2021-03-21_14-03-22](mdimages\Snipaste_2021-03-21_14-03-22.jpg)

![Snipaste_2021-03-21_14-05-32](mdimages\Snipaste_2021-03-21_14-05-32.jpg)

### es6的模块化

```html
 <script src='js/a.js' type="module"></script>
```

```javascript
import { name } from "a.js"

import name from "a.js"			/*导入默认*/

import * as all from "a.js"		/*导入全部*/



```

```javascript
export {
  name, age, sex
}

export var num=100;

export funtion f(){}

export default num 				/*用default导出时，另外模块导入可以不加{}并且直接获取这个default									值，用变量接收*/
```





### Webpack搭建



#### webpack.config.js

作为webpack配置文件，可以直接在终端使用webpack命令代替转化过程,用module.exports返回一个对象,,

里面一定要有entry和output，一个作为需要打包的入口，一个作为打包生成的文件

```javascript
const path = require('path');

module.exports = {
  entry: './src/main.js',					/*entry里返回一个字符串，作为入口文件的相对路径*/
  output: {									
    path: path.resolve(__dirname, 'dist'),		
    filename: 'bundle.js'						
  }
}
```

output返回一个对象，一个属性是路径名path，该路径必须使用绝对路径，通过node中的path模块对路径进行解析，resolve可以将两个路径进行拼接，__direname(前面两个下划线)是node全局中的变量，返回当前的项目的绝对路径





#### node

当js里需要用到node里的模块时需要对项目进行初始化导入包,并生成package.json文件

```
npm init -y              /*加上-y是默认值创建，不加时可以自己定义*/
```

```json
{
  "name": "meetwebpack",
  "version": "1.0.0",
  "description": "fitst",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
  },
  "author": "",
  "license": "ISC",
}
```







#### npm script

```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack"
  },
/*在这里可以自定义终端命令，例如自定义了一个build,就可以使用npm run build在终端代替后面实现*/
```

```
在终端中          npm run build      =      webpack 
```







#### 依赖

终端中运行的webpack都是直接寻找全局的

如果项目中没有对应的依赖，npm script中运行的命令是本机全局的webpack版本的命令，需要下载一个开发依赖版本的webpack，在npm script中写的会优先找项目里的webpack

开发时依赖

```console
 --save || -S // 运行依赖（发布）
```

–save ： dependencies 键下，发布后还需要依赖的模块，譬如像jQuery库或者Angular框架类似的，我们在开发完后后肯定还要依赖它们，否则就运行不了。

```console
-–save-dev || -D //开发依赖（辅助）
```

–save-dev ： devDependencies 键下，开发时的依赖比如安装 js的压缩包gulp-uglify 因为我们在发布后用不到它，而只是在我们开发才用到它。

这样下载完后在package.json中就会有开发依赖

```json
"dependencies": {
    									/*运行依赖*/
  }	

"devDependencies": {						/*开发依赖*/
    "webpack": "^3.6.0"
  }
```



转自:https://blog.csdn.net/star0311/article/details/90899013





#### loader

##### 作用

用于处理css,图片，甚至将es6转es5,ts转es，以及less,scss转成css，将.jsx、.vue转成js

##### 使用过程:

1.npm 安装需要使用的loader

​				2 在webpack.config.js中的modules关键字下进行配置



##### cssloader



1.npm下载

https://webpack.docschina.org/loaders/css-loader/

```console
npm install --save-dev css-loader
```

2.在config中进行配置

```json
module.exports = {
  ...
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],     /*使用多个Loader时，从右向左读，顺序不能错*/
      },
    ],											/*因此先加载，后解析样式符合正确过程*/	
  }
}
```

需要生效的话还得下载style-loader

cssloader只负责加载css，不负责解析

styl.loader负责将样式添加到DOM中



##### lessloader

(版本)
npm install --save-dev less-loader@4.1.0 less@3.9.0

```js
module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/i,
        use: [{
          loader: "style-loader"	/*将添加到dom中
        }, {
          loader: "css-loader"		/*加载css文件
        }, {
          loader: "less-loader"	//用于将less转换为css文件
        }]
      },
    ],
  }
```



##### url-loader和file-loader

图片文件处理

url-loader

npm install --save-dev url-loader@1.1.2

```js
{
       test: /\.(png|jpg|gif)$/i,
       use: [
         {
           loader: 'url-loader',
           options: {
             limit: 8192,			/*默认8kb*/
            },
          },
        ],
```

当加载图片小于limit时，url-loader图片编译成base64字符串形式（不需要文件存储)

当加载图片大于limit时,	file-loader会拷贝一份图片在打包文件夹里

当图片大于limit时会报错，显示

```
Module build failed: Error: Cannot find module 'file-loader'
```

没有file-loader该loader，说明需要安装file-loader

```console
npm install file-loader@3.0.1 --save-dev
```

而这个时候图片仍然不能显示，

![Snipaste_2021-03-19_22-19-50](mdimages\Snipaste_2021-03-19_22-19-50.jpg)

这时是通过file-loader在webpack打包时生成了一个一样的图片，解析时指向了那张图片

![1616163699(1)](mdimages\1616163699(1).png)

因此**路径错误**读取不到，此时可以通过修改webpack配置文件添加一个publicPath属性，添加一个指向

```js
module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  	 publicPath: 'dist/'             /*指向了dist文件夹下方*/
  },
  module: {
  }
}
```

注意一个问题：打包生成的图片是一个32位的数（通过hash计算放置重复）但是过于冗长而且不利于辨别，

因此可以通过option中的use属性来对名字进行修改

```javascript
use: [
          {
            loader: 'url-loader',
            options: {
              limit: 13000,
              name: 'img/[name].[hash:8].[ext]'
            },
          },
        ],
```

name是原文件名,hash:8是截取前8位哈希值，ext是原扩展名

![1616165394(1)](mdimages\1616165394(1).png)

##### es6转es5

```console
npm install --save-dev babel-loader@7.1.5 babel-core@6.26.3 babel-preset-es2015@6.24.1
```

```javascript
{
        test: /\.m?js$/,
        //exclude排除，排除node_modules里面的js代码
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            //预先布置，配置
            presets: ['es2015']						/*这里设置要转成的类型
          }
        }
      }
```



##### Vue

```console
npm install vue@2.5.21 --save		/*这里用save说明是运行依赖
```

1.runtime-only   代码中，不能包含template

2.runtime-compiler  代码中，可以有template，因为compiler可以编译template

直接导入vue的话会使用runtime-only,可以修改webpack配置，添加resolve属性;

```javascript
resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'      /*这里指向node_modules里面的vue,
      								使用其中的vue.esm.js，里面就采用了runtime-compiler
    }
  }
```

template会替换掉el绑定的div



.vue文件同样需要用loader加载解析，使用 vue-loader和vue-template-compiler

```console
npm install vue-loader@15.4.2 vue-template-compiler@2.5.21 --save-dev
```

配置loader后可以解析.vue文件，但是版本问题，在v14版本以上需要一个插件（plugin)，具体看官网解释

[https://vue-loader.vuejs.org/zh/migrating.html#%E7%8E%B0%E5%9C%A8%E4%BD%A0%E9%9C%80%E8%A6%81%E4%B8%80%E4%B8%AA%E6%8F%92%E4%BB%B6](https://vue-loader.vuejs.org/zh/migrating.html#现在你需要一个插件)

![Snipaste_2021-03-20_00-42-54](mdimages\Snipaste_2021-03-20_00-42-54.jpg)



简写，在resolve里添加extensions可以让以后导入时不用加后缀名

```javascript
resolve: {
    extensions: ['.js', '.css', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
```



#### Plugin

##### plugin是什么

插件的意思，通常用于对现有架构进行扩展，，

webpack插件就是对webpack现有功能的各种扩展，如打包优化，文件压缩等



##### loader和plugin的区别;

loader主要用于转换某种类型的模块，是一个转换器

plugin是插件，是对webpack本身的扩展，是一个扩展器



##### plugin使用过程

1。在npm下载安装需要使用的plugin插件

2.在webpack.config.js中配置插件



##### BannerPlugin

为打包文件添加版权的插件，由webpack自带因此不用下载直接使用



```javascript
//在webpack.config.js中进行添加
const webpack = require('webpack');        /*引用*/

module.exports = {
  ...
  module: {
    ...
  //插件
  plugins: [									/*把所有添加的插件在这里进行调用*/
    new VueLoaderPlugin(),
    new webpack.BannerPlugin('版权声明')		/*bannerplugin接收一个字符串作为说明*/
  ]
}
```

添加了之后在打包的Bundle文件里就会有声明

![1616220342(1)](mdimages\1616220342(1).png)



##### HtmlWebpackPlugin

打包html,用于将index.html文件打包进发布的dist文件夹中

HtmlWebpackPlugin插件可以自动生成一个index.html文件（可以指定模板生成)，将打包的js文件自动通过script标签插入到body中

安装

```console
 npm install html-webpack-plugin@3.2.0 --save-dev
```

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin')    /*引入*/

plugins: [									/*把所有添加的插件在这里进行调用*/
   
    new HtmlWebpackPlugin()					/*调用
    }
```

重新打包后就会有一个默认index.html在dist中

![1616221072(1)](C:\Users\17120\Desktop\前端\mdimages\1616221072(1).png)

但是默认的index.html中会有问题，没有vue默认绑定的div，以及引用js路径也有错误

![1616221226(1)](mdimages\1616221226(1).png)

js路径错误原因是之前webpack.config.js配置output中的publickpath设置了dist文件夹，使用这种方式生成index时要记得去掉

第二个问题可以使用默认模板解决：

在调用plugins可以传入参数,使用一个模板html传入

```javascript
plugins: [									/*把所有添加的插件在这里进行调用*/
    new HtmlWebpackPlugin({					
      template: 'index.html'				/*添加参数,传入一个对象里面有template属性*/
    })									
}
]
```



##### uglifyjs-webpack-plugin

对js进行压缩的插件

类似于-min.js进行压缩

```console
npm install uglifyjs-webpack-plugin@1.1.1 --save-dev
```



#### webpack-dev-server

其实这个操作就跟vscode的live shell一样，可以实时映射



搭建服务器

1.安装

```console
npm install webpack-dev-server@2.9.3 --save-dev
```

版本要跟webpack版本相对应

2.引入

```javascript
//在webpack.config.js中添加devServer属性
module.exports = {
  output:{},
    .....
  devServer: {
    contentBase: './dist',   /*要服务的文件夹*/
    port: 8080,              /*端口号*/
    inline: true,             /*是否实时监听，页面实时刷新*/
    // historyApiFallback:       /*在SPA页面中，依赖HTML5的history模式8、
  }
}
```

3.使用

**由于在终端里直接输入命令会优先在全局找**,而下载的webpack-dev-server仅在项目内(局部)

方法一：

由于下载后的webpack-dev-server并不在node_modules里面，因此不能直接在中的使用webpack-dev-server命令

配置好之后要在中断进入node_modules/.bin里面运行webpack-dev-server

```console
.\node_modules\.bin\webpack-dev-server    /*!!!记得要反斜杆*/
```

方法二：

由于方法一太麻烦，可以使用npm script进行简化，进入package.json进行配置，

**这是利用了npm会优先在项目内找(局部找)**

```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack",
    "dev": "webpack-dev-server"					/*这样子就可以直接在局部里找了*/
  },

	"dev": "webpack-dev-server --open"				/*加上--open会自动打开网页*/
```

之后只需要在终端运行npm run dev

```console
npm run dev
```





#### 配置分离

把配置文件分离成开发时配置和编译时配置

在和配置文件统计目录新建一个build用于存放配置文件

![1616226131(1)](mdimages\1616226131(1).png)

把之前webpack.config.js文件中的内容复制进去

再新建两个文件，一个是开发时配置所需，一个是编译时配置所需

![1616225070](mdimages\1616225070.png)

在dev.config.js里面放入开发时需要的配置内容

```javascript
//dev.config.js
module.exports = {

  devServer: {
    contentBase: './dist',   /*要服务的文件夹*/
    port: 8080,              /*端口号*/
    inline: true,             /*是否实时监听，页面实时刷新*/
    // historyApiFallback:       /*在SPA页面中，依赖HTML5的history模式8、
  }
}
```

在production.config.js里放入编译时需要的配置内容

```javascript
//production.config.js
const uglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin');


module.exports = {
  plugins: [									/*把所有添加的插件在这里进行调用*/
    new uglifyJsWebpackPlugin()
  ],
}
```

这样就实现了配置分离

之后需要进行组合，需要安装webpack-merge

```console
npm install webpack-merge@4.1.5 --save-dev
```

之后在分离出来的文件中进行调用并使用

```javascript
const webpackMerge = require('webpack-merge');

const baseConfig = require('./base.config');
module.exports = webpackMerge(baseConfig, {

  devServer: {
    contentBase: './dist',   /*要服务的文件夹*/
    port: 8080,              /*端口号*/
    inline: true,             /*是否实时监听，页面实时刷新*/
    // historyApiFallback:       /*在SPA页面中，依赖HTML5的history模式8、
  }
})

//webpackMerge接收两个参数，一个是base另一个是被分离出来的配置
```

最后还需要修改npm script，因为之前合并的webpack.config.js文件已经没有了，不会选取默认的配置文件，需要自己设定

加上--config加路径

```json
 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack --config ./build/production.config.js",
    "dev": "webpack-dev-server --open --config ./build/dev.config.js"
  },
```

‘同时还要修改base.config.js里的路径

```javascript
output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.js',
  },
```



## Vue CLI

脚手架

1.安装

```console
npm install @vue/cli -g
```

安装后可以拉取旧版本



Vue CLI >= 3 和旧版使用了相同的 `vue` 命令，所以 Vue CLI 2 (`vue-cli`) 被覆盖了。如果你仍然需要使用旧版本的 `vue init` 功能，你可以全局安装一个桥接工具：

```bash
npm install -g @vue/cli-init
# `vue init` 的运行效果将会跟 `vue-cli@2.x` 相同
vue init webpack my-project
```



### vue-cli 2

初始化项目

```consloe
vue init webpack 项目名字
```

![Snipaste_2021-03-20_19-19-03](mdimages\Snipaste_2021-03-20_19-19-03.jpg)



![Snipaste_2021-03-20_22-35-27](mdimages\Snipaste_2021-03-20_22-35-27.jpg)



#### Runtime-Only和Runtime-compiler

在搭建项目时选择后只在main.js中不同

```javascript
new Vue({
  el: '#app',
  components: { App },						//Runtime-compiler
  template: '<App/>'			//过程template->ast->render->virtual DOM->UI
})
 			
new Vue({
  el: '#app',									//Runtime-Only
  render:createElement=>createElement(App)		//过程render->virtual DOM->UI
})
//1.普通用法createELement
createElement('标签',{标签的属性},['标签内容'],传入下个createElement)
例如createElement('h2',{class:'red'},['hello world'],createElement(..))
//2.传入组件对象
```



vue运行过程:

template->ast->render->virtual DOM->真实DOM



Runtime-Only性能更高，代码更少



**使用Runtime-Only时，前面对组件的template解析就不见了，这件事是交给vue-template-compiler去做的，在编译的时候它就直接将template进行解析了，所以Runtime-only可以直接进行到渲染阶段**

vue-template-compiler：用于将.vue中的<template>解析成render函数

![Snipaste_2021-03-21_14-04-25](mdimages\Snipaste_2021-03-21_14-04-25.jpg)

### vue-cli 3

```console
vue create 项目名字
```



脚手架三设计原则是'0配置'，移除了配置文件，全部交由vue-cli-serve进行配置

```json
"devDependencies": {
    "@vue/cli-plugin-babel": "~4.5.0",
    "@vue/cli-service": "~4.5.0",
    "vue-template-compiler": "^2.6.11"
  }
```

public文件夹就是原来的static文件夹，作用是原封不动的将文件拷贝到生成的文件夹中



main.js也不太一样,使用$mount(#app)（其实底层原理就是识别到el执行了mount)

```javascript
new Vue({
  render: h => h(App),
}).$mount('#app')
```

![Snipaste_2021-03-21_14-56-37](mdimages\Snipaste_2021-03-21_14-56-37.jpg)

修改配置方案

1.vue ui可以界面化搭建配置

2.找到@vue里的serve

3.新建一个名为vue.config.js的文件，里面的写法与之前ewb



## Vue-router

前端路由

### 认识路由

两种机制：

路由和传送

路由决定数据包**来源**到**目的地**的路径

传送将**传入端**的数据转移到合适的**输出端**

最重要的思想是映射

早期网站开发的html页面都是由服务器渲染的，服务器直接渲染好对应的html页面，返回给客户端展示

后端路由：后端处理URL和页面之间的映射关系

前后端分离：后端只负责提供数据api，资源由静态服务器提供

前端渲染：浏览器网页中显示的大部分内容，都是由前端写的js代码在浏览器中执行，最终渲染出来的



前端路由：

单页面富应用阶段：

整个网页只有一个html页面

SPA特点在前后端分离基础上加了前端路由，

单页面应用阶段只有一个html文件，访问网站时会把所有静态资源下载到本地，根据用户输入的url进行选择哪个css和js,再进行渲染，这时就出现了映射关系，此时可以用路由进行管理(Vue-router)

核心：改变url,页面不再进行整体更新，不再向静态服务器群请求页面



#### Url的hash

修改hash不会请求新的资源

```javascript
location.hash='xxx'
```

#### history

同样不会发送请求

```javascript
history.pushState({},'','home')			//data,title,?url
history.go(-1)==history.back()				//回退
=history.go(1)==history.forward
```

![Snipaste_2021-03-21_21-48-51](mdimages\Snipaste_2021-03-21_21-48-51.jpg)

history是一个栈，每次只需push都是压栈



### 基本使用

#### 安装

```console
npm install vue-router --save		//这里是运行时依赖
```

#### 搭建

在src文件夹中新建一个router文件夹,放入index.js

1.导入路由对象，调用Vue,use(VueRouter)

```javascript
import VueRouter from 'vue-router'
```

通过Vue.use(插件,plugin)来安装插件，同时就需要导入Vue

```javascript
//导入Vue
import Vue from 'vue'
//通过Vue.use(插件)来安装插件
Vue.use(VueRouter);
```

2.创建vue-router对象

```javascript
//创建router对象
const router = new VueRouter({
  //配置路由和应用的关系
  routes: []
})
```

3.将router对象传入vue实例中

```javascript
//index.js
export default router

//main.js
import router from './router'		//会自动搜索导入文件夹中index文件

new Vue({
  router,
})

```

#### 使用

1.创建路由组件

![1616338038(1)](mdimages\1616338038(1).png)

2.配置路由映射:组件和路径映射关系

```javascript
//index.js
import Home from '../components/Home'			//先导入组件
import About from '../components/About'


const router = new VueRouter({
  //配置路由和应用的关系
  routes: [{
      path:'',
      redirect:'/home'					//默认路由重定向
  }
      {
      path: '/home',					//url下的路径
      component: Home					//绑定组件
    }, {
      path: '/about',
      component: About
    },
          ],
     mode:'history'					//规定路由history格式
})
```

3.使用路由

在App.vue(入口模板)中添加router-link和router-view组件

<router-link>是vue中的全局组件，是一个连接，其中的to指向path位置

```html
//App.vue
<router-link to="/home">首页</router-link>
 <router-link to="/about">关于</router-link>
```

<router-view/>是 渲染的组件(占位)，可以将router里当前的内容渲染出来

4.默认设置

```javascript
//inde.js
{
      path: '',         //默认值缺省就是对应url不加后面的东西、
        //重定向为自己设定的主页
      redirect:'/home'
    }
```

5修改为history模式

由于默认有hash值，url的格式为

http://localhost:8080/#/home

要去掉#(hash)，只要在router组件里添加一个属性mode:'history'

```javascript
//index.js
const router = new VueRouter({
  routes: [{
    }],
    mode:'history'
})
```



##### router-link

最后默认会被渲染成a标签，可以用tag属性

```javascript
  <router-link to="/home" tag="button">首页</router-link>
```

replace属性是无痕浏览

可以利用点击后添加router-link-active的样式

这个类名可以用active-class进行修改

也可以在router配置组件里改,添加linkActiveClass属性批量修改



通过代码跳转路由

之前都是默认用router-link 的to进行跳转，也可以用methods进行跳转

这里用$router的push方法就和history的pushState类似

```javascript
methods: {
    btnClick() {
      this.$router.push("/home");
    },
  },
```



#### 动态路由

需要动态后缀时在routes（配置路由映射）里面修改

```javascript
{
      path: '/user/:userId',							//加上/:一个变量
      component: User
    }
```

在调用router-link时可以添加v-bind对to属性进行动态绑定

```javascript
 <router-link v-bind:to="'/user/' + userId">用户</router-link>
//userId是当前组件的data里的一个数据
```



this.$router和this.$route区别,

router路由器

route路由

this.$route是当前活跃路由，而this.$router是包括了所有的路由的路由器，它主要用于控制跳转



this.$route可以用于获取当前路由的参数数据

```javascript
this.$route.params.userId	
//params是包含了一个对象，userId是之前在routes里进行配置(:后的)变量名
```



### 路由懒加载

用到时再加载

写法

```javascript
const Home = () => import('../components/Home');
const About = () => import('../components/About');
const User = () => import('../components/User');
```





### 嵌套路由

比如在一个路径下有多个路径要访问，/home/news和/home/message

分两步

1.创建对应子组件，并在路由映射中配置

```javascript
//index.js
path: '/home',
      component: Home,
      children: [{							//添加一个children属性,里面存放一个数组
        path: 'news',						//这时后面的路径就不用加/了
        component: HomeNews,
      }, {
        path: 'message',
        component: HomeMessage,
      }]
```



2.在组件内部使用<router-view>标签

```vue
<router-link to="/home/news">新闻</router-link>
<router-link to="/home/message">信息</router-link> //to要写完整路径，不然识别不到记得前面加/
    <router-view />									//用于显示
```







### 参数传递

页面跳转时可以传递消息

Profile档案

1.params类型

​	配置路由格式:/router/:id

​	传递方式,在path后面跟上值

​	在子组件通过this.$route.params.id获取

2.query类型

​	to:{path:'\path',**query**:{name:'',age:18}

在query对象里传入对象

```javascript
 <router-link :to="{ path: '/profile', query: { name: 'rt', age: 18 } }"
      >档案</router-link
    >
```

生成的url为

http://localhost:8080/profile?name=rt&age=18传参，即传入了查询

![Snipaste_2021-03-22_20-01-36](mdimages\Snipaste_2021-03-22_20-01-36.jpg)

取值时在组件中使用this.$route.query即取得整个对象

```javascript
this.$route.query
```



this.$router和this.$route区别

router是路由器，基本全局使用的router都是同一个,其中的push和replace可以跳转

route是路由，就是当前活跃的地址,里面的params和query属性可以获取当前url的参数



### 导航守卫

路由发生跳转时进行监听

router.beforeEach(guard:NavigationGuard)//前置钩子

NavigationGuard是一个函数，有三个参数

​	{	to:目的地path对应的组件

​		from:

​		next:也是一个函数，会自动实现

​	}

```java
router.beforeEach((to,from,next)=>{})
```

在路由映射里可以一个地址映射可以添加meta属性来添加一些内容，比如页面的标题

```javascript
{
      path: '/home',
      component: Home,
      meta: {
        title: '首页'
      },
      child:[]
}
```

这时就可以利用导航守卫和目的path来实现打开对应路径时改变标题

```javascript
//index.js
router.beforeEach((to,from,next)=>{
    document.title=to.matched[0].meta.title;
    next()							//next要保留，这是默认的路由跳转执行的函数
})
```

​		$route.matched

1. 一个数组，包含当前路由的所有嵌套路径片段的**路由记录**
2. 一个路由匹配到的所有路由记录会暴露为 `$route` 对象 (**还有在导航守卫中的路由对象)** 的 `$route.matched` 数组

所以matched[0]是当前url最顶部的一个path的记录



同理还有后置钩子

router.afterEach((to,from)=>{ })

**beforeEach和afterEach都是全局守卫**

还有路由独享守卫和组件内守卫



### kepp-alive

当一个组件想一直保留不被销毁时，可以使用keep-alive

可以提高性能避免组件一直被频繁创建和销毁

```vue
<keep-alive><router-view /></keep-alive>
```

keep-alive后组件就多了actived和deactived状态，在离开页面时调用deactived,进入时调用actived

其中有两个属性，include(匹配的组件会缓存)和exclude(排除的组件外会缓存)

```vue
<keep-alive include="Profile"><router-view /></keep-alive>
```



### 

## Vuex

专门为vue.js程序开发的状态管理模式，采用集中式存储管理应用的所有组件状态，以相应的规则保证状态以一种可预测的方式发生

状态一般是指多个组件需要同时共享的变量，这时可以把这个变量放到vuex进行管理

比如用户的登录状态，用户名头像等

这些状态信息，放在vue-x中进行管理且都是响应式的



### 单界面到多界面的状态管理

![Snipaste_2021-03-23_21-36-35](mdimages\Snipaste_2021-03-23_21-36-35.png)

### 多个组件共享

![Snipaste_2021-03-23_21-36-20](mdimages\Snipaste_2021-03-23_21-36-20.png)

改变数据时不要直接对state进行改动，而是要通过mutation进行改动，可以通过devtools观察到过程，

异步处理时要通过action进行改动



```javascript
//store对象
const store = new Vuex.Store({
  state: {
    counter: 1000
  },
  mutations: {
    //方法
    increment(state) {
      state.counter++;
    },
    decrement(state) {
      state.counter--
    }
  }
});
```

通过store里的commit方法调用mutation

```javascript
 
methods: {
    addition() {
      this.$store.commit("increment");
    },
    substraction() {
      this.$store.commit("decrement");
    },
  },
```





最基本使用

![Snipaste_2021-03-23_22-09-12](mdimages\Snipaste_2021-03-23_22-09-12.png)





### Vuex核心概念

#### State

保存的共享状态

单一状态树（单一数据源）就是把所有状态信息都放在一个store中，方便管理和维护



#### Getters

类似于计算属性computed,不过是放在store里面的，访问器

每个getter会传入state,也可以获取到当前的getters，同时还可以从调用者传入参数，通过返回函数即可

```javascript
getters: {
    powerCounter(state) {
      return state.counter ** 2;
    }
    counterAddOne(state,getters){			//这里的getters就是当前的getters
        return getters.powerCounter+1			
    }
    counterAddNum(state){
        return function(num){
            return state.counter+num;			//在调用时加上括号和参数
        }
    }
  }
```



#### Mutation

处理同步操作



使用devtools工具无法捕获异步操作



包含两个部分

1.字符串的事件类型

2.一个回调函数，该回调函数的第一个参数是state

参数被称为Payload(载荷)



普通提交风格

```javascript
addition(count) {
      this.$store.commit("increment",count);
    },
```

特殊提交风格

```javascript
addition(count) {
      this.$store.commit({
      type:'increment',
      count,
      });
    },
//以这种方式提交接收时要使用payload
        increment(state,payload) {				//默认传入state,即store中的状态
      state.counter+=payload.count;
    },
```



mutation响应式原理，当store组件创建时都进入了vue的响应式系统，后面有些方法非响应式则不能在view中显示，

比如delete和数组[0]=xx,要使用这两种操作可以用Vue.delete()和Vue.set



#### Action

处理异步操作

当有异步操作时，把操作放到action中,在其中如果想操作store中的state，就可以在里面调用commit

```javascript
actions: {
    asyanc(context, payload) {//默认传入一个context,指向的是当前的store
      setTimeout(() => { console.log(payload); context.commit("decrement") }, 1000);
    }
  }

```

然后在component中进行调用，使用dispatch方法

```javascript
substraction() {
      // this.$store.commit("decrement");
      let payload = "try";
      this.$store.dispatch("asyanc", payload);		//第一个参数就是要调用的action的名字
    },
```

异步promise回调写法

在action中返回一个Promise对象

```javascript
 asyanc(context, payload) {
      return new Promise((resolve) => {
        setTimeout(() => { resolve(payload); context.commit("decrement") }, 1000);
      })
    }
```

在component中使用then

```javascript
substraction() {
      let payload = "try";
      this.$store.dispatch("asyanc", payload).then((res) => {
        console.log(res);
      });
    },
```



#### Module

划分模块

每个模块都可以有自己的state，mutation等





## 网络封装



axios

基本使用

1.安装 

```console
npm install axios --save
```

2.调用和使用

```javascript
import axios from 'axios'

const config = {
  url: 'http://rt.free.idcfengye.com/Custom/findAllCustom',

  method: 'get',
}

axios(config).then((res) => {			//axios里面传入一个对象，可以调用then进行回调
  console.log(res)
});
```



并行使用axios.all

传入一个数组，类型都是axios,相当于promise.all

```javascript
axios.all([axios({
  url: 'http://rt.free.idcfengye.com/Custom/findAllCustom',
}), axios({
  url: 'http://rt.free.idcfengye.com/Branch/findAllBranch'
})]).then((res) => {
  console.log(res);
})
```



全局配置

可以创建多个axios实例，对其进行不同的初始配置，然后可以进行选择性调用

```javascript
const instance = axios.create({
  baseURL: 'http://rt.free.idcfengye.com',			//创建了一个axios实例
  timeout: 5000
});


instance({										//直接使用实例向axios一样使用
  url: 'Custom/findAllCustom',
}).then((res) => {
  console.log(res)
})
```



封装

新建一个单独处理导入axios和处理请求连接的js文件，在里面进行处理，这样以后假设第三方需要修改只在一个文件里修改即可

```javascript
import axios from 'axios'

export function request(config) {
  const instance = axios.create({
    baseURL: 'http://rt.free.idcfengye.com',
    timeout: 5000
  });
  return instance(config);				//这里返回的axios实际上就是一个promise对象	
    									//调用这个实例时就可以直接使用then和catch了

}
```

使用

```javascript
import { request } from './network/request'
request({
  url: 'Custom/findAllCustom'
}
).then((res) => {
  console.log(res)
})
```





拦截器

主要用于在请求前或者接收响应后对数据先行处理,例如登录状态页面跳转等

全局请求拦截器

```javascript
 instance.interceptors.request.use(
    config => {console.log(config)  //use中有两个参数，一个是请求成功回调，返回的是请求的config
               return config 			//使用拦截后要记得返回，不然config被拦截会导致无法获得响应
              }, 
    err => console.log(err));		//另一个是请求失败的回调	
									
```

返回拦截器

```javascript
instance.interceptors.response.use(
    res => {
      console.log(res)
      return res;
    },
    err => console.log(err));

```





## 其他

### 路径别名

vue-cli2中的webpack.base.config.js

```javascript
resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('src'),
    }
  },
```

其中的@就对应了src文件夹



### 请求网站

httpbin.org



## 项目

1.git

先在github上创建仓库,然后和本地项目连接

```git
git remote add origin 远程仓库地址
```

```console
git push -u origin master
```



2.目录结构

![微信截图_20210325184422](mdimages\微信截图_20210325184422.png)

3.配置

别名