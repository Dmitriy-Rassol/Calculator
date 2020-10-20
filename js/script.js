'use strict';

let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

let money = 50000, 
    income = 'Фриланс',
    addExpenses = 'Интернет, Такси, Коммуналка', 
    deposit = true, 
    mission = 150000, 
    period = 5,
    budgetDay = money / 30;

let expenses = [];

let start = function () {
    
    do {
        money = prompt('Ваш месячный доход?');
    }
  
    while (!isNumber(money));
}

start();

let showTypeOf = function (data) {
    console.log(data, typeof(data));
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

let questionCosts = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Квартплата, проездной, кредит'),
    questionDeposit = confirm('Есть ли у вас депозит в банке?');

addExpenses = questionCosts.toLowerCase().split(',');
deposit = questionDeposit;

console.log('Возможные расходы: ' + addExpenses);
const getExpensesMonth = function () {
     let sum = 0;
     let result = 0;
    for (let i = 0; i < 2; i++) {
        expenses[i] = prompt('Введите обязательную статью расходов');
       
        do {
            sum = +prompt('Во сколько это обойдется?');
        }
        while (!isNumber(sum));
        result += sum;

        console.log(result);
    } 
        
    console.log(expenses);
    return result;
}

let expensesAmount = getExpensesMonth();

console.log('Сумма всех обязательных расходов: ' + expensesAmount + ' руб.');

const getAccumulatedMonth = function () {
    return money - expensesAmount;
}

const accumulatedMonth = getAccumulatedMonth();

console.log('Накопления за месяц: ' + accumulatedMonth + ' руб.');


const getTargetMonth = function () {
    return (Math.ceil(mission / accumulatedMonth));
}

const getStatusTargetMounth = function () {
    if (getTargetMonth > 0) {
        console.log('Месяцев до достижения цели:' + getTargetMonth() + '');
    } else {
        console.log('Цель не будет достигнута');
    }
   
}

getStatusTargetMounth();

const getAccumulatedDay = function () {
    
    budgetDay =  Math.floor(accumulatedMonth / 30);
    return budgetDay;
}

console.log('Бюджет на день: ' + getAccumulatedDay() + ' руб.');

const getStatusIncome = function (data) {
    if (data >= 1200) {
        return ('У вас высокий уровень дохода');
    }
    else if (data >= 600 && data < 1200) {
        return ('У вас средний уровень дохода');
    }
    else if (data < 600 && data >= 0) {
        return ('К сожалению у вас уровень дохода ниже среднего');
    }
    else if (getAccumulatedDay() < 0) {
        return ('Что то пошло не так');
    }    
}

console.log(getStatusIncome(getAccumulatedDay()));

