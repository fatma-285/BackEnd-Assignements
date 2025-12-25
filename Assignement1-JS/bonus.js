//? Write a function createCounter. It should accept an initial integer init.
//? It should return an object with three functions.

//* The three functions are:

//* increment() increases the current value by 1 and then returns it.
//* decrement() reduces the current value by 1 and then returns it.
//* reset() sets the current value to init and then returns it.

// var creatCounter = function (init) {
//     const originalInit=init;
//   const obj = {
//     increment: () => ++init,
//     decrement: () => --init,
//     reset: () => {
//         init=originalInit;
//         return init;
//     },
//   };
//   return obj;
// };

// const counter = creatCounter(5);
// console.log(counter.increment()); // 6
// console.log(counter.reset()); // 5
// console.log(counter.decrement()); // 4


