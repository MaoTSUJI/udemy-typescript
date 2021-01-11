const button = document.querySelector('button');

function add(n1: number, n2: number) {
    if (n1 + n2 > 0) {
        return n1 + n2;
    }
    return;
}

function clickHandler(message: string) {
    // let userName = "Max";   // 関数の中で使われてない変数があると警告する
    console.log("Clicked!" + message);
}

// comment
if (button) {
    button.addEventListener('click', clickHandler.bind(null, "You're welcome!"));
}
