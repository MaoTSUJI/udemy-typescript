var button = document.querySelector('button');
var input1 = document.getElementById('num1'); // !: 絶対にnullにはならないという宣言
var input2 = document.getElementById('num2'); // as 型キャスト 型を指定してやる
function add(num1, num2) {
    return num1 + num2;
}
button.addEventListener('click', function () {
    console.log(add(+input1.value, +input2.value));
});
