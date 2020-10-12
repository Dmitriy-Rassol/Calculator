let money = 50000; 
let income = 'фриланс';
let addExpenses = 'Интернет, Такси, Коммуналка'; 
let deposit = true; 
let mission = 150000; 
let period = 5;
let budgetDay = money / 30;

console.log(money, income, deposit);
console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев'); 
console.log('Цель заработать ' + mission + ' рублей');
console.log(addExpenses.toLocaleLowerCase().split(','));
console.log(budgetDay);