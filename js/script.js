'use strict';

let start = document.getElementById('start'),
        btnPlus = document.getElementsByTagName('button'),
        addIncomeBtn = btnPlus[0],
        addExpensesBtn = btnPlus[1],
        depositCheck = document.querySelector('#deposit-check'),
        additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
        budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
        budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
        expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
        addIncomeValue = document.getElementsByClassName('additional_income-value')[0],
        addExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
        incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
        targetMonthValue = document.getElementsByClassName('target_month-value')[0],
        salaryAmount = document.querySelector('.salary-amount'),
        expensesTitle = document.querySelector('.expenses-title'),
        expensesItems = document.querySelectorAll('.expenses-items'),
        addExpensesItem = document.querySelector('.additional_expenses-item'),
        targetAmount = document.querySelector('.target-amount'),
        periodSelect = document.querySelector('.period-select'),
        periodAmount = document.querySelector('.period-amount'),
        incomeItems = document.querySelectorAll('.income-items');
        
start.setAttribute('disabled', true);

let appData = {
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    addExpenses: [],
    expensesMonth: 0,
    deposit: false,
    percentDeposit: 0,
    moneyDeposite: 0,
    start: function () {
        appData.budget = +salaryAmount.value;
        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getBudget();
        appData.calcPeriod();

        appData.showResult();
    },
    addExpensesBlock: function() {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, addExpensesBtn);
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
            addExpensesBtn.style.display = 'none';
        }
    },
    addincomeBlock: function() {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, addIncomeBtn);
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3) {
            addIncomeBtn.style.display = 'none';
        }
    },
    getIncome: function(){
        incomeItems.forEach(function(item){
            let incomeItemExpenses = item.querySelector('.income-title').value;
            let incomeCashExpenses = item.querySelector('.income-amount').value;

            if(incomeItemExpenses !== '' && incomeCashExpenses !== '') {
                appData.income[incomeItemExpenses] = incomeCashExpenses;
            }
        });
        for (let key in appData.income) {
            appData.incomeMonth += +appData.income[key];
        }
    },
    getExpenses: function() {
        expensesItems.forEach(function(item){
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;

            if(itemExpenses !== '' && cashExpenses !== '') {
                appData.expenses[itemExpenses] = cashExpenses;
            }
        });
    },
    getAddExpenses: function(){
        let addExpenses = addExpensesItem.value.split(',');
        addExpenses.forEach(function(item){
            item = item.trim();
            if (item !== '') {
                appData.addExpenses.push(item);
            }
        });
    },
    getAddIncome: function() {
        additionalIncomeItem.forEach(function(item){
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                appData.addIncome.push(itemValue);
            }
        });
    },
    showResult: function(){
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = appData.budgetDay;
        expensesMonthValue.value = appData.expensesMonth;
        addExpensesValue.value = appData.addExpenses.map(word => word[0].toUpperCase() + word.slice(1)).join(', ');
        addIncomeValue.value = appData.addIncome.map(word => word[0].toUpperCase() + word.slice(1)).join(', ');
        targetMonthValue.value = Math.ceil(appData.getTargetMonth());
        incomePeriodValue.value = appData.calcPeriod();
        periodSelect.addEventListener('mousemove', function(event){
            incomePeriodValue.value = appData.budgetMonth * event.target.value;
        });
    },
    getExpensesMonth: function () {
        for (let expense in appData.expenses) {
            appData.expensesMonth += +appData.expenses[expense];
        }
        console.log('Сумма всех обязательных расходов: ' + appData.expensesMonth  + ' руб.');
        return appData.expensesMonth;
    },
    getBudget: function () {
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay =  Math.floor(appData.budgetMonth / 30); 
    },
    getTargetMonth: function () {
         return targetAmount.value / appData.budgetMonth;
        
    },
    getStatusIncome: function () {
        if (appData.budgetDay >= 1200) {
            return console.log('У вас высокий уровень дохода');
        }
        else if (appData.budgetDay >= 600 && appData.budgetDay < 1200) {
            return console.log('У вас средний уровень дохода');
        }
        else if (appData.budgetDay < 600 && appData.budgetDay >= 0) {
            return console.log('К сожалению у вас уровень дохода ниже среднего');
        }
        else if (appData.budgetDay < 0) {
            return console.log('Что то пошло не так');
        }    
    },
    getStatusTargetMounth: function () {
        if (this.getTargetMonth() > 0) {
            console.log('Месяцев до достижения цели: ' + appData.getTargetMonth() + '');
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
        if(appData.deposit) {
            appData.percentDeposit = prompt('Какой годовой процент?', '10');
            appData.moneyDeposite = prompt('Какая сумму заложена?', 10000);
        }
    },
    calcPeriod: function() {
        return appData.budgetMonth * periodSelect.value;
    },
    getPeriodSelect: function() {
        periodAmount.innerHTML = periodSelect.value;
    },
    getStartBan: function() {
        if (salaryAmount.value === '' || isNaN(salaryAmount.value)) {
            start.setAttribute("disabled", true);
        } else {
          start.removeAttribute("disabled");
        }
    }
};
start.addEventListener('click', appData.start);
salaryAmount.addEventListener('keyup', appData.getStartBan);
addExpensesBtn.addEventListener('click', appData.addExpensesBlock);
addIncomeBtn.addEventListener('click', appData.addincomeBlock);
periodSelect.addEventListener('input', appData.getPeriodSelect);
