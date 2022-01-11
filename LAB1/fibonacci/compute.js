const fibonacci = (number) => {
  number = Math.abs(number);
  if (number <= 2) return 1;

  return fibonacci(number - 1) + fibonacci(number - 2);
};

console.log("30:", fibonacci(30));
console.log("-15:", fibonacci(-15));
console.log("-10 and 10 is equal:", fibonacci(-10) === fibonacci(10));

module.exports = { fibonacci };
