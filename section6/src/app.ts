type Admin = {
    name: string;
    privileges: string[];
}

type Employee = {
    name: string;
    startDate: Date;
}

type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
    name: 'Max',
    privileges: ['create-server'],
    startDate: new Date(),
}

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

// function add(a: number): number; // 引数の数も設定できるが、オプショナルである必要がある
function add(a: string, b: string): string; // 引数にstring入ったら、戻り値はstringになることを宣言する。
function add(a: number, b: number): number; // 引数にnumber入ったら、戻り値はnumberになることを宣言する。
function add(a: string, b: number): string;
function add(a: number, b: string): string;
function add(a: Combinable, b: Combinable){
    if (typeof a === 'string' || typeof b === 'string') {    // typeガード
        return a.toString() + b.toString();
    }
    return a + b;
}

// const result = add('Hello', 'TypeScript');
// const result = add(1, 'TypeScript');
const result = add('Hello', 1);
result.split(' ');

const fetchUserData = {
  id: 'u1',
  name: 'user1',
  job: {
    title: 'Developer',
    description: 'TypeScript',
  },
}

console.log(fetchUserData.job && fetchUserData.job.title);  // jobが存在してるかチェックし、存在してたらtitleを取得実行する
console.log(fetchUserData?.job?.title); // オプショナルチェーン

const userInput = '';

const storedData = userInput ?? 'DEFAULT';

console.log(storedData);

// type UnknownEmployee = Employee | Admin;

// function printEmployeeInformation(emp: UnknownEmployee) {
//   console.log(emp.name);
//   if ('privileges' in emp) {
//     console.log("Privileges: " + emp.privileges);
//   }
//   if ('startDate' in emp) {
//     console.log("startDate: " + emp.startDate);
//   }
// }

// printEmployeeInformation({name: 'Manu', startDate: new Date()});

// class Car {
//   drive() {
//     console.log("運転中...");
//   }
// }

// class Truck {
//   drive() {
//     console.log("トラックを運転中...");
//   }

//   loadCargo(amount: number) {
//     console.log("荷物を載せています..." + amount);
//   }
// }

// type Vehicle = Car | Truck;

// const v1 = new Car();
// const v2 = new Truck();

// function userVehicle(vehicle: Vehicle) {
//   vehicle.drive();
//   // if ('loadCargo' in vehicle) { // プロパティ名を間違えてしまう可能性がある
//   //   vehicle.loadCargo(1000);
//   // }
//     // クラスであればインターフェースと違ってインスタンス化で呼び出されたコンストラクタ関数をJavaScriptがサポートしてるので使用できる
//   if (vehicle instanceof Truck) { // typeガード
//     vehicle.loadCargo(1000);
//   }
// }

// userVehicle(v1);
// userVehicle(v2);
// interface Bird {
//   type: 'bird', // discriminated Unions // 共通のプロパティを作成することにより、そのオブジェクトが何なのかを表すことが出来る
//   flyingSpeed: number;
// }

// interface Horse {
//   type: 'horse',
//   runningSpeed: number;
// }

// type Animal = Bird | Horse;

// function moveAnimal(animal: Animal) {
//   // if (animal instanceof Bird) {  // typeガードとしては保守性、拡張性が弱い
//   //   console.log(animal.flyingSpeed);

//   // }
//   let speed;
//   switch (animal.type) {
//     case 'bird':
//       speed = animal.flyingSpeed;
//       break;
//     case 'horse':
//       speed = animal.runningSpeed;
//   }
//   console.log("移動速度: " + speed);
// }

// moveAnimal({type: 'bird', flyingSpeed: 10});

// // const paragraph = document.querySelector('p');
// // const paragraph = document.getElementById('message-output');
// // const userInputElement = <HTMLInputElement>document.getElementById('user-input')!;
// // const userInputElement = document.getElementById('user-input') as HTMLInputElement;
// const userInputElement = document.getElementById('user-input');

// if (userInputElement) {
//   // userInputElement as HTMLInputElement.value = 'こんにちは';
//   (userInputElement as HTMLInputElement).value = 'こんにちは';   // !の代わりに使用できる
// }

// interface ErrorContainer {   // { email: '正しいメールアドレスではありません', username: 'この'ユーザー名は使用できません }
//   [prop: string]: string; // 事前にどのようなプロパティがあるか分からないときに使う。
// }

// const errorBag: ErrorContainer = {
//   email: '正しいメールアドレスではありません',
//   username: 'このユーザー名は使用できません'
// }

