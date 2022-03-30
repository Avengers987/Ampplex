// // // Iterators

// function fruitsIterator(values) {
//   let responseIndex = 0;

//   //  we will return an object
//   return {
//     next: function () {
//       return values[responseIndex++];
//     },
//   };
// }

// const myArray = ["Apples", "Grapes", "Oranges", "Bhindi"];
// console.log("My array is ", myArray);

// //  Using the iterator
// const fruits = fruitsIterator(myArray);
// console.log(fruits.next());
// console.log(fruits.next());
// console.log(fruits.next());
// console.log(fruits.next());

// // *--------Generators---------*

// function* reponseIterator(arr) {
//   for (let i = 0; i < arr.length; i++) {
//     yield arr[i];
//   }
// }

// const resp_arr = ["Apples", "Grapes", "Oranges", "Bhindi"];
// const resp_gen = reponseIterator(resp_arr);

// console.log(resp_gen.next());
// console.log(resp_gen.next());
// console.log(resp_gen.next());
// console.log(resp_gen.next());

const mystr: string = "https://github.com/   dsffg sdfdf";

let my_lst = mystr.trim().split(" ");
console.log(my_lst);

Array.from(my_lst).forEach((element: string) => {
  console.log(element.startsWith("https://") || element.startsWith("http://"));
});
