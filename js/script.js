'use strict';

let money,
    start = function () {
    
    do {
       money = prompt('Ваш месячный доход?', 50000);
    }
  
    while (isNaN(money) || money === '' || money === null);

    console.log('Бюджет: ' + money + '');
    return money;
};

start();

let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    deposit: false,
    mission: 150000,
    period: 0,
    asking: function() {
        this.addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Кредит, квартплата');
        this.addExpenses = this.addExpenses.toLowerCase().split(',');
        console.log('Возможные расходы за рассчитываемый период: ' + this.addExpenses + '');   
        this.deposit = confirm('Есть ли у вас депозит в банке?');
        console.log('Наличие депозита: ' + this.deposit + '');
    },
    getExpensesMonth: function () {
        let sumExpenses = 0;
        let expensesQuestion = '';
        for ( let i = 0; i <2; i++) { 

            do {
                expensesQuestion = prompt('Введите обязательную статью расходов').trim();
                if (expensesQuestion === Object.keys(this.expenses).join()) {
                    alert("Данная статья расходов уже записана!");
                }
            }
            while (expensesQuestion === '' || expensesQuestion === Object.keys(this.expenses).join());
            

            do {
                sumExpenses = +prompt('Во сколько это обойдется?').trim();
            }
            while (isNaN(sumExpenses) || sumExpenses === '' || sumExpenses === null);
           
            this.expenses[expensesQuestion] = sumExpenses;            
            console.log(this.expenses);
        }
        for (let expense in this.expenses) {
            this.expensesMonth +=this.expenses[expense];
        }
        console.log('Сумма всех обязательных расходов: ' + this.expensesMonth  + ' руб.');
        return this.expensesMonth;
    },
    getBudget: function () {
        this.budgetMonth = money - this.getExpensesMonth();
        console.log('Накопления за месяц: ' +  this.budgetMonth + ' руб.');
        this.budgetDay =  Math.floor(this.budgetMonth / 30); 
        console.log('Бюджет на день: ' + this.budgetDay + ' руб.');
    },
    getTargetMonth: function () {
        this.period = Math.ceil(this.mission / this.budgetMonth);
        return this.period;
    },
    getStatusIncome: function () {
        if (this.budgetDay >= 1200) {
            return console.log('У вас высокий уровень дохода');
        }
        else if (this.budgetDay >= 600 && this.budgetDay < 1200) {
            return console.log('У вас средний уровень дохода');
        }
        else if (this.budgetDay < 600 && this.budgetDay >= 0) {
            return console.log('К сожалению у вас уровень дохода ниже среднего');
        }
        else if (this.budgetDay < 0) {
            return console.log('Что то пошло не так');
        }    
    },
    getStatusTargetMounth: function () {
        if (this.getTargetMonth() > 0) {
            console.log('Месяцев до достижения цели: ' + this.getTargetMonth() + '');
        } else {
            console.log('Цель не будет достигнута');
        }
    },
    appProgram: function() {
        console.log("Наша программа включает в себя данные: ");
        for (let data in appData) {
            console.log(data, appData[data]);
        }
    }
};

appData.asking();
appData.getBudget();
appData.getStatusTargetMounth();
appData.getStatusIncome();
appData.appProgram();

