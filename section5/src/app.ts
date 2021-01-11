type AddFn = (a: number, b: number) => number;   // typeが一般的
// interface AddFn {
//   (a: number, b: number): number; //  匿名メソッド
// }

let add: AddFn;

add = (n1: number, n2: number) => {
  return n1 + n2;
}


interface Named {
  readonly name?: string;
  outputName?: string;  // 任意のプロパティであることを示す。オプショナルなプロパティ
}

interface Greetable extends Named {
  greet(phrase: string): void;
}

class Person implements Greetable {
  name?: string;
  age = 30;

  constructor(n?: string) {
    if (n) {  // オプショナルの場合はundefinedチェックをする必要がある
      this.name = n;
    }
  }

  greet(phrase: string) {
    if (this.name) {
      console.log(phrase + '　' + this.name);
    } else {
      console.log('Hi');
    }
  }
}

let user1: Greetable;

user1 = new Person();

user1.greet('Hello, I am');
console.log(user1);