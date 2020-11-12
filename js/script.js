'use strict';
// Элементы управления
const startBtn = document.getElementById('start'),
    cancelBtn = document.getElementById('cancel'),
    btnPlus = document.getElementsByTagName('button'),
    addIncomeBtn = btnPlus[0],
    addExpensesBtn = btnPlus[1],
    depositCheck = document.getElementById('deposit-check'),
    periodSelect = document.querySelector('.period-select');
// Элементы ввода значений
const depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    depositBank = document.querySelector('.deposit-bank'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    addIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    addExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    addExpensesItem = document.querySelector('.additional_expenses-item'),
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    salaryAmount = document.querySelector('.salary-amount'),
    targetAmount = document.querySelector('.target-amount'),
    periodAmount = document.querySelector('.period-amount'),
    data = document.querySelector('.data');

let expensesItems = document.querySelectorAll('.expenses-items'),
    incomeItems = document.querySelectorAll('.income-items'),
    inputText = document.querySelectorAll('input[type="text"]');

    startBtn.setAttribute('disabled', true);

class AppData {
    constructor() {
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
    }

    check() {
        if (salaryAmount.value === '' || +salaryAmount.value === 0 || isNaN(salaryAmount.value)) {
            startBtn.setAttribute("disabled", true);
        } else {
            startBtn.removeAttribute("disabled");
        }
    }

    start() {
        this.budget = +salaryAmount.value;
        this.getExpensesIncome();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getInfoDeposit(); 
        this.calcPeriod();        
        this.getBudget();
        this.showResult();
        startBtn.style.display = 'none';
        cancelBtn.style.display = 'block';

        inputText.forEach(item => {
            item.setAttribute('disabled', true);
        });

        addIncomeBtn.setAttribute('disabled', true);
        addExpensesBtn.setAttribute('disabled', true);
        depositCheck.setAttribute('disabled', true);
        periodSelect.setAttribute('disabled', true);
        depositBank.setAttribute('disabled', true);

    }

    reset() {
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

        startBtn.style.display = 'block';
        cancelBtn.style.display = 'none';
        depositAmount.style.display = 'none';
        depositPercent.style.display = 'none';
        depositBank.style.display = 'none';

        startBtn.setAttribute('disabled', true);

        periodSelect.value = 1;
        periodAmount.innerHTML = periodSelect.value;

        inputText = document.querySelectorAll("input[type='text']");
        inputText.forEach(item => {
            item.removeAttribute('disabled');
            item.value = '';
        });

        incomeItems.forEach((item, index) => {
            if (index > 0) {
                item.remove(item);
                addIncomeBtn.style.display = 'block';
            }
        });

        expensesItems.forEach((item, index) => {
            if (index > 0) {
                item.remove(item);
                addExpensesBtn.style.display = 'block';
            }
        });

        addIncomeBtn.removeAttribute('disabled');
        addExpensesBtn.removeAttribute('disabled');
        depositCheck.removeAttribute('disabled');
        periodSelect.removeAttribute('disabled');
        depositBank.removeAttribute('disabled');
        depositCheck.checked = false;
    }

    showResult() {
        const _this = this;
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        addExpensesValue.value = this.addExpenses.map(word => word[0].toUpperCase() + word.slice(1)).join(', ');
        addIncomeValue.value = this.addIncome.map(word => word[0].toUpperCase() + word.slice(1)).join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = this.calcPeriod();
        periodSelect.addEventListener('mousemove', function (event) {
            incomePeriodValue.value = _this.budgetMonth * event.target.value;
        });
    }

    addExpensesBlock() {
        const cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, addExpensesBtn);
        for(let i = 0; i < cloneExpensesItem.childNodes.length; i++) {
            cloneExpensesItem.childNodes[i].value = '';
        }

        if (expensesItems.length === 3) {
            addExpensesBtn.style.display = 'none';
        }
    }

    addIncomeBlock() {
        const cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, addIncomeBtn);
        for(let i = 0; i < cloneIncomeItem.childNodes.length; i++) {
            cloneIncomeItem.childNodes[i].value = '';
        }

        if (incomeItems.length === 3) {
            addIncomeBtn.style.display = 'none';
        }
    }

    getExpensesIncome() {
        const count = item => {
            const startStr = item.className.split('-')[0];
            const itemTitle = item.querySelector(`.${startStr}-title`).value;
            const cashAmount = item.querySelector(`.${startStr}-amount`).value;

            if (itemTitle !== '' && cashAmount !== '') {
                this[startStr][itemTitle] = cashAmount;
            }
        };

        incomeItems.forEach(count);
        expensesItems.forEach(count);

        for (const key in this.income) {
            this.incomeMonths += +this.income[key];
        }
    }

    getAddExpenses() {
        const addExpenses = addExpensesItem.value.split(',');
        const _this = this;
        addExpenses.forEach(item => {
            item = item.trim();
            if (item !== '') {
                _this.addExpenses.push(item);
            }
        });
    }

    getAddIncome() {
        const _this = this;
        additionalIncomeItem.forEach(item => {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                _this.addIncome.push(itemValue);
            }
        });
    }

    getExpensesMonth() {
        for (let expense in this.expenses) {
            this.expensesMonth += +this.expenses[expense];
        }
        return this.expensesMonth;
    }

    getBudget() {
        console.log(this.moneyDeposit);
        console.log(this.percentDeposit);
        if (this.moneyDeposit !== 0) {
            this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + 
        Math.floor(this.moneyDeposit + (this.moneyDeposit / this.percentDeposit));
        } else {
            this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;        }
        
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    }

    getTargetMonth() {
        return targetAmount.value / this.budgetMonth;

    }

    getInfoDeposit() {
        if (depositCheck.checked) {
            this.percentDeposit = +depositPercent.value;
            this.moneyDeposit = +depositAmount.value;
        } else {
            this.percentDeposit = 0;
            this.moneyDeposit = 0;
        }
    }

    checkDepositPercent() {
        if (depositPercent.value > 100 || depositPercent.value < 1 || isNaN(depositPercent.value)) {
            alert('Введите корректное значение в поле проценты');
            depositPercent.value = '';
            startBtn.setAttribute('disabled', true);
        } else {
            startBtn.removeAttribute('disabled');
        }
    }

    changePercent(e) {
        const valueSelect = e.target.value;
        if (valueSelect === 'other') {
            depositPercent.value = '';
            depositPercent.style.display = 'inline-block';
            depositPercent.addEventListener('change', appData.checkDepositPercent.bind(appData));
        } else {
            depositPercent.style.display = 'none';
            console.log(+valueSelect);
            depositPercent.value = +valueSelect;
        }   

        if (valueSelect === '') {
            depositAmount.style.display = 'none';
        } else {
            depositAmount.style.display = 'inline-block';
        }
    }

    checkDepositHandler() {
        if (depositCheck.checked) {
            depositBank.style.display = 'inline-block';
            depositBank.addEventListener('click', appData.changePercent.bind(appData));
            this.deposit = true;

        } else {
            depositBank.style.display = 'none';
            depositAmount.style.display = 'none';
            depositPercent.value = '';
            depositAmount.value = '';
            depositBank.removeEventListener('click', appData.changePercent.bind(appData));
            this.deposit = false;
        }
    }

    calcPeriod() {
        return this.budgetMonth * periodSelect.value;
    }

    getPeriodSelect() {
        periodAmount.innerHTML = periodSelect.value;
    }

    regExp(event) {
        const target = event.target;
        if (target.getAttribute('placeholder') === 'Сумма' || target.getAttribute('placeholder') === 'Процент') {
            target.value = target.value.replace(/[^0-9]/g, '');
        }
    }

    eventListeners() {
        startBtn.addEventListener('click', this.start.bind(this));
        cancelBtn.addEventListener('click', this.reset.bind(this));
        salaryAmount.addEventListener('keyup', this.check);
        addExpensesBtn.addEventListener('click', this.addExpensesBlock);
        addIncomeBtn.addEventListener('click', this.addIncomeBlock);
        periodSelect.addEventListener('input', this.getPeriodSelect);
        depositCheck.addEventListener('change', this.checkDepositHandler);
        data.addEventListener('keyup', this.regExp);
    }
}


const appData = new AppData();
console.log(appData);
appData.eventListeners();