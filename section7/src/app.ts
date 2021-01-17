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