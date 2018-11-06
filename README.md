# dotless
A JavaScript library to write linq style functional code

## Why dotless?
Its an experimental library providing functions required to write functional style programs with JavaScript, and which can work with [generator functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*), providing capability for lazy evaluation. I developed this library to solve puzzles from [Advent Of Code](https://adventofcode.com/).

All the functions are independent to each other and not defined as part of one single class. They can be composed along with other functions.

## Functions
1. any
2. countBy
3. filter
4. findPairs
5. first
6. groupBy
7. map
8. mapMany
9. matchesToArray
10. query
11. range
12. reduce
13. sort, ascendingBy, descendingBy
14. take
15. toArray

## Examples
```JavaScript
const items = query(
    // Range returns numbers from 1 to 10
    range(1, 10),
    // Take which are divided by 3
    filter(n => n % 3 === 0),
    // Multiply them by 2
    map(n => n * 2),
    // Convert them to Array
    toArray
);
// [6, 12, 18]
console.log(items);
```

*Refer tests for more examples, samples folder contain AOC puzzles solved using above functions.*

Read [this medium article](https://medium.com/@ajay.bhosale/linq-style-declarative-and-functional-programming-with-javascript-using-currying-and-generator-9e266e0e32fa) for functional programming concepts.