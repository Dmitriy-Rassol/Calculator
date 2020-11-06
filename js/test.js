// 1.  Привязка по умолчанию foo();
// 2. Не явная привязка obj.foo();
// 3. Явная привязка apply, call, bind;
// 4. Приявязка new;
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
