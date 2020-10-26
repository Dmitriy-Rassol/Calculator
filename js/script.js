'use strict';

const calculate = document.getElementById('start');
const addIncomeBtn = document.getElementsByTagName('button')[0];
const addExpensesBtn = document.getElementsByTagName('button')[1];
const checkDeposit = document.querySelector('#deposit-check');
const additionalIncomeItem = document.querySelectorAll('.additional_income-item');
const budgetMonthValue = document.getElementsByClassName('budget_month-value');
const budgetDayValue = document.getElementsByClassName('budget_day-value');
const expensesMonthValue = document.getElementsByClassName('expenses_month-value');
const addIncomeValue = document.getElementsByClassName('additional_income-value');
const addExpensesValue = document.getElementsByClassName('additional_expenses-value');
const incomePeriodValue = document.getElementsByClassName('income_period-value');
const targetMonthValue = document.getElementsByClassName('target_month-value');
const salaryAmount = document.querySelector('.salary-amount');
const incomeTitle = document.querySelector('.income-title');
const incomeAmount = document.querySelector('.income-amount');
const expensesTitle = document.querySelector('.expenses-title');
const expensesAmount = document.querySelector('.expenses-amount');
const addExpensesItem = document.querySelector('.additional_expenses-item');
const targetAmount = document.querySelector('.target-amount');
const periodSelect = document.querySelector('.period-select');

console.log(calculate);
console.log(addIncomeBtn);
console.log(addExpensesBtn);
console.log(checkDeposit);
console.log(additionalIncomeItem);
console.log(budgetMonthValue);
console.log(budgetDayValue);
console.log(expensesMonthValue);
console.log(addIncomeValue);
console.log(addExpensesValue);
console.log(incomePeriodValue);
console.log(targetMonthValue);
console.log(salaryAmount);
console.log(incomeTitle);
console.log(incomeAmount);
console.log(expensesTitle);
console.log(expensesAmount);
console.log(addExpensesItem);
console.log(targetAmount);
console.log(periodSelect);


let money,
    start = function () {
    
    do {
       money = prompt('Ваш месячный доход?', 50000);
    }
  
    while (isNaN(money) || money === '' || money === null);

    console.log('Бюджет: ' + money + '');
    return money;
};

//start();

let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    deposit: false,
    percentDeposit: 0,
    moneyDeposite: 0,
    mission: 150000,
    period: 0,
    asking: function() {

        if (confirm('Есть ли у вас дополнительный заработок?')) {
            let itemIncome;
            let cashIncome;

            do {
                itemIncome = prompt('Какой у вас дополнительный доход?', 'Таксую');
            }
            while(!isNaN(itemIncome) || itemIncome === '' || itemIncome === null);

            do {
                cashIncome = +prompt('Сколько вы на этом зарабатываете?', 10000).trim();
            }
            while (isNaN(cashIncome) || cashIncome === '' || cashIncome === null);
            this.income[itemIncome] = cashIncome;
        }

        do {
            this.addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Кредит, квартплата');
            this.addExpenses = this.addExpenses.split(', ').map(word => word[0].toUpperCase() + word.slice(1)).join(', ');
        }
        while(!isNaN(this.addExpenses) || this.addExpenses === '' || this.addExpenses === null);
        
        console.log('Возможные расходы за рассчитываемый период: ' + this.addExpenses + '');   
        this.deposit = confirm('Есть ли у вас депозит в банке?');
        console.log('Наличие депозита: ' + this.deposit + '');
    },
    getExpensesMonth: function () {
        let sumExpenses;
        let expensesQuestion;
        for ( let i = 0; i <2; i++) { 

            do {
                expensesQuestion = prompt('Введите обязательную статью расходов');
                if (expensesQuestion === Object.keys(this.expenses).join()) {
                    alert("Данная статья расходов уже записана!");
                }
            }
            while (!isNaN(expensesQuestion) || expensesQuestion === '' ||  expensesQuestion === Object.keys(this.expenses).join());
            
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
    },
    getInfoDeposite: function() {
        if(this.deposit) {
            this.percentDeposit = prompt('Какой годовой процент?', '10');
            this.moneyDeposite = prompt('Какая сумму заложена?', 10000);
        }
    },
    calcSavedMoney: function() {
        return this.budgetMonth * this.period;
    }
};

// appData.asking();
// appData.getBudget();
// appData.getStatusTargetMounth();
// appData.getStatusIncome();
// appData.appProgram();

