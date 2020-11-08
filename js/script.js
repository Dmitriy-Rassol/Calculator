'use strict';

let start = document.getElementById('start'),
    cancel = document.getElementById('cancel'),
    btnPlus = document.getElementsByTagName('button'),
    addIncomeBtn = btnPlus[0],
    addExpensesBtn = btnPlus[1],
    depositCheck = document.querySelector('#deposit-check'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    depositBank = document.querySelector('.deposit-bank'),
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

const AppData = function() {
    this.budget = 0;
    this.budgetData = 0;
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
};

AppData.prototype.check = function() {
    if (salaryAmount.value === '' || +salaryAmount.value === 0 ||  isNaN(salaryAmount.value)) {
        start.setAttribute("disabled", true);
    } else {
        start.removeAttribute("disabled");
    }
};

AppData.prototype.start = function () {
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
};

AppData.prototype.reset = function () {
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
    this.moneyDeposit = 0;

    start.style.display = 'block';
    cancel.style.display = 'none';
    depositAmount.style.display = 'none';
    depositPercent.style.display = 'none';
    depositBank.style.display = 'none';
    
    start.setAttribute('disabled', true);

    periodSelect.value = 1;
    periodAmount.innerHTML = periodSelect.value;

    inputText = document.querySelectorAll("input[type='text']");
    inputText.forEach(item => {
        item.removeAttribute('disabled');
        item.value = '';
    });

    incomeItems.forEach((item, index) => {
        if (index > 0) {
            item.parentNode.removeChild(item);
            addIncomeBtn.style.display = 'block';
        }
    });

    expensesItems.forEach((item, index) => {
        if (index > 0) {
            item.parentNode.removeChild(item);
            addExpensesBtn.style.display = 'block';
        }
    });

    addIncomeBtn.removeAttribute('disabled');
    addExpensesBtn.removeAttribute('disabled'); 
    depositCheck.removeAttribute('disabled');
    periodSelect.removeAttribute('disabled');
    depositCheck.checked = false; 
};

AppData.prototype.showResult = function(){
    const _this = this;
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    addExpensesValue.value = this.addExpenses.map(word => word[0].toUpperCase() + word.slice(1)).join(', ');
    addIncomeValue.value = this.addIncome.map(word => word[0].toUpperCase() + word.slice(1)).join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcPeriod();
    periodSelect.addEventListener('mousemove', function(event){
        incomePeriodValue.value = _this.budgetMonth * event.target.value;
    });
};

AppData.prototype.addExpensesBlock = function() {
    const cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, addExpensesBtn);
    expensesItems = document.querySelectorAll('.expenses-items');

    const cloneExpensesItemInput = cloneExpensesItem.querySelectorAll('input');
    cloneExpensesItemInput.forEach(item => {
        item.value = '';
    });

    if (expensesItems.length === 3) {
        addExpensesBtn.style.display = 'none';
    }
};

AppData.prototype.addincomeBlock = function() {
    const cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, addIncomeBtn);
    incomeItems = document.querySelectorAll('.income-items');

    const clonenIcomeItemInput = cloneIncomeItem.querySelectorAll('input');
    clonenIcomeItemInput.forEach(item => {
        item.value = '';
    });

    if (incomeItems.length === 3) {
        addIncomeBtn.style.display = 'none';
    }
};

AppData.prototype.getIncome = function(){
    const _this = this;
    incomeItems.forEach(function(item){
        let incomeItemExpenses = item.querySelector('.income-title').value;
        let incomeCashExpenses = item.querySelector('.income-amount').value;

        if(incomeItemExpenses !== '' && incomeCashExpenses !== '') {
            _this.income[incomeItemExpenses] = incomeCashExpenses;
        }
    });
    for (let key in this.income) {
        this.incomeMonth += +this.income[key];
    }
};

AppData.prototype.getExpenses = function() {
    const _this = this;
    expensesItems.forEach(function(item){
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = +item.querySelector('.expenses-amount').value;

        if(itemExpenses !== '' && cashExpenses !== '') {
            _this.expenses[itemExpenses] = cashExpenses;
        }
    });
};

AppData.prototype.getAddExpenses = function(){
    let addExpenses = addExpensesItem.value.split(',');
    addExpenses.forEach(function(item){
        const _this = this;
        item = item.trim();
        if (item !== '') {
            _this.addExpenses.push(item);
        }
    });
};

AppData.prototype.getAddIncome = function() {
    const _this = this;
    additionalIncomeItem.forEach(function(item){
        let itemValue = item.value.trim();
        if (itemValue !== '') {
            _this.addIncome.push(itemValue);
        }
    });
};

AppData.prototype.getExpensesMonth = function () {
    for (let expense in this.expenses) {
        this.expensesMonth += +this.expenses[expense];
    }
    console.log('Сумма всех обязательных расходов: ' + this.expensesMonth  + ' руб.');
    return this.expensesMonth;
};

AppData.prototype.getBudget = function () {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay =  Math.floor(this.budgetMonth / 30); 
};

AppData.prototype.getTargetMonth = function () {
    return targetAmount.value / this.budgetMonth;
    
};

AppData.prototype.getStatusIncome = function () {
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
};

AppData.prototype.getStatusTargetMounth = function () {
    if (this.getTargetMonth() > 0) {
        console.log('Месяцев до достижения цели: ' + this.getTargetMonth() + '');
    } else {
        console.log('Цель не будет достигнута');
    }
};

AppData.prototype.appProgram = function() {
    console.log("Наша программа включает в себя данные: ");
    for (let data in this) {
        console.log(data, this[data]);
    }
};

AppData.prototype.getInfoDeposite = function() {
    if(depositCheck.checked) {
        this.deposit = true;
        depositAmount.style.display = 'inline-block';
        depositPercent.style.display = 'inline-block';
        depositBank.style.display = 'block';
        this.percentDeposit = depositPercent.value;
        this.moneyDeposit = depositAmount.value ;
    } else if (!depositCheck.checked) {
        this.deposit = false;
        depositAmount.style.display = 'none';
        depositPercent.style.display = 'none';
        depositBank.style.display = 'none';
    }
};

AppData.prototype.calcPeriod = function() {
    return this.budgetMonth * periodSelect.value;
};

AppData.prototype.getPeriodSelect = function() {
    periodAmount.innerHTML = periodSelect.value;
};

AppData.prototype.regExp = function(event) {
    const target = event.target;
    if (target.getAttribute('placeholder') === 'Сумма') {
        target.value = target.value.replace(/[^0-9]/g, '');
    }
};

AppData.prototype.eventListeners = function() {
    start.addEventListener('click', appData.start.bind(appData));
    cancel.addEventListener('click', appData.reset.bind(appData));
    salaryAmount.addEventListener('keyup', appData.check);
    addExpensesBtn.addEventListener('click', appData.addExpensesBlock);
    addIncomeBtn.addEventListener('click', appData.addincomeBlock);
    periodSelect.addEventListener('input', appData.getPeriodSelect);
    depositCheck.addEventListener('click', appData.getInfoDeposite);
    data.addEventListener('keyup', appData.regExp);
};

const appData = new AppData(); 
console.log(appData);
appData.eventListeners();

