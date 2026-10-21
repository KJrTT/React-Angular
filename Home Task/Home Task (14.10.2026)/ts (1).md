



## 1. Установка и настройка

```bash
# Глобальная установка
npm install -g typescript

# Проверка версии
tsc --version

# Инициализация проекта
tsc --init  # создаст tsconfig.json

# Компиляция файла
tsc app.ts   # создаст app.js
```

### Пример tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2020",        // в какую версию JS компилировать
    "module": "commonjs",       // модульная система
    "strict": true,             // включает все строгие проверки
    "esModuleInterop": true,    // совместимость CommonJS/ESM
    "skipLibCheck": true,       // пропустить проверку .d.ts
    "outDir": "./dist",         // куда складывать .js
    "rootDir": "./src"          // откуда брать .ts
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

---

## 2. Базовые типы

```typescript
// Примитивы
let num: number = 42;             // числа (целые, дробные)
let str: string = "hello";        // строки
let bool: boolean = true;         // true / false
let big: bigint = 100n;           // большие целые числа
let sym: symbol = Symbol("id");   // уникальные идентификаторы

// Специальные типы
let nothing: null = null;         // только null
let undef: undefined = undefined; // только undefined
let anyVal: any = "что угодно";   // отключает проверку типов
let unknownVal: unknown = 5;      // безопасный any (нужна проверка)
let neverVal: never;              // тип для функций, которые никогда не возвращают
let voidVal: void = undefined;    // для функций без возврата
```

### Разница `any` vs `unknown`
```typescript
let a: any = "text";
a.toFixed(); // ✅ компилируется, но упадёт в рантайме

let u: unknown = "text";
// u.toFixed(); // ❌ ошибка — нужно сначала проверить тип
if (typeof u === "string") {
  u.toUpperCase(); // ✅ теперь безопасно
}
```

---

## 3. Массивы, кортежи, объекты

```typescript
// Массивы
let nums: number[] = [1, 2, 3];
let strs: Array<string> = ["a", "b"]; // альтернативный синтаксис
let matrix: number[][] = [[1, 2], [3, 4]]; // двумерный

// Кортежи (tuple) — фиксированная длина и типы
let tuple: [string, number] = ["age", 25];
// tuple = [25, "age"]; // ❌ ошибка порядка
let optionalTuple: [string, number?] = ["a"]; // опциональный элемент

// Объекты — через type или interface
type User = {
  name: string;
  age: number;
  email?: string;       // опциональное свойство
  readonly id: number;  // только для чтения
};

const user: User = { name: "Иван", age: 30, id: 1 };
// user.id = 2; // ❌ ошибка — readonly
```

---

## 4. Функции

```typescript
// Параметры и возвращаемый тип
function add(a: number, b: number): number {
  return a + b;
}

// Стрелочная функция
const multiply = (a: number, b: number): number => a * b;

// Опциональные и дефолтные параметры
function greet(name: string, title?: string, greeting = "Привет"): string {
  return `${greeting}, ${title ? title + " " : ""}${name}`;
}

// Rest-параметры
function sum(...nums: number[]): number {
  return nums.reduce((acc, n) => acc + n, 0);
}

// Перегрузки (overloads)
function format(x: string): string;
function format(x: number): string;
function format(x: string | number): string {
  return typeof x === "string" ? x.toUpperCase() : x.toFixed(2);
}
```

---

## 5. Union и Intersection

```typescript
// Union (|) — либо одно, либо другое
let id: string | number;
id = "abc";  // ✅
id = 123;    // ✅

// Intersection (&) — совмещение типов
type Person = { name: string };
type Employee = { company: string };
type Worker = Person & Employee;
const w: Worker = { name: "Иван", company: "Яндекс" };

// Литеральные типы
type Direction = "up" | "down" | "left" | "right";
let dir: Direction = "up";
// dir = "north"; // ❌
```

---

## 6. Интерфейсы vs Type Aliases

```typescript
// Interface — расширяемый, для объектов и классов
interface Animal {
  name: string;
  makeSound(): void;
}

interface Dog extends Animal {
  breed: string;
}

// Declaration merging — интерфейсы объединяются
interface Animal {
  age: number; // добавится к первому объявлению
}

// Type alias — универсальный, можно для union/примитивов
type ID = string | number;
type Point = { x: number; y: number };

// Расширение через &
type Point3D = Point & { z: number };
```

**Когда что использовать:**
- `interface` — для публичного API, объектов, когда нужна расширяемость.
- `type` — для union, кортежей, примитивов, утилитарных типов.

---

## 7. Классы

```typescript
class Person {
  // Модификаторы доступа
  public name: string;         // доступно везде (по умолчанию)
  private age: number;         // только внутри класса
  protected email: string;     // внутри класса и наследников
  readonly id: number;         // нельзя изменить после инициализации
  static count: number = 0;    // статическое свойство класса

  // Сокращённая инициализация через параметры
  constructor(name: string, age: number, email: string, public city: string) {
    this.name = name;
    this.age = age;
    this.email = email;
    this.id = ++Person.count;
  }

  greet(): string {
    return `Привет, я ${this.name}`;
  }
}

class Employee extends Person {
  constructor(name: string, age: number, email: string, city: string,
              public company: string) {
    super(name, age, email, city); // обязательно вызвать super
  }

  // Переопределение метода
  override greet(): string {
    return `${super.greet()} и работаю в ${this.company}`;
  }
}

// Абстрактные классы — нельзя создать экземпляр
abstract class Shape {
  abstract area(): number;      // должны реализовать наследники
  describe(): string {
    return `Площадь: ${this.area()}`;
  }
}

class Circle extends Shape {
  constructor(private r: number) { super(); }
  area(): number { return Math.PI * this.r ** 2; }
}

// Реализация интерфейса
interface Serializable {
  serialize(): string;
}

class Data implements Serializable {
  constructor(private value: string) {}
  serialize(): string { return JSON.stringify(this.value); }
}
```

---

## 8. Дженерики (Generics)

```typescript
// Функция с дженериком
function identity<T>(arg: T): T {
  return arg;
}
identity<string>("hi"); // явно
identity(42);           // выведется number

// Дженерик с ограничением
function getLength<T extends { length: number }>(arg: T): number {
  return arg.length;
}
getLength("abc");   // ✅
getLength([1, 2]);  // ✅
// getLength(5);    // ❌ у числа нет length

// Несколько параметров
function pair<K, V>(key: K, value: V): [K, V] {
  return [key, value];
}

// Дженерик-интерфейс
interface Box<T> {
  value: T;
}
const b: Box<number> = { value: 10 };

// Дженерик-класс
class Stack<T> {
  private items: T[] = [];
  push(item: T): void { this.items.push(item); }
  pop(): T | undefined { return this.items.pop(); }
}
const s = new Stack<number>();
s.push(1);

// Значение по умолчанию для типа
type Response<T = string> = { data: T };
const r: Response = { data: "ok" }; // T = string
```

---

## 9. Утилитарные типы (Utility Types)

```typescript
interface Todo {
  id: number;
  title: string;
  done: boolean;
}

// Partial<T> — все свойства опциональны
type PartialTodo = Partial<Todo>;

// Required<T> — все обязательны
type RequiredTodo = Required<PartialTodo>;

// Readonly<T> — все только для чтения
type ReadonlyTodo = Readonly<Todo>;

// Pick<T, K> — выбрать указанные свойства
type TodoPreview = Pick<Todo, "id" | "title">;

// Omit<T, K> — исключить свойства
type TodoWithoutId = Omit<Todo, "id">;

// Record<K, V> — объект с ключами K и значениями V
type Dictionary = Record<string, number>;

// ReturnType<T> — тип возвращаемого значения функции
function makeUser() { return { name: "Иван", age: 30 }; }
type UserType = ReturnType<typeof makeUser>;

// Parameters<T> — кортеж типов параметров
type Params = Parameters<typeof makeUser>; // []

// Awaited<T> — разворачивает Promise
type P = Awaited<Promise<number>>; // number

// Exclude / Extract
type T1 = Exclude<"a" | "b" | "c", "a">;       // "b" | "c"
type T2 = Extract<"a" | "b" | "c", "a" | "b">; // "a" | "b"

// NonNullable<T> — убирает null и undefined
type T3 = NonNullable<string | null | undefined>; // string
```

---

## 10. Type Guards (защита типов)

```typescript
// typeof
function pad(x: string | number) {
  if (typeof x === "string") return x.padStart(2);
  return x.toFixed(2); // TS сузил тип до number
}

// instanceof
class Cat { meow() {} }
class Dog { bark() {} }
function speak(pet: Cat | Dog) {
  if (pet instanceof Cat) pet.meow();
  else pet.bark();
}

// in — проверка наличия свойства
type Fish = { swim: () => void };
type Bird = { fly: () => void };
function move(a: Fish | Bird) {
  if ("swim" in a) a.swim();
  else a.fly();
}

// Пользовательские type guards (предикаты)
function isString(v: unknown): v is string {
  return typeof v === "string";
}

// Assertion functions
function assertIsNumber(v: unknown): asserts v is number {
  if (typeof v !== "number") throw new Error("Не число");
}
```

---

## 11. Enums

```typescript
// Числовой enum
enum Status {
  Pending,    // 0
  Active,     // 1
  Done,       // 2
}
let s: Status = Status.Active;

// С явными значениями
enum Code {
  OK = 200,
  NotFound = 404,
  Error = 500,
}

// Строковый enum
enum Role {
  Admin = "ADMIN",
  User = "USER",
}

// const enum — инлайнится при компиляции (быстрее, но без реверс-маппинга)
const enum Dir { Up, Down }

// Часто вместо enum используют union типов:
type Status2 = "pending" | "active" | "done";
```

---

## 12. Модули

```typescript
// math.ts — экспорт
export const PI = 3.14;
export function add(a: number, b: number) { return a + b; }
export default class Calculator { /* ... */ }

// app.ts — импорт
import Calc, { PI, add } from "./math";
import * as MathUtils from "./math"; // namespace-импорт
import type { SomeType } from "./types"; // только тип (стирается)
```

---

## 13. Асинхронность и Promises

```typescript
// Promise<T>
function fetchUser(id: number): Promise<{ name: string }> {
  return fetch(`/users/${id}`).then(r => r.json());
}

// async/await
async function loadUser(id: number): Promise<void> {
  try {
    const user = await fetchUser(id);
    console.log(user.name);
  } catch (e) {
    // e имеет тип unknown (при strict)
    if (e instanceof Error) console.error(e.message);
  }
}

// Типизация Promise.all
const [a, b] = await Promise.all([
  Promise.resolve(1),
  Promise.resolve("str"),
]); // a: number, b: string
```

---

## 14. Декораторы (экспериментальная фича)

```typescript
// Требуется "experimentalDecorators": true в tsconfig
function Log(target: any, key: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(`Вызов ${key} с`, args);
    return original.apply(this, args);
  };
}

class Service {
  @Log
  doWork(x: number) { return x * 2; }
}
```

---

## 15. Полезные приёмы

```typescript
// satisfies — проверка соответствия без изменения типа
const config = {
  host: "localhost",
  port: 8080,
} satisfies Record<string, string | number>;
// config.host имеет тип string (а не string|number)

// keyof и typeof
type UserKeys = keyof User;             // "name" | "age" | "email" | "id"
type UserType = typeof user;            // тип переменной

// Mapped types
type Optional<T> = { [K in keyof T]?: T[K] };
type Getters<T> = { [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K] };

// Template literal types
type EventName = `on${"Click" | "Focus"}`; // "onClick" | "onFocus"

// Conditional types
type IsString<T> = T extends string ? true : false;
type R = IsString<"hi">; // true

// infer — вывод типа внутри условия
type ElementType<T> = T extends (infer U)[] ? U : never;
type E = ElementType<number[]>; // number
```

---

## 16. Строгий режим и частые ошибки

```typescript
// strictNullChecks — null и undefined не присваиваются другим типам
let name: string = null; // ❌ при strict
let name2: string | null = null; // ✅

// noImplicitAny — запрет неявных any
function fn(x) {} // ❌ ошибка при strict
function fn2(x: number) {} // ✅

// strictPropertyInitialization — свойства класса должны быть инициализированы
class A {
  x: number; // ❌
  y: number = 0; // ✅
  z!: number; // ✅ (assertion: инициализирую позже)
}

// Оператор ! (non-null assertion)
const el = document.getElementById("app")!; // "точно не null"

// Оператор ?. (optional chaining)
const len = user?.email?.length; // undefined, если email нет

// Оператор ?? (nullish coalescing — только для null/undefined)
const val = input ?? "default";
// в отличие от ||, не срабатывает на 0, "", false
```

---

## 17. Работа с DOM

```typescript
// Типизация элементов
const input = document.querySelector<HTMLInputElement>("#name");
if (input) input.value = "Привет";

// События
button.addEventListener("click", (e: MouseEvent) => {
  console.log((e.target as HTMLButtonElement).textContent);
});

// Типизация обработчиков
const handler: EventListener = (e) => { /* ... */ };
```

---

## 18. Частые паттерны

```typescript
// Discriminated Union — размеченное объединение
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; side: number }
  | { kind: "rect"; w: number; h: number };

function area(s: Shape): number {
  switch (s.kind) {
    case "circle": return Math.PI * s.radius ** 2;
    case "square": return s.side ** 2;
    case "rect": return s.w * s.h;
  }
}

// Result тип вместо исключений
type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E };

function parse(s: string): Result<number> {
  const n = Number(s);
  return isNaN(n) ? { ok: false, error: new Error("NaN") } : { ok: true, value: n };
}
```