#include <iostream>
#include <windows.h>
#include <string> 
#include <cmath>

using namespace std;

string CheckNumber(int number) {
    if (number > 0) return { "положительное" };
    else if (number < 0) return { "отрицательное" };
    else return { "равно нулю"};
}


string MaxNumber(int number_1, int number_2) {
    if (number_1 == number_2) return { "Числа равны" };
    return (number_1 > number_2) ? "Первое число больше" : "Второе число больше";
    // if (number_1 > number_2){return {"Первое число больше"}};
    // else return {"Второе число больше"};
}

string NumberOddorEven(int number) {
    if (number % 2 == 0) {
        return { "Число четное" };
    }
    else return { "Число нечетное" };
}

string ToAssignAGrade(int point) {
    if (point > 100 or point < 0) return { "Оценка ниже нуля или выше 100" };
    if(point >= 90) return { "Оценка -- A" };
    else if (point >= 80) return { "Оценка -- B" };
    else if (point >= 70) return { "Оценка -- C" };
    else if (point >= 60) return { "Оценка -- A" };
    else return { "Оценка -- F" };
}

string GetMonthName(int month) {
    switch (month) {
    case 1:  return "Январь";
    case 2:  return "Февраль";
    case 3:  return "Март";
    case 4:  return "Апрель";
    case 5:  return "Май";
    case 6:  return "Июнь";
    case 7:  return "Июль";
    case 8:  return "Август";
    case 9:  return "Сентябрь";
    case 10: return "Октябрь";
    case 11: return "Ноябрь";
    case 12: return "Декабрь";
    default: return "Ошибка: некорректный номер месяца!";
    }
}

string CheckChar(char ch) {
    if (!isalpha(static_cast<unsigned char>(ch))) {
        return "Не буква";
    }

    switch (ch) {
    case 'a':
    case 'A':
    case 'e':
    case 'E':
    case 'i':
    case 'I':
    case 'o':
    case 'O':
    case 'u':
    case 'U':
        return "Гласная буква";
    default:
        return "Согласная буква";
    }
}

string CheckLeapYear(int year) {
    if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) {
        return to_string(year) + " — високосный год";
    }
    else {
        return to_string(year) + " — не високосный год";
    }
}

int MaxNumbers(int num_1, int num_2, int num_3) {

    if (num_1 > num_2) {
        if (num_1 > num_3) {
            return num_1;
        }
        else {
            return num_3;
        }
    }
    else {
        if (num_2 > num_3) {
            return num_2;
        }
        else {
            return num_3;
        }
    }
}

int MaxTernary(int num_1, int num_2, int num_3) {
    return (num_1 > num_2)
        ? (num_1 > num_3 ? num_1 : num_3)
        : (num_2 > num_3 ? num_2 : num_3);
}

string CheckDivisibility(int a, int b) {
    if (b != 0 && a % b == 0) {
        return to_string(a) + " делится на " + to_string(b) + " нацело";
    }
    else if (b == 0) {
        return "Ошибка: деление на ноль невозможно";
    }
    else {
        return to_string(a) + " не делится на " + to_string(b) + " нацело";
    }
}

string CompareDoubles(double a, double b) {
    if (fabs(a - b) < 1e-9) {
        return "Числа равны";
    }
    else if (a > b) {
        return "Первое число больше (" + to_string(a) + " > " + to_string(b) + ")";
    }
    else {
        return "Второе число больше (" + to_string(b) + " > " + to_string(a) + ")";
    }
}

string CheckDayOfWeek(int day) {
    switch (day) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
        return "Рабочий день";
    case 6:
    case 7:
        return "Выходной день";
    default:
        return "Ошибка: некорректный номер дня недели!";
    }
}


string Calculate(char op, double a, double b) {
    switch (op) {
    case '+':
        return "Результат: " + to_string(a + b);
    case '-':
        return "Результат: " + to_string(a - b);
    case '*':
        return "Результат: " + to_string(a * b);
    case '/':
        if (fabs(b) < 1e-9) {
            return "Ошибка: деление на ноль!";
        }
        return "Результат: " + to_string(a / b);
    default:
        return "Ошибка: некорректная операция!";
    }
}

string CheckDiscount(int age, int hasStudentCard) {
    if (age >= 65 || (hasStudentCard == 1 && age < 25)) {
        return "Скидка положена";
    }
    else {
        return "Скидка не положена";
    }
}

string DescribeNumber(int n) {
    if (n == 0) {
        return "ноль";
    }
    return (n > 0)
        ? (n % 2 == 0 ? "положительное чётное" : "положительное нечётное")
        : (n % 2 == 0 ? "отрицательное чётное" : "отрицательное нечётное");
}

string CompareSignedAndUnsigned(int x, unsigned int y) {
    bool naiveResult = (x < y);

    bool safeResult = (static_cast<long long>(x) < static_cast<long long>(y));

    string output = "Наивное сравнение (x < y): " + string(naiveResult ? "true" : "false") + "\n";
    output += "Корректное сравнение (long long): " + string(safeResult ? "true" : "false");

    if (naiveResult != safeResult) {
        output += "\nВнимание: обнаружена ошибка неявного преобразования типов!";
    }

    return output;
}
int main()
{
    SetConsoleCP(CP_UTF8);
    SetConsoleOutputCP(CP_UTF8);

    // Задача 1 (Пользователь вводит целое число. Выведите, положительное оно, отрицательное или ноль.)
    /*int number;
    cout << "Введите целое число: ";
    cin >> number;
    string text = CheckNumber(number);
    cout << text;*/

    // Задача 2 (Пользователь вводит два числа a и b. Выведите большее из них через тернарный оператор, затем — через if-else)

    /*int a, b;
    cout << "Введите первое число: " ;
    cin >> a;
    cout << "Введите второе число:";
    cin >> b;
    string text = MaxNumber(a, b);
    cout << text; */

    // Задача 3 (Пользователь вводит число. Определите, чётное оно или нечётное. Используйте % и if-else.)

    /*int number;
    cout << "Введите число: ";
    cin >> number;
    string text = NumberOddorEven(number);
    cout << text;*/

    // Задача 4 (Пользователь вводит баллы (0–100). Выставьте оценку по шкале: ≥90 → A, ≥80 → B, ≥70 → C, ≥60 → D, иначе F)

    /*int point;
    cout << "Введите кол-во баллов: ";
    cin >> point;
    string text = ToAssignAGrade(point);
    cout << text;*/

    // Задача 5 (Пользователь вводит номер месяца (1–12). Выведите название месяца через switch с break. Обработайте некорректный номер через default.)

    /*int month;
    cout << "Введите номер месяца (1–12): ";
    cin >> month;

    string result = GetMonthName(month);
    cout << result << endl;*/

    // Задача 6 (Упражнение 6. Пользователь вводит один символ. Через switch определите: это гласная (a,e,i,o,u в обоих регистрах), согласная (остальные буквы) или не буква. Используйте проваливание для объединения случаев.)

    /*char symbol;
    cout << "Введите один символ: ";
    cin >> symbol;

    cout << CheckChar(symbol) << endl;*/

    // Задание 7 (Упражнение 7. Пользователь вводит год. Определите, високосный ли он: делится на 4, но не на 100, ИЛИ делится на 400. Используйте логические операторы &&, ||, != и %.)

    /*int year;
    cout << "Введите год: ";
    cin >> year;

    cout << CheckLeapYear(year) << endl;*/


    // Задание 8 (Пользователь вводит три числа. Найдите максимум из трёх. Решите двумя способами: (а) вложенными if-else, (б) вложенными тернарными операторами.)
    /*int number_1, number_2, number_3;
    cout << "Введите первое число: ";
    cin >> number_1;
    cout << "Введите второе число: ";
    cin >> number_2;
    cout << "Введите третье число: ";
    cin >> number_3;

    int maxnumber = MaxNumbers(number_1, number_2, number_3);
    int maxternar = MaxTernary(number_1, number_2, number_3);
    cout << "Через if + else if " << maxnumber << endl;
    cout << "Через тернарный " << maxnumber << endl;*/

    // Задание 9 (Упражнение 9. Пользователь вводит a и b (целые). Проверьте, делится ли a на b нацело, без риска деления на ноль: используйте короткое замыкание b != 0 && a % b == 0. Выведите результат.)

    /*int a, b;
    cout << "Введите два целых числа (a и b): ";
    cin >> a >> b;

    cout << CheckDivisibility(a, b) << endl;*/

    // Задание 10 (Пользователь вводит два double. Сравните их: если |a - b| < 1e-9, выведите «равны», иначе — какое больше. (Нужен <cmath> и std::fabs.))

    /*double a, b;
    cout << "Введите два дробных числа (double): ";
    cin >> a >> b;

    cout << CompareDoubles(a, b) << endl;*/

    // Задание 11 (Пользователь вводит номер дня недели (1–7). Через switch выведите, рабочий это день или выходной. Сгруппируйте case 1..5 и case 6..7 через проваливание. Некорректный номер — через default.)

    /*int day;
    cout << "Введите номер дня недели (1–7): ";
    cin >> day;

    cout << CheckDayOfWeek(day) << endl;*/

    // Задание 12 ( Пользователь вводит символ операции (+ - * /) и два числа. Выполните операцию через switch. Для / проверьте деление на ноль через std::fabs(b) < 1e-9. Некорректную операцию обработайте в default.)
    //
    /*char op;
    double a, b;

    cout << "Введите символ операции (+, -, *, /): ";
    cin >> op;

    cout << "Введите два числа: ";
    cin >> a >> b;

    cout << Calculate(op, a, b) << endl;*/

    // Задание 13 (Пользователь вводит возраст и наличие студенческого билета (1/0). Скидка даётся, если возраст ≥ 65 ИЛИ (студент И возраст < 25). Выведите, положена ли скидка. Используйте && и || со скобками.)

    /*int age;
    int isStudent;

    cout << "Введите ваш возраст: ";
    cin >> age;

    cout << "Есть ли у вас студенческий билет? (1 — да, 0 — нет): ";
    cin >> isStudent;

    cout << CheckDiscount(age, isStudent) << endl;*/

    // Задание 14 (Пользователь вводит целое число. Определите его знак и чётность одним тернарным оператором, выводящим одну из строк: "положительное чётное", "положительное нечётное", "отрицательное чётное", "отрицательное нечётное", "ноль". Подсказка: вложенные тернарные + отдельная проверка нуля через if.)
    /*int number;
    cout << "Введите целое число: ";
    cin >> number;

    cout << DescribeNumber(number) << endl;*/

    // Задание 15 (Пользователь вводит int x и unsigned int y. Напишите корректное сравнение x < y, приведя оба к long long через static_cast. Сравните с «наивным» x < y и объясните в комментарии, почему результаты могут отличаться при x = -1, y = 1.)
    int x;
    unsigned int y;

    cout << "Введите знаковое целое x (например, -1): ";
    cin >> x;

    cout << "Введите беззнаковое целое y (например, 1): ";
    cin >> y;

    cout << "\n" << CompareSignedAndUnsigned(x, y) << endl;
    
    return 0;
}

