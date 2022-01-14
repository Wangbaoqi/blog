---
title: 从源码看 React JSX
date: 2021-07-02 10:28:48
cover: https://cdn.jsdelivr.net/gh/Wangbaoqi/blogImgs@master/nateImgs/react/react-jsx.png
tags:
  - React
categories:
  - React
---

**JSX** 是 JavaScript 语法的一种扩展，可以在 JavaScript 中编写`HTML`代码，这样做是为了更好的将页面逻辑和页面结构结合在一起，符合 React 的组件化的开发模式。

## 源码的角度

为了更好的理解**JSX**，首先从源码的角度来看**JSX**到底是一种什么语法。

`这里使用源码的版本17.0.0`。

我们知道，我们写的**JSX**的结构，在运行时的时候都会被`babel`进行编译。

而在`React`不同的版本之间，其编译的方式也是不同的，在`17+`版本更新中，其中最主要是的更新了**JSX**的编译方式。

### 全新的编译方式

在`17版本`发布后，React 介绍了[全新的 JSX 编译方式](https://zh-hans.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html)

```js
// JSX 结构
const App = (
  <div className="App">
    <Home />
    <Content />
  </div>
);
```

被`babel`编译之后

```js
"use strict";

var _jsxRuntime = require("react/jsx-runtime");

const App = /*#__PURE__*/ (0, _jsxRuntime.jsxs)("div", {
  className: "App",
  children: [
    /*#__PURE__*/ (0, _jsxRuntime.jsx)(Home, {}),
    /*#__PURE__*/ (0, _jsxRuntime.jsx)(Content, {}),
  ],
});
```

上面代码看到，新的编译引入了`jsx-runtime`脚本，通过其`jsxs`来把`JSX`解析成`React Element`。

```js
// jsxs 指向 jsx
function jsx(type, config, maybeKey) {
  let propName;

  // Reserved names are extracted
  const props = {};

  let key = null;
  let ref = null;

  if (maybeKey !== undefined) {
    key = "" + maybeKey;
  }

  // 解析 key
  if (hasValidKey(config)) {
    key = "" + config.key;
  }

  // 解析 ref
  if (hasValidRef(config)) {
    ref = config.ref;
  }

  // 将 jsx 属性及其子组件解析成props 对象
  for (propName in config) {
    if (
      hasOwnProperty.call(config, propName) &&
      !RESERVED_PROPS.hasOwnProperty(propName)
    ) {
      props[propName] = config[propName];
    }
  }

  // 解析默认的props
  if (type && type.defaultProps) {
    const defaultProps = type.defaultProps;
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }

  // 最后生成ReactElement
  return ReactElement(
    type,
    key,
    ref,
    undefined,
    undefined,
    ReactCurrentOwner.current,
    props
  );
}
```

接下来，看下经典的编译方式，也就是在`17v`之前使用的编译方式，常说的`React.createElement`

### 经典的编译方式

在老的`jsx`编译方式中，`babel`将`jsx`编译成了下面的结构。

```js
const App = /*#__PURE__*/ React.createElement(
  "div",
  {
    className: "App",
  },
  /*#__PURE__*/ React.createElement(Home, null),
  /*#__PURE__*/ React.createElement(Content, null)
);
```

这个结构通过`递归`的方式来解析`React Element`，下面看下这种方式跟全新的方式有什么改变。

```js
export function createElement(type, config, children) {
  let propName;

  // Reserved names are extracted
  const props = {};

  let key = null;
  let ref = null;
  let self = null;
  let source = null;

  if (config != null) {
    if (hasValidRef(config)) {
      ref = config.ref;
    }
    if (hasValidKey(config)) {
      key = "" + config.key;
    }

    self = config.__self === undefined ? null : config.__self;
    source = config.__source === undefined ? null : config.__source;

    // 将 jsx 属性及其子组件解析成props 对象
    for (propName in config) {
      if (
        hasOwnProperty.call(config, propName) &&
        !RESERVED_PROPS.hasOwnProperty(propName)
      ) {
        props[propName] = config[propName];
      }
    }
  }

  // 将子元素添加到props对象上
  const childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    const childArray = Array(childrenLength);
    for (let i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    props.children = childArray;
  }

  // 解析默认的props
  if (type && type.defaultProps) {
    const defaultProps = type.defaultProps;
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }

  return ReactElement(
    type,
    key,
    ref,
    self,
    source,
    ReactCurrentOwner.current,
    props
  );
}
```

可以看到，新的编译方式和老的处理的方式基本相同，处理`key`、`ref`、`props`，最后调用`ReactElement()`生成 React 元素。

不同之处官方也给出了[答案](https://zh-hans.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#whats-a-jsx-transform)：

- 使用全新的转换，你可以单独使用 JSX 而无需引入 React。
- 根据你的配置，JSX 的编译输出可能会略微改善 bundle 的大小。
- 它将减少你需要学习 React 概念的数量，以备未来之需。

最后再来下`ReactElement`怎么生成 React 元素的。

```js
const ReactElement = function (type, key, ref, self, source, owner, props) {
  const element = {
    // 标识独一无二的React Element 类型
    $$typeof: REACT_ELEMENT_TYPE,

    // React Element 内置的属性，就是上述两者处理的参数值
    type: type,
    key: key,
    ref: ref,
    props: props,

    // Record the component responsible for creating this element.
    _owner: owner,
  };

  return element;
};
```

可以看到，`ReactElement`很简单，返回了不同`tag`类型的**React Element**对象。 [详细的源码](https://github.com/facebook/react/blob/main/packages/react/src/ReactElement.js)

## JSX 使用

大致了解**JSX**的编译方式之后，就是使用它了。

我们知道，**JSX**是`react.createElement`或者`jsx`函数的语法糖，主要是解析 React 元素的类型。

### 元素的类型

在**JSX**结构中，我们可以写符合`HTML`规范的标签或者符合`React`组件的标签。

下面有几点对元素类型的注意事项：

- 如果没有使用 React 新的编译方式，则必须引入 React， 否则会抛出异常`ReferenceError: React is not defined`

```js
// react version < 17
import React from "react";

function App() {
  return <div>react</div>;
}
```

- 标签的大小写，小写则被编译成`HTML`标签，自定义的组件，则必须要大写

- 在**JSX**类型中可以使用点语法

- 在运行时可以选择组件的类型

### 元素的 Props

`props`是**JSX 对象**的属性，有以下几种方式可以指定`props`：

1. `JavaScript`对象作为`props`的值。
2. 字面量作为`props`的值
3. 扩展符运算符`...`
4. 默认值为`true`

例如`ListItem`元素，被转换为`JSX`对象

```js
<ListItem key='2' className="li" show={showObj.isShow} name='nate' {...obj} disable={false}>7</ListItem>

{
  $$typeof: Symbol(react.element)
  key: "2"
  props: { className: 'li', show: 'true', name: 'nate', age: 12, hobby: 'ball', disable: false, children: '7' }
  ref: null
  type: ({ show, disable, ...rest }) => {…}
}
```

### 元素的子元素

元素的子元素会被保存在`props`的`children`属性中。

**子元素的类型**

1. 字面量作为子元素
2. js表达式作为子元素
3. `JSX`对象作为子元素
4. 函数作为子元素
5. 布尔、`null`和`undefined`作为子元素会被忽略

```html
<ul>
  <li>字面量</li>
  <li>{1}</li>
  <ListItem key='0' className="li" show={showObj.isShow} name='nate' {...obj} disable={false}>0</ListItem>
  {() => <li>函数作为子元素</li>}
  <li>{false}</li>
  <li>{null}</li>
  <li>{undefine}</li>
</ul>
```

上述元素被编译，如下：

```js
[
  {
    $$typeof: Symbol(react.element)
    key: null
    props: { children: '字面量' }
    ref: null
    type: 'li'
  },{
    $$typeof: Symbol(react.element)
    key: null
    props: { children: 1 }
    ref: null
    type: 'li'
  },{
    $$typeof: Symbol(react.element)
    key: "2"
    props: { className: 'li', show: 'true', name: 'nate', age: 12, hobby: 'ball', disable: false, children: '7' }
    ref: null
    type: ({ show, disable, ...rest }) => {…}
  },{
    () => {…}
  },{
    $$typeof: Symbol(react.element)
    key: null
    props: { children: false }
    ref: null
    type: 'li'
  },{
    $$typeof: Symbol(react.element)
    key: null
    props: { children: null }
    ref: null
    type: 'li'
  },{
    $$typeof: Symbol(react.element)
    key: null
    props: { children: undefined }
    ref: null
    type: 'li'
  }
]
```

## 总结

`JSX`是**JavaScript**的扩展语法，可以在`js`中写`html`代码，也是`createElement`的语法糖，通过`babel`在运行时进行编译，生成`jsx对象`，元素的属性都会被保存在`props`属性中，也是常说的`visual dom`，在**react diff**算法中，也是通过对比`JSX`对象来获取差异节点。
