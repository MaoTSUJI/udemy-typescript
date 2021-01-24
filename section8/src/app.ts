/* デコレータ関数 */
// デコレータの関数は大文字で始まることが多い
function Logger0(constructor: Function) {
  console.log("ログ出力中...");
  console.log(constructor);
}
/* デコレータファクトリ */
function Logger(logString: string) {  // デコレータを返す
  console.log("LOGGER ファクトリ");
  return function(constructor: Function) {
    console.log(logString);
    console.log(constructor);
  }
}

/* デコレータ関数 */
function Withtemplate(template: string, hookId: string) { // 開発者にとってのUtility
  console.log("TEMPLATE ファクトリ");
  return function<T extends { new (...args: any[]): {name: string}}>(originalConstructor: T) {  // _はTypeScriptとして受け取るけど無くても構わないというもの。
    return class extends originalConstructor {  // デコレータが渡してきたコンストラクターを新しいコンストラクターで置き換える
      constructor(..._: any[]) {  // _は引数として扱うが実際には使用しないということを明示するもの
        super();  // 古いコンストラクタのロジック
        console.log("テンプレートを表示");
        const hookEl= document.getElementById(hookId);
    if (hookEl) {
      hookEl.innerHTML = template;
      hookEl.querySelector('h1')!.textContent = this.name;
    }
      }
    };
  }
}

@Logger("ログ出力中　- Person") // デコレータはクラスの定義がされたときに実行される！
@Withtemplate("<h1>Personオブジェクト<h1>", "app")  // デコレータは下から上に向かって実行される！！
class Person {
  name = 'Max';

  constructor() {
    console.log('Personオブジェクトを作成中');
  }

}

const pers = new Person();
console.log(pers);

// ---

function Log(target: any, propertyName: string | Symbol) {  // デコレータ関数 // デコレータの使用箇所によって引数が異なる。
  console.log("Property デコレータ");
  console.log(target, propertyName);
}

function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log("Accessor デコレータ"); // 戻り値を返す事ができる
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function Log3(target: any, name: string | Symbol, descriptor: PropertyDescriptor): PropertyDescriptor {
  console.log("Method デコレータ");
  console.log(target);
  console.log(name);
  console.log(descriptor);
  return {

  }
}

function Log4(target: any, name: string | Symbol, position: number) {
  console.log("Parameter デコレータ");
  console.log(target);
  console.log(name);
  console.log(position);
}
class Product {
  @Log
  title: string;
  private _price: number;

  @Log2
  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw Error("不正な価格です。0以下が設定できません。");
    }
  }

  constructor(t: string, p: number) {
    this.title = t
    this._price = p;
  }

  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax);
  }
}

const p1 = new Product('Book', 100);
const p2 = new Product('Book', 200);

function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) { // どこで呼び出されたとしてもそれが属するオブジェクトでバインドするようになる
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    }
  }
  return adjDescriptor;
}

class Printer {
  message = "クリックしました！";

  @Autobind
  showMessage() {
    console.log(this.message);
  }
}

const p = new Printer();
// p.showMessage();

const button = document.querySelector("button")!;
button.addEventListener('click', p.showMessage);
// イベントの対象となった関数をbindする
// showMessage()関数内のthisがbuttonを参照してしまう。

// 以下の用にbindメソッドを利用して
// button.addEventListener('click', p.showMessage.bind(p));  // thisを参照するのはpとなる


// ---
/* バリデーションディスクレーマー */
interface ValidatorConfig {
  [prop: string]: {
    [validatableProp: string]: string[] // ['required', 'positive']
  }
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
  registeredValidators[target.constructor.name] = { // constructorはnameプロパティを持ってる。オブジェクト名を返す
    ...registeredValidators[target.constructor.name], // もともとオブジェクトに存在しているもののを保存しておく
    [propName]: [
      // ...(registeredValidators[target.constructor.name]?.[propName] ?? []),
      'required'
    ],
  }
}

function PositiveNumber(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: [
      // ...(registeredValidators[target.constructor.name]?.[propName] ?? []),
      'positive'
    ],
  }
}

let isValid = true;
function validate(obj: any) {
  const objValidatorConfig = registeredValidators[obj.constructor.name];  //RequiredやPosiで保存したオブジェクトを呼び出す。
  if (!objValidatorConfig) return;
  for (const prop in objValidatorConfig) {
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case 'required':
          isValid = isValid && !!obj[prop];
          break;
        case 'positive':
          isValid = isValid && obj[prop] > 0;
          break;
      }
    }
  }
  return isValid;
}
class Course {
  @Required // third　party libraryとして使用できる
  title: string;
  @PositiveNumber
  price: number;

  constructor(t:string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const courseForm = document.querySelector('form')!;
courseForm.addEventListener('submit', event => {
  event.preventDefault();
  const titleEl = document.getElementById('title') as HTMLInputElement;
  const priceEl = document.getElementById('price') as HTMLInputElement;

  const title = titleEl.value;
  const price = +priceEl.value; // +をつけてnumberにキャストする

  const createdCourse = new Course(title, price);
  if (!validate(createdCourse)) {
    alert('正しく入力して下さい');
    return;
  }
  console.log(createdCourse);
});