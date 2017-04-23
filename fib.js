console.log(fib(1));
console.log(fib(2));
console.log(fib(3));
console.log(fib(4));
console.log(fib(5));

function fib(num) {
  if (num === 0) {
    return num;
  } else if (num === 1) {
    return num;
  } else {
    return fib(num - 1) + fib(num - 2);
  }
}