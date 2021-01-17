// const names: Array<string> = [];    // string[] と型指定するのと同じ
// names[0].split

// const promise: Promise<number> = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(10);
//   }, 2000);
// })

// promise.then(data => {
//   // data.split(' ');
// })

function merge<T extends Object, U extends Object>(objA: T, objB: U) {  // 明確に型を書かないことによって柔軟性をもたせられる。
  return Object.assign(objA, objB);
}

const mergedObj = merge({name: 'Max', hobbies: ['Sports']}, {age: 30}); // 柔軟にする
// merge関数はオブジェクト同士しかマージしない
mergedObj.name;  // ジェネリック型じゃないとObjectを返すだけの関数なので、プロパティを持たない
console.log(mergedObj);


interface Lengthy {
  length: number;
}
function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let descriptionText = '値がありません';
  if (element.length > 0) {
    descriptionText = '値は' + element.length + '個です。';
  }
  return [element, descriptionText];
}

 console.log(countAndDescribe(['Sports', 'Cooking']));

 function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
  return 'Value: ' + obj[key];
 }

function extractAndConvert1<T extends object, U extends keyof T>(obj: T, key: U) {
  return 'Value: ' + obj[key];
}

 extractAndConvert({ name: 'Max'}, 'name');

 class DataStorage<T extends string | number | boolean > {
   private data: T[] = [];

   addItem(item: T) {
    this.data.push(item);
   }

   removeItem(item: T) {
    this.data.splice(this.data.indexOf(item), 1); // プリミティブに対しては判定が効くが、参照型に関しては確認できない
    // ↑itemに当たるものがなければ、-1なので最後の要素を削除してしまう
    if (this.data.indexOf(item) === -1) {
      return;
    }
    this.data.splice(this.data.indexOf(item), 1);
  }

   getItems() {
     return [...this.data]; // this.dataのコピーを返す
   }
 }
 const textStorage = new DataStorage<string>();
 textStorage.addItem("Data1");
 textStorage.addItem("Data2");
 textStorage.removeItem("Data1");
 textStorage.getItems();
 console.log(textStorage.getItems());

 const numberStorage = new DataStorage<number>();

 /* データ・ストレージ型でオブジェクトを使うことを禁止する */
 /* オブジェクトに適した形で出すようにクラスを作る方がよい */
// const objStorage = new DataStorage<object>(); // JavaScriptではobjectは参照型
// const obj = { name: 'Max'};
// objStorage.addItem(obj);
// objStorage.addItem({ name: 'Manu'});
// // ...
// objStorage.removeItem(obj);
// console.log(objStorage.getItems());


/* Partial */
interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

function createCourseGoal(title: string, description: string, date: Date): CourseGoal {
  // return {
  //   title: title, description: description, completeUntil: date,
  // };
  let courseGoal: Partial<CourseGoal> = {};
  courseGoal.title = title; // Vanillaのjavascriptでは即興でオブジェクトにプロパティを代入することができるが、TypeScriptはできない
  courseGoal.description = description;
  courseGoal.completeUntil = date;
  return courseGoal as CourseGoal;
}

/* Readonly */
const names: Readonly<string[]> = ['Max', 'Anna'];
names.push('Manu'); // readonlyやから
names.pop('Manu');


/* Record<Keys, Type> */
interface PageInfo {
	title: string;
}

type Page = "home" | "about" | "contact";

const nav: Record<Page, PageInfo> = {
  about: { title: "about"},
  contact: { title: "contact"},
  home: { title: "home"},
}

nav.about.title;  // ^ = const nav: Record

/* Pick<Type, Keys> */
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = Pick<Todo, "title" | "completed">;

const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
};

todo;

/* Omit<Type, Keys> */
type TodoPreview1 = Omit<Todo, "description">;

const todo1: TodoPreview1 = {
  title: "Clean rooom",
  completed: false,
}

todo1;


/* Exclude<Type, ExcludedUnion> */
type T0 = Exclude<"a" | "b" | "c", "a">
// ^ = type T0 = "b", "c"
type T1 = Exclude<"a" | "b" | "c", "a" | "b">
// ^ = type T1 = "c"
type T2 = Exclude<string | number | (() => void), Function>;
// ^ = type T2 = string | number

/* Extract<Type, Union> */
type T10 = Extract<"a" | "b" | "c" , "a" | "f">;
// type T10 = "a"
type T11 = Extract<string | number | (() => void), Function>;
// type T11 = () => void

/* NonNullable<Type> */
type T20 = NonNullable<string | number | undefined>;
// string | number
type T30 = NonNullable<string[] | null | undefined>;
// T30 = string[]

/* Parameters<Type> */
// 関数型Tの引数の型をタプルとして抽出する。
// ちょくちょく使える
declare function f1(arg: {a: number; b: string}): void;

type T40 = Parameters<() => string>;  // []
type T41 = Parameters<(s: string) => void>; // [s:string]
type T42 = Parameters<<T>(arg: T) => T>;  // [arg: unknown]
type T43 = Parameters<typeof f1>;  // type T3 = [arg: { a: number; b: string }]
type T44 = Parameters<any>; // unknown[]
type T45 = Parameters<never>; // never
type T46 = Parameters<string>;  // Error
type T47 = Parameters<Function>;  // Error

/* ContructorParameters<Type> */
// 型Tのコンスと楽s他の引数の型をタプルとして抽出。Parametersのコンストラクタ版
type T50 = ConstructorParameters<ErrorConstructor>;  // [message?: string]
type T51 = ConstructorParameters<FunctionConstructor>;  // string[]

/* ReturnType */
// 型Tの戻り値の型を返す。Tには関数型のみ指定可能
const foo = () => "foo";

type T61 = ReturnType<typeof foo>;   // string
type T62 = ReturnType<typeof window.setTimeout>; // number
type T63 = ReturnType<() => void>;  // void

/* InstanceType */
// 型Tのコンストラクタの返り値の型を返す型
class Foo{};

type T71 = InstanceType<typeof Foo>; // Foo
type T72 = InstanceType<any>;  // any
type T73 = InstanceType<never>;  // nay

/* ThisType */
// thisの型をTとすることができる特殊な型
interface Foo {
  bar: number;
}
interface Baz {
  qux(): string;
}
const quux: ThisType<Foo> = {
  meMethod() {
    return this.bar;
  },
}
const corge: Baz & ThisType<Foo> = {
  qux() {
    return this.bar.toString(16);
  }
}