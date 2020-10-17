'use strict';
let money = 50000, 
    income = 'Фриланс',
    addExpenses = 'Интернет, Такси, Коммуналка', 
    deposit = true, 
    mission = 150000, 
    period = 5,
    budgetDay = money / 30;

let expenses1 = '',
    amount1 = 0,
    expenses2 = '',
    amount2 = 0;

let showTypeOf = function (data) {
    console.log(data, typeof(data));
}

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

let questionIncome = prompt('Ваш месячный доход?', 0),
    questionCosts = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Квартплата, проездной, кредит'),
    questionDeposit = confirm('Есть ли у вас депозит в банке?');

money = questionIncome;
addExpenses = questionCosts.toLowerCase().split(',');
deposit = questionDeposit;

console.log('Возможные расходы: ' + addExpenses);

for (let i = 1; i<=2; i++) {
    let questionExpenses = prompt('Введите обязательную статью расходов');
    let questionAmount = prompt('Во сколько это обойдется?');
        
    if (i === 1) {
        expenses1 = questionExpenses;
        amount1 = questionAmount;
        console.log(expenses1, amount1 + ' руб.');
    } else {
        expenses2 = questionExpenses;
        amount2 = questionAmount;
        console.log(expenses2, amount2 + ' руб.');
    }
}

const getExpensesMonth = function () {
    return (Number(amount1) + Number(amount2));
}

const getAccumulatedMonth = function () {
    return (Number(money - amount1 - amount2));
}

const accumulatedMonth = getAccumulatedMonth();

const getTargetMonth = function () {
    return (Math.ceil(mission / accumulatedMonth));
}

const getAccumulatedDay = function () {
    budgetDay =  Math.floor(accumulatedMonth / 30);
    return budgetDay;
}

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

console.log('Сумма всех обязательных расходов: ' + getExpensesMonth() + ' руб.');
console.log('Накопления за месяц: ' + accumulatedMonth + ' руб.');
console.log('Месяцев до достижения цели:' + getTargetMonth() + '');
console.log('Бюджет на день: ' + getAccumulatedDay() + ' руб.');
console.log(getStatusIncome(getAccumulatedDay()));

