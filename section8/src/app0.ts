/* デコレータ関数 */
function Logger10(constructor: Function) { // デコレータはただの関数
  console.log("ログ出力中...");
  console.log(constructor);
}

/* デコレータファクトリ */
function Logger11(logString: string) {
    // デコレータ関数の中で使う値をカスタマイズ出来る
  return function(constructor: Function) {
    console.log(logString);
    console.log(constructor);
  }
}

/* 便利なデコレータ */
function WithTemplate1(template: string, hookId: string) {
  return function(_: Function) {  // メタプログラミング // 3rdパーティユーザーとして、他のユーザーにライブラリとして共有することが出来る
    const hookEl = document.getElementById(hookId);
    if (hookEl) {
      hookEl.innerHTML = template;
    }
  }
}

// @Logger10  // デコレータは定義を見つけたときに実行する
@Logger11("ログ出力中... byファクトリ") // デコレータ関数を実行しているのではなく、デコレータ関数を返す関数を実行している
@WithTemplate1("<h1>Personオブジェクト</h1>", "app")
class Person1 {
  name = 'Max';

  constructor() {
    console.log('Personオブジェクトを作成中...');
  }
}

const person1 = new Person1();  // Personオブジェクトを作成中
console.log(person1); // Person1 {name: "Max"}