// Task 1
let num: number = 45;
let str: string = "string";
let bool: boolean = true;
let big: bigint = 9007199254740991n;
let a = Symbol("id");
let none: null = null;
let und: undefined = undefined;

// Task 2
function processValue(value: unknown){
    if (typeof value == "string"){
       return value.toUpperCase();
    }
    else if (typeof value == "number"){
        return value * 2
    }
    else{
        return ("Неизвестный тип")
    }
}
console.log("-----------------------------------------------"); 
console.log("TASK 2"); 
console.log(processValue("hello")); 
console.log(processValue(5));       
console.log(processValue(true));  
console.log("-----------------------------------------------"); 
// Task 3
let cities: string[] = ["Петербург", "Москва","Сочи", "Нижний Новгород"];

let matrix: number[][] = [
    [1,4,2],
    [1,3,5],
    [7,5,1],
    [3,5,8]
];

let typelist: number[] = [];

function sumMatrix(m: number[][]): number{
    let sum = 0;
    for (const row of m){
        for (const value of row){
            sum += value;
        }
    }
    return sum;
}
console.log("TASK 3"); 
console.log(sumMatrix(matrix));
console.log("-----------------------------------------------"); 
// Task 4

let cortg: [string, number, boolean];

function describe(m: [string, number, boolean?]): string {
    const [name, age, status] = m;
    return `${name}, ${age} лет, статус: ${status ?? "не указан"}`;
}
console.log("TASK 4"); 
console.log(describe(["Алиса", 30, true]));
console.log("-----------------------------------------------"); 

// Task 5

type Book = {
    title: string,
    author: string,
    year: number,
    readonly isbn: string,
    genre?: string
};

const book: Book = {
    title: "Название 1",
    author: "Автор 1",
    year: 1961,
    isbn: "978-5-04-123456-7",
    genre: "fantasy",
};

book.isbn = "новый-isbn";

// Task 6

function createUser(name: string, age: number, email?: string): object{
    return {
        name: name,
        age: age,
        email: email ?? "не указан",
    };
}
console.log(createUser("Алиса", 30, "alice@mail.com"));
console.log(createUser("Боб", 25));

// Task 7

let FilledArray:number[] = [1,3,4,5,2,1,676,8,9];
let NotFilledArray: number[] = [];

function max(num: number[]){
    if (num.length === 0) {
        return -Infinity;
      }
    let max = -Infinity;
    for (const n of num){
        if (n > max){
            max = n;
        }
    }
    return max;
}

console.log(max(FilledArray));   
console.log(max(NotFilledArray));  
console.log(max([-5, -3, -10]));   