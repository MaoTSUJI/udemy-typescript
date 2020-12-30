const button = document.querySelector('button');
const input1 = document.getElementById('num1')! as HTMLInputElement;    // !: 絶対にnullにはならないという宣言
const input2 = document.getElementById('num2')! as HTMLInputElement;    // as 型キャスト 型を指定してやる

function add(num1: number, num2: number) {
  return num1 + num2;
}

button.addEventListener('click', function() {
  console.log(add(+input1.value, +input2.value));
});
