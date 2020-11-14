'use strict';

function test(...arr){
    console.log(arr);
}

test('red', 5, 12, 'black', [], true, 9);

function test1(a,b,c, ...arr){
    console.log(a,b,c);

    console.log(arr);
}

test1('red', 5, 12, 'black', [], true, 9);

const arr = ['red', 5, 12];
const arr2 = ['black',true];


function test2(a,b,c ,d , e){
    console.log(a,b,c);
    console.log(d,e);
    
}

test2(...arr, ...arr2);

/* Напишите функцию на JS. Цель: Убрать все объекты с типом additional, а для basic очки уменьшить в двое.

Изменить необходимо исходный массив*/

const myLesson = [
    {lesson: 1, type: 'basic', points: 2},
    {lesson: 2, type: 'additional', points: 4},
    {lesson: 3, type: 'basic', points: 6},
    {lesson: 4, type: 'additional', points: 3},
    {lesson: 5, type: 'basic', points: 4},
    {lesson: 6, type: 'basic', points: 2},
    {lesson: 7, type: 'additional', points: 2},
    {lesson: 8, type: 'basic', points: 6},
    {lesson: 9, type: 'basic', points: 4},
    {lesson: 10, type: 'basic', points: 6},
    {lesson: 11, type: 'additional', points: 5}, 
    {lesson: 12, type: 'basic', points: 2}, 
    {lesson: 13, type: 'additional', points: 2}, 
    {lesson: 14, type: 'basic', points: 4},
    {lesson: 15, type: 'additional', points: 1},
    {lesson: 16, type: 'additional', points: 7},
  ];
  
const newLesson = myLesson.map(item => (item.points /= 2, item)).filter(item => item.type === 'basic');

console.log(newLesson);
  