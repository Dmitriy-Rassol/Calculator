'use strict';

let start = document.getElementById('start'),
    cancel = document.getElementById('cancel'),
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
    expensesItems = document.querySelectorAll('.expenses-items'),
    addExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    incomeItems = document.querySelectorAll('.income-items'),
    inputText = document.querySelectorAll('input[type="text"]'),
    data = document.querySelector('.data');

        
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
        this.budget = +salaryAmount.value;
        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();
        this.calcPeriod();
        this.showResult();
        start.style.display = 'none';
        cancel.style.display = 'block';

        inputText.forEach(item => {
            item.setAttribute('disabled', true);
        });
                 
        addIncomeBtn.setAttribute('disabled', true);
        addExpensesBtn.setAttribute('disabled', true); 
        depositCheck.setAttribute('disabled', true);
        periodSelect.setAttribute('disabled', true); 
    },
    reset: function () {
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.income = {};
        this.incomeMonth = 0;
        this.addIncome = [];
        this.expenses = {};
        this.addExpenses = [];
        this.expensesMonth = 0;
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposite = 0;

        start.style.display = 'block';
        cancel.style.display = 'none';
        start.setAttribute('disabled', true);

        periodSelect.value = 1;
        periodAmount.innerHTML = periodSelect.value;
        inputText = document.querySelectorAll("input[type='text']");
        inputText.forEach(item => {
            item.removeAttribute('disabled');
            item.value = '';
        });   

        for (let i = 0; i < incomeItems.length; i++) {
            if (i !== 0) {
                incomeItems[i].remove();
                incomeItems[i].innerHTML ='';
                addIncomeBtn.style.display = 'block';
            }
        }

        for (let i = 0; i < expensesItems.length; i++) {
            if (i !== 0) {
                expensesItems[i].remove(); 
                expensesItems[i].innerHTML = '';               
                addExpensesBtn.style.display = 'block';
            }
        }

        addIncomeBtn.removeAttribute('disabled');
        addExpensesBtn.removeAttribute('disabled'); 
        depositCheck.removeAttribute('disabled');
        periodSelect.removeAttribute('disabled'); 
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
        for (let key in this.income) {
            this.incomeMonth += +this.income[key];
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
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        addExpensesValue.value = this.addExpenses.map(word => word[0].toUpperCase() + word.slice(1)).join(', ');
        addIncomeValue.value = this.addIncome.map(word => word[0].toUpperCase() + word.slice(1)).join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = this.calcPeriod();
        periodSelect.addEventListener('mousemove', function(event){
        incomePeriodValue.value = appData.budgetMonth * event.target.value;
        });
    },
    getExpensesMonth: function () {
        for (let expense in this.expenses) {
            this.expensesMonth += +this.expenses[expense];
        }
        console.log('Сумма всех обязательных расходов: ' + this.expensesMonth  + ' руб.');
        return this.expensesMonth;
    },
    getBudget: function () {
        appData.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        appData.budgetDay =  Math.floor(this.budgetMonth / 30); 
    },
    getTargetMonth: function () {
        return targetAmount.value / this.budgetMonth;
        
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
        for (let data in this) {
            console.log(data, this[data]);
        }
    },
    getInfoDeposite: function() {
        if(this.deposit) {
            appData.percentDeposit = prompt('Какой годовой процент?', '10');
            appData.moneyDeposite = prompt('Какая сумму заложена?', 10000);
        }
    },
    calcPeriod: function() {
        return this.budgetMonth * periodSelect.value;
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
    },
    regExp: function(event) {
        const target = event.target;
        if (target.getAttribute('placeholder') === 'Сумма') {
            target.value = target.value.replace(/[^0-9]/g, '');
        }
    }
};

start.addEventListener('click', appData.start.bind(appData));
cancel.addEventListener('click', appData.reset.bind(appData));
salaryAmount.addEventListener('keyup', appData.getStartBan);
addExpensesBtn.addEventListener('click', appData.addExpensesBlock);
addIncomeBtn.addEventListener('click', appData.addincomeBlock);
periodSelect.addEventListener('input', appData.getPeriodSelect);
data.addEventListener('keyup', appData.regExp);
