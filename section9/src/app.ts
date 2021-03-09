import { ProjectInput } from "./components/project-input.js";
import { ProjectList } from "./components/project-list.js";
// 依存関係を宣言しなくても、コンパイルエラーは出てこずブラウザでエラーが発生する
// 個別のファイルに必要な依存関係をすべて追加すること

new ProjectInput();
new ProjectList("active");
new ProjectList("finished");
