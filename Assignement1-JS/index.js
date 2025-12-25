//******************************************************************************************************************/
//*                                                     Part 1                                                      /
//******************************************************************************************************************/

//? 1. Convert the string "123" to a number and add 7.

// console.log(Number("123")+7);

//? 2. Check if the given variable is falsy and return "Invalid" if it is

// let a=2;
// if(a==0||a==false||a==""||a==null||a==undefined||a==NaN){
//     console.log("Invalid");
// }else{
//     console.log("Valid");
// }

//? 3. Use for loop to print all numbers between 1 and 10, skipping even numbers using continue

// for (let i = 0; i < 10; i++) {
//     if(i%2==0){
//         continue;
//     }else{
//         console.log(i);
//     }
// }

//? 4. Create an array of numbers and return only the even numbers using filter method.

// let arr=[1, 2, 3, 4, 5];
// let evenNums=arr.filter((ele)=>{
//     return ele %2==0;
// })
// console.log(evenNums);

//? 5. Use the spread operator to merge two arrays, then return the merged array

// let arr1=[1,2,3];
// let arr2=[4,5,6];
// let mergedArr=[...arr1,...arr2];
// console.log(mergedArr);

//?  6. Use a switch statement to return the day of the week given a number (1 = Sunday …., 7 = Saturday).

// let day=3;
// switch(day){
//     case 1:
//     console.log("Sunday");
//     break;
//     case 2:
//     console.log("Monday");
//     break;
//     case 3:
//     console.log("Tuesday");
//     break;
//     case 4:
//     console.log("Wedensday");
//     break;
//     case 5:
//     console.log("Thursday");
//     break;
//     case 6:
//     console.log("Friday");
//     break;
//     case 7:
//     console.log("Saturday");
//     break;
//     default:
//     console.log("Invalid Day Number");
// }

//? 7. Create an array of strings and return their lengths using map method

// let stringArr = ["a", "ab", "abc"];
// let elementLength=stringArr.map((ele)=>{
//     return ele.length;
// })
// console.log(elementLength);

//? 8. Write a function that checks if a number is divisible by 3 and 5

// function chekDivisibility(a=5) {
//     if(a%3==0&&a%5==0){
//         console.log("Divisible by both");
//     }else{
//         console.log("Not Divisible by both");
//     }
// }
// chekDivisibility(15);

//? 9. Write a function using arrow syntax to return the square of a number

// let sqrNum=num=> num**2;
// console.log(sqrNum(4));

//? 10.Write a function that destructures an object to extract values and returns a formatted string

// const person = { name: "John", age: 25 };
// const {name,age} = person;
// console.log(`${name} is ${age} years old`);

//? 11.Write a function that accepts multiple parameters (two or more) and returns their sum

// function getSum(...nums) {
//   let sum=0;
//   for (let i = 0; i < nums.length; i++) {
//     sum += nums[i];
//   }
//   return sum;
// }
// console.log(getSum(2, 3, 4));

//? 12. Write a function that returns a promise which resolves after 3 seconds with a 'Success' message.

// function waiting(){
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve("Success");
//       }, 3000);
//     }).then((msg) => console.log(msg));
// }
// waiting();

//? 13. Write a function to find the largest number in an array

//***(1)
// function getLargestNum(...arr) {
//   let largest = arr[0];
//   for (let i = 0; i < arr.length; i++) {
//     if (largest < arr[i]) {
//       largest = arr[i];
//     }
//   }
//   return largest;
// }
// console.log(getLargestNum(9, 30, 7, 2, 90));

//***(2)
// function getLargestNum(...arr) {
//   return arr.reduce((max, curr) => (curr > max ? curr : max));
// }
// console.log(getLargestNum(9, 30, 7, 2, 90));

//? 14. Write a function that takes an object and returns an array containing only its keys.

// const person = {
//   name: "ali",
//   age: 20,
// };
// function getKeys(obj = {}) {
//   let resArr = [];
//   for (const key in obj) {
//     resArr.push(key);
//   }
//   return resArr;
// }
// console.log(getKeys(person));
// console.log(getKeys({ position: "HR", salary: 8000 }));

//? 15. Write a function that splits a string into an array of words based on spaces

// function splitString(sentence){
// return sentence.split(" ");
// }
// console.log(splitString("The quick brown fox"));

//*******************************************************************************************************************/
//*                                                   Part 2                                                         /
//*******************************************************************************************************************/

//? 1. What is the difference between forEach and for...of? When would you use each?
/*
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//*                         for each                                             for of
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 Difference      -it is an array method.                 it is a loop that iterates over different iteratable types       
                 -executes func. for each element                can stop or skip elements
                          in the array 
                 -loops all elements dont continue 
                           or break
//  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 When Use          When doing simple operations                    when need more control (break, continue)
                 on every element without stopping            and iteratable types(arrays, maps, sets, strings,...) 
//  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

 */
//****************************************************************************************************************** */

//? 2. What is hoisting and what is the Temporal Dead Zone (TDZ)? Explain with examples.
/*
//*Hoisting
means that declerations are moved to the top of the current scope before the code is executed

console.log(x);   //*undefined 
var x=5;

//*TDZ**
variables can`t be accessed before initialization

console.log(x);   //!can't access x 
let x=5;
*/

//****************************************************************************************************************** */

//? 3. What are the main differences between == and ===?
/*

const x=5;
const y="5";

== compares values only
console.log(x==y);   //*true

=== compares values and type
console.log(x===y); //*false

*/
//***************************************************************************************************************** */

//? 4. Explain how try-catch works and why it is important in async operations.
/*

it handle errors because async operations can fail and stop all code execution

try{
code executed and may throw an error
}catch(error){
console.log(error thrown);
}finally{
alwayse implemented otherwise code thrown an error or not
}

*/
//***************************************************************************************************************** */

//? 5. What’s the difference between type conversion and coercion?
/*

//* Type Conversion (explicit)

you convert a value to a specific data type (casting)
let a="1";
console log(Number(a));  // 1
console log(Boolean(a)); // true 

//*Type Coercion (implicit)

JS automatcally converts a value to another data type   
console.log("2"-2); // 0 
console.log("2"+2); // 22 

*/ 




















