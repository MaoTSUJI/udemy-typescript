/* デコレータ関数 */
// デコレータの関数は大文字で始まることが多い
function Logger0(constructor: Function) {
  console.log("ログ出力中...");
  console.log(constructor);
}
/* デコレータファクトリ */
function Logger(logString: string) {
  console.log("LOGGER ファクトリ");
  return function(constructor: Function) {
    console.log(logString);
    console.log(constructor);
  }
}

/* デコレータ関数 */
function Withtemplate(template: string, hookId: string) { // 開発者にとってのUtility
  console.log("TEMPLATE ファクトリ");
  return function(constructor: any) {  // _はTypeScriptとして受け取るけど無くても構わないというもの。
    console.log("テンプレートを表示");
    const hookEl= document.getElementById(hookId);
    const p = new constructor();
    if (hookEl) {
      hookEl.innerHTML = template;
      hookEl.querySelector('h1')!.textContent = p.name;
    }
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