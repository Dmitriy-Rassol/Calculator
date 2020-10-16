'use strict';
let money = 50000, 
    income = 'фриланс',
    addExpenses = 'Интернет, Такси, Коммуналка', 
    deposit = true, 
    mission = 150000, 
    period = 5,
    budgetDay = money / 30;

let expenses1 = '',
    amount1 = 0,
    expenses2 = '',
    amount2 = 0;

const lessonTwo = function () {
    console.log(typeof money, typeof income, typeof deposit);

    console.log(addExpenses.length);
    console.log('Период равен ' + period + ' месяцев'); 
    console.log('Цель заработать ' + mission + ' рублей');
    console.log(addExpenses.toLowerCase().split(','));
    console.log(budgetDay);
}

const lessonThree = function () {
    let questionIncome = prompt('Ваш месячный доход?', 0);
    let questionCosts = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Квартплата, проездной, кредит');
    let questionDeposit = confirm('Есть ли у вас депозит в банке?');

    money = questionIncome;
    addExpenses = questionCosts.toLowerCase().split(',');
    deposit = questionDeposit;

    console.log(money, addExpenses, deposit);

    for (let i = 1; i<=2; i++) {
        let questionExpenses = prompt('Введите обязательную статью расходов');
        let questionAmount = prompt('Во сколько это обойдется?');
        
        if (i === 1) {
            expenses1 = questionExpenses;
            amount1 = questionAmount;
            console.log(expenses1, amount1);
        } else {
            expenses2 = questionExpenses;
            amount2 = questionAmount;
            console.log(expenses2, amount2);
        }
    }

    let budgetMonth = Number(money - amount1 - amount2);
    console.log('Бюджет на месяц, учитывая обязательные расходы:' + budgetMonth + '');

    let missionMonth = Math.ceil(mission / budgetMonth);
    console.log('Для достижения цели понадобится:' + missionMonth + '');

    budgetDay =  Math.floor(budgetMonth / 30);
    console.log('Бюджет на день: ' + budgetDay + '');

    if (budgetDay >= 1200) {
        console.log('У вас высокий уровень дохода');
    }
    else if (budgetDay >= 600 && budgetDay < 1200) {
        console.log('У вас средний уровень дохода');
    }
    else if (budgetDay < 600 && budgetDay >= 0) {
        console.log('К сожалению у вас уровень дохода ниже среднего');
    }
    else if (budgetDay < 0) {
        console.log('Что то пошло не так');
    }

}

const init = () => {
    lessonTwo();
    lessonThree();
}

init();