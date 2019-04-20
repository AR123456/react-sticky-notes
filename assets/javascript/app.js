// **************** Old way useing a for loop

// var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// function double(arr) {
//   for (let i = 0; i < arr.length; i++) {
//     console.log(arr[i] * 2);
//   }
// }
// double(arr);

// //////////// using forEach//////////////////
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

arr.forEach(function(number) {
  console.log(number * 2);
});

//  This forEach uses all three parameters avalible in the forEach
var strings = ["my", "forEach", "example"];

var results = "";
strings.forEach(function(str, index, array) {
  if (array.length - 1 !== index) {
    results += str + " ";
  } else {
    results += str + "!!!";
  }
});
console.log(results);
//  the reuslt is " my forEach exapmple "
