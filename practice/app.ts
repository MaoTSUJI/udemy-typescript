let userInput: unknown;
let userName: string;

userInput = 5;
userInput = 'Max';

if (typeof userInput === 'string') {
    userName = userInput;
}

function generateError(message: string, code: number): never {  // 値を返すことがありえないということを明示的に示す
    throw { message: message, errorCode: code };
    // while(true);
}

const result = generateError('エラーが発生しました', 500);
console.log(result);