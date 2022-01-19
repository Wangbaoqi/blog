---
title: TypeScript 基础
date: 2021-03-05 10:28:48
cover: https://cdn.jsdelivr.net/gh/Wangbaoqi/blogImgs@master/nateImgs/bg/bg19.jpeg
tags: 
  - typescript
categories: 前端
---


### 基本类型

TS 除了支持 JS 所有[基本类型](<../javascript-advance/javascript basic/data-type.md>)之外，还有一些其他的基本类型：

* void 没有任何类型 例如函数没有返回值时，其返回值类型为void
* any 任何类型 动态的
* enum 枚举类型
* never 表示永不存在的值的类型

```typescript
// void 函数没有返回值
function foo():void {
  conosle.log('void')
}
// 变量为void类型 只能赋值 undefined 或者 null
let unable:void = undefined;
let unable:void = null; 
```

#### Any 类型

any 类型跟现在JS类型效果是一致的，类型是动态的，两者之间的区别是类型的判断的时机不一致（JS是在运行时，TS是静态的）

```typescript
// 变量为 any
let foo: any = 2;
foo = '2';

// 数组子项类型不同
let arr: any[] = [1, '2', true, {}];
```

#### Enum 类型

enum 类型是对JS类型的补充，可以跟后端语言一样，为一组数值赋予友好的名字

```typescript
enum Color { Red = 1, Green = 2, Blue = 3}
let c: Color = Color.Red;
```

#### Never 类型

`never` 类型表示那些永不存在的值的类型。可以应用到抛出异常的函数或者不会有返回值的函数。

`never`是任何类型的子类型，可以赋值给任何类型。

```typescript
// 抛出异常的函数
function error(err: string): never {
 throw new Error(err)
}
// 返回never类型的函数 必须无法到达终点
function loop(): never {
  while(true) {}
}
```

### 对象类型

TS 的对象类型跟JS的类似，有 `object` 、`array` 、`class` 等。

```typescript
let obj: object = {};
let obj: {name: string, age: number} = {name: 'nate', age: 20};
// 数组定义方式1
let arr: number[] = [1,2,3];
// 数组定义方式2
let arr: Array<number> = [1,2,3];
// 数组中不同类型定义
let arr: (number | string)[] = [1, '3', 2];

class Person {
  name: string,
  age: number
}
const perList: Person[] = [
  new Person(),
  {
    name: 'nate',
    age: 20
  }
]
```

#### 类型别名

```typescript
type User = {
  name: string,
  age: number
}
const users: User[] = [{name: 'nate', age: 20}];
```

#### Tuple 元组类型

元组类型表示一个已知数量和类型的数组，其定义的类型顺序也是一致的。

```typescript
const tuArr: [string, number] = ['1', 2]; 
tuArr[0]; // '1'
tuArr[1]; // 2
tuArr[2] = 4; // ok
tuArr[3] = false; // error
```

#### Function 函数类型

函数的使用跟JS是一致的，在TS中是给函数增加了一静态类型，这样在开发的函数的时候可以减少很多的类型错误。

**函数返回类型**

在TS中，函数是具有返回类型的（具有返回值），比如 `number` 、 `string` 等

```typescript
// 函数返回 number类型
function add(x: number, y: number): number {
  return x + y;
}
// 没有返回值
function foo(): void {}

// 类型推断 入参都是 number类型的 则返回一定是number类型的
function add(x: number, y: number) {
  return x + y
}

// 函数表达式
// (s: sring) => string 表示bar是一个函数类型 入参和返回都是string类型的
const bar: (s: sring) => string = (s) => { 
  return s;
}: 
```

### interface 接口

> TypeScript的核心原则之一是对值所具有的_`结构`_进行类型检查。 它有时被称做“鸭式辨型法”或“结构性子类型化”。 在TypeScript里，接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约。

下面示例包含了以下几种接口类型：

* readonly 只读属性
* ? 可选属性
* `[propName: string]`  额外的属性
* 函数接口类型
* 接口继承

```typescript
interface Person {
  readonly sex: string,
  name: string,
  // age 可选属性
  age?: number,
  [propName: string]: any,
  say(): string
}

// 接口继承
interface Teacher extends Person {
  teach(): string
}

// 接口函数类型
interface Say {
  (s: string): string
}


const getName = (person: Person): void => {
  console.log(person.name)
}
const setName = (person: Person, name: string): void => {
  person.name = name
}

const person = {
  name: 'nate'
}
```

### 类类型

TS 在ES6的基础上，对类增加了一些后端语言类的特性，比如访问特性 `public` 、`private`、`protect` 等等。下面逐一看这些特性。

#### 继承

继承直接是沿用了ES6的语法，使用关键字 `extends` , 是扩展类的一种手段，也是面向对象编程的一种方式。

```typescript
class Person {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  getName() {
    return this.name;
  }
}

class Student extends Person {
  constructor() {
    super('nate')
  }
}
```

#### 访问修饰符

访问修饰符 `public` 、`private`、`protect`  跟 `C# `中类比较类似了。

* `public`  -   默认为public，类里和类外面都可以访问

```typescript
// name 属性在Person类里和实例中都可以访问
class Person {
  public name: string
  constructor(name: string) {
    this.name = name;
  }
  getName() {
    return this.name
  }
}
const s = new Person('bao')
s.name;
```

* `private` 声明为private时，则不能在类的外面访问，也就是它是私有的

```typescript
// name 属性只能在Person类里可以访问
class Person {
  private name: string
  constructor(name: string) {
    this.name = name;
  }
  getName() {
    return this.name
  }
}
const s = new Person('bao')
s.getName(); // 通过方法来访问私有属性
```

* protected 跟 `private` 很相似，但是`protected`在派生类中可以访问

```typescript
// name 属性在Person类或者派生类中都可以访问
class Person {
  protected name: string
  constructor(thename: string)
    this.name = thename;
  }
}
class Student extends Person {
  constructor(sName: string) {
    super(sName)
  }
  // 派生类中访问 name
  getName() {
    return this.name
  }
}
const s = new Student('bao')
```

类中的构造函数也可以被标记为`protected` ，表明该类不能被实例化，只能被继承

```typescript
class Person {
  protected name: string
  protected constructor(thename: string)
    this.name = thename;
  }
}
class Student extends Person {
  constructor(name) {
    super(name)
  }
  getName() {
    console.log(this.name)
  }
}
```

#### readonly 修饰符

顾名思义，`readonly` 只能读，不能写

```typescript
class Person {
  readonly name: string;
  constructor(theName: string) {
    this.name = theName; // error just read
  }
}
```

#### 存取器 get 和 set

存取器也跟ES6 中的`class`类似，目的是为了有效控制访问成员属性。

首先，存取器要求你将编译器设置为输出ECMAScript 5或更高。 不支持降级到ECMAScript 3。 其次，只带有 `get`不带有 `set`的存取器自动被推断为 `readonly`

```typescript
class Person {
  private _name: string;
  
  set name(name: string) {
    this._name = name
  }
  get name() {
    return this._name
  }
}
let p = new Person();
p.name = 'nate';
p.name; // nate
```

#### 静态属性

静态属性也是跟ES6类似，是存在在于类上的属性，而不是实例上的，只有类有权访问该属性。

```typescript
class Person {
  static name: string;
  setName() {
    Person.name = 'nate'
  }
}
const p = new Person();
p.setName();
Person._name; // nate
```

#### 抽象类

抽象类作为其他派生类的基类使用，一般是不会被实例化的。可以包含成员的实现细节，abstract 关键字是用于定义抽象类以及其内部的抽象方法。

```typescript
abstract class Person {
  constructor(public name: string) {
    this.name = name;
  }
  abstract getType(): void; // 必须在派生类中实现
}

class Student extends Person {
   constructor(public name: string) {
     super(name)
   }
   getType() {
      reutrn 'student'
   }
}
let s = new Student('nate')
s.getType()
```


