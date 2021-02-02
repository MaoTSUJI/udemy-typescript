type ProjectStatus = "active" | "finished";

class Project {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public manday: number,
    public status: ProjectStatus
  ) {}
}

/* Project State Management */
type Listener = (items: Project[]) => void;
class ProjectState {
  private listeners: Listener[] = []; // リスナー関数が呼び出されたときに状態が変更されるようにする
  private projects: Project[] = [];
  private static instance: ProjectState;

  private constructor() {
    // シングルトンであることを表す
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }

  addListener(listenerFn: Listener) {
    this.listeners.push(listenerFn);
  }

  addProject(title: string, description: string, manday: number) {
    const newProject = new Project(Math.random().toString(), title, description, manday, 'active');
    this.projects.push(newProject);
    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice()); // そのものではなく、コピーを渡すことにする。（それによって勝手に書き換えられてしまうバグを防ぐ）
    }
  }
}

const projectState = ProjectState.getInstance(); // 状態管理するインスタンスは必ず1つだけしか存在しない。

/* validation */
interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

function validate(validatableInput: Validatable) {
  let isValid = true;
  if (validatableInput.required) {
    isValid = isValid && validatableInput.value.toString().trim().length !== 0;
  }
  if (
    validatableInput.minLength != null &&
    typeof validatableInput.value === "string"
  ) {
    isValid =
      isValid && validatableInput.value.length >= validatableInput.minLength;
  }
  if (
    validatableInput.maxLength != null &&
    typeof validatableInput.value === "string"
  ) {
    isValid =
      isValid && validatableInput.value.length <= validatableInput.maxLength;
  }
  if (
    validatableInput.min != null &&
    typeof validatableInput.value === "number"
  ) {
    isValid = isValid && validatableInput.value >= validatableInput.min;
  }
  if (
    validatableInput.max != null &&
    typeof validatableInput.value === "number"
  ) {
    isValid = isValid && validatableInput.value <= validatableInput.max;
  }
  return isValid;
}

/* autobind decorator */
function autobind(_: any, _2: string, aaa: PropertyDescriptor) {
  const originalDescriptor = aaa.value;
  const adjacentDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      return originalDescriptor.bind(this);
    },
  };
  return adjacentDescriptor;
}

// class ProjectItem {
//   templateEl: HTMLTemplateElement;
//   el: HTMLElement;
//   hostEl: HTMLDivElement;

//   constructor(private _: ProjectStatus) {
//     this.templateEl = document.getElementById(
//       "single-project"
//     )! as HTMLTemplateElement;
//     const importedNode = document.importNode(this.templateEl.content, true);
//     this.el = importedNode.firstElementChild as HTMLElement;
//     this.el.classList.add(`projects`);
//     this.hostEl = document.getElementById("app")! as HTMLDivElement;

//     this.attach();
//   }

//   private attach() {
//     this.hostEl.insertAdjacentElement('beforeend', this.el);
//   }

//   // private renderContent() {
//   //   // const titleElement =
//   // }

// }

class ProjectList {
  templateEl: HTMLTemplateElement;
  el: HTMLElement;
  hostEl: HTMLDivElement;
  assignedProjects: Project[]; // 一旦プロジェクトを格納する入れる

  constructor(private type: ProjectStatus) {
    this.templateEl = document.getElementById(
      "project-list"
    )! as HTMLTemplateElement;
    const importedNode = document.importNode(this.templateEl.content, true);
    this.el = importedNode.firstElementChild as HTMLElement;
    this.el.id = `${this.type}-projects`;
    this.hostEl = document.getElementById("app")! as HTMLDivElement;
    this.assignedProjects = [];

    projectState.addListener((projects: Project[]) => {
      // リスナー関数がやりたいことは、リストに新しく入るプロジェクトを表示させたいということ。
      const relevantProjects = projects.filter(prj => {
        if (this.type === 'active') {
          return prj.status === 'active';
        }
        return prj.status === 'finished';
      });
      console.log(projects);
      this.assignedProjects = relevantProjects;
      this.renderProjects(); // リスナー関数が呼び出されたときに実行するので、this.attach以降のが先に実行されている
    });

    this.attach();
    this.renderContent();
  }

  private renderProjects() {
    const listEl = document.getElementById(
      `${this.type}-projects-list`
    )! as HTMLUListElement;
    // すでにrender済みのlistの中身を取得しないようにしておく。
    listEl.innerHTML = '';
    // 0から要素を追加することになる。
    for (const prjItem of this.assignedProjects) {
      const listItem = document.createElement("li");
      listItem.textContent = prjItem.title;
      listEl.appendChild(listItem);
    }
  }

  private renderContent() {
    const listId = `${this.type}-projects-list`;
    this.el.querySelector("ul")!.id = listId;
    this.el.querySelector("h2")!.textContent =
      this.type === "active" ? "実行中のプロジェクト" : "完了したプロジェクト";
  }

  private attach() {
    this.hostEl.insertAdjacentElement("beforeend", this.el);
  }
}
class ProjectInput {
  templateEl: HTMLTemplateElement;
  hostEl: HTMLDivElement;
  el: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  mandayInputElement: HTMLInputElement;

  public constructor() {
    this.templateEl = document.getElementById(
      "project-input"
    )! as HTMLTemplateElement;
    this.hostEl = document.getElementById("app")! as HTMLDivElement;
    const importedNode = document.importNode(this.templateEl.content, true); // .contentでtemplateタグの内側を参照する
    this.el = importedNode.firstElementChild as HTMLFormElement;
    this.el.id = "user-input";

    this.titleInputElement = this.el.querySelector(
      "#title"
    )! as HTMLInputElement;
    this.descriptionInputElement = this.el.querySelector(
      "#description"
    )! as HTMLInputElement;
    this.mandayInputElement = this.el.querySelector(
      "#manday"
    )! as HTMLInputElement;

    this.el.addEventListener("submit", this.submitHandler);
    this.attach();
  }

  private attach() {
    this.hostEl.insertAdjacentElement("afterbegin", this.el);
  }

  private gatherUserInput(): [string, string, number] | void {
    // タプルまたはundefinedを返すUnion型を使用している
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredManday = this.mandayInputElement.value.toString();

    const titleValidatable: Validatable = {
      value: enteredTitle,
      required: true,
    };
    const descValidatable: Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5,
    };
    const mandayValidatable: Validatable = {
      value: +enteredManday,
      required: true,
      min: 1,
      max: 1000,
    };

    if (
      !validate(titleValidatable) ||
      !validate(descValidatable) ||
      !validate(mandayValidatable)
    ) {
      alert("入力値が正しく有りません。");
      return;
    } else {
      return [enteredTitle, enteredDescription, +enteredManday];
    }
  }

  @autobind
  private submitHandler(e: Event) {
    e.preventDefault(); // このフォームからHTTPリクエストが送られないようにする
    const userInput = this.gatherUserInput();
    // タプルかどうか（配列かどうか）をチェックする
    if (Array.isArray(userInput)) {
      const [title, description, manday] = userInput;
      // 状態管理の配下に置く
      projectState.addProject(title, description, manday);
      this.clearInputs();
    }
  }

  private clearInputs() {
    this.titleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.mandayInputElement.value = "";
  }
}

const prjInput = new ProjectInput();
const prjListActive = new ProjectList("active");
const prjListFinshed = new ProjectList("finished");
