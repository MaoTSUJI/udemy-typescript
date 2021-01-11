// let age = 30;
// age = 29;

// function add(a: number, b: number) {
// 	let result;
// 	result = a + b;
// 	return result;
// }

// const add = (a: number, b: number = 1) => a + b;

// const printOutput: (output: string | number) => void = output => {
//   console.log(output);
// }
// console.log(add(2));

// const button = document.querySelector('button');
// if (button) {
//   button.addEventListener('click', event => {
//     console.log(event);
//   });
// }

const hobbies = ['Sports', 'Cocking'];
const activeHobbies = ['Hiking', ...hobbies]; // const は参照なので、配列への参照。配列の中身への変更は可能。
// activeHobbies.push(hobbies[0], hobbies[1]);
activeHobbies.push(...hobbies); // 上と同じ


const person = {
  firstName: "Max",
  age: 30,
};

const referredPerson = person;  // この場合、コピーしたのではなくpersonを参照しているだけ
const copiedPerson = {  // これは、中身がpersonと同じ新しいオブジェクトが作成されていることになる。
  ...person,
};

const add = (...numbers: number[]) => {
  return numbers.reduce((curResult, curValue) => {
    return curResult + curValue;
  }, 0);
};

const addedNumbers = add(5, 10, 3, 3.7);  // カンマ区切りの配列がnumbersの引数として渡されること
console.log(addedNumbers);

// const hobby1 = hobbies[0];
// const hobby2 = hobbies[1];

const [hobby1, hobby2, ...remainingHobbies] = hobbies;
console.log(hobbies, hobby1, hobby2);

const { firstName: userName, age } = person;  // ここでの: userNameは名前を上書きしている
console.log(userName, age, person);