'use strict';
// 1.  Привязка по умолчанию foo();
// 2. Не явная привязка obj.foo();
// 3. Явная привязка apply, call, bind;
// 4. Приявязка new; если объект создан через оператор New, то this будет указывать на этот объект;
let obj = {
    x:10,
    y:4,
    test: newTest
};

function foo (callback){
    callback();
};

function newTest(){
    console.log('this: ', this);
}
// Таймер
//setTimeout(obj.test, 10000);

function hardBind (hard) {
    newTest.call(hard);
}

hardBind(obj);

let foo1 = newTest.bind(obj);

foo1();
// Разница между  apply и call в принятых аргументах
// newTest.apply(obj); // Принимает массив аргументов, которые будут разобраны и переданы в функцию
// newTest.call(obj); // Принимает любое колличество параметров через запятую


// Классы
function Car(countryBuild, options) {
    this.countryBuild = countryBuild;
    options = options || {};
    this.color = options.color;
    this.transmission = options.transmission;
}

Car.prototype.ride = function(){
    console.log(this.brand + ' ' + this.model + ' поехала! ');
}

console.log(Car.ride());

function Audi(countryBuild, options, model, type) {
    Car.apply(this, arguments);
    this.brand = 'Audi';
    this.model = model;
    this.type = type;
}

Audi.prototype = Object.create(Car.prototype);
Audi.prototype.constructor = Audi;
let carQ7 = new Audi('germany', {color: 'red'}, 'Q7', 'S');

console.log(carQ7);

console.log(carQ7 instanceof Audi);
console.log(carQ7 instanceof Car);

carQ7.ride();