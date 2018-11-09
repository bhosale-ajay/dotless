# dotless
A JavaScript library to write linq style functional code

## Why dotless?
Its an experimental library providing functions required to write functional style programs with JavaScript, and which can work with [generator functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*), providing capability for lazy evaluation. I developed this library to solve puzzles from [Advent Of Code](https://adventofcode.com/).

All the functions are independent to each other and not defined as part of one single class. They can be composed along with other functions.

## Example
```JavaScript
const items = query(
    // Range returns numbers from 1 to 10
    range(1, 10),
    // Take which are divided by 3
    filter(n => n % 3 === 0),
    // Multiply them by 2
    map(n => n * 2),
    // Convert to Array
    toArray
);
// [6, 12, 18]
console.log(items);
```

## Functions
1. any
   ```JavaScript
   // returns true as list contains even number
   any(x => x % 2 === 0)([1, 2, 4])
   // returns false as the list is empty
   any()([]);
   // return true as the list has items
   any()([1, 2, 3]);
   ```
2. countBy
   ```JavaScript
   /*
   returns {
    "1" : 4,
    "2" : 2,
    "3" : 1,
    "4" : 2
   } */
   countBy()([1, 2, 2, 1, 1, 1, 3, 4, 4]);

   const oddOrEven = countBy(n => n % 2 ? "odd" : "even"); 
   /* returns {
       "odd" : 5,
       "even" : 4
   } */
   oddOrEven([1, 2, 3, 4, 5, 6, 7, 8, 9])
   ```
3. filter
   ```JavaScript
   // works similar to Array.filter
   const onlyOdd = filter(n => n % 2 !== 0)
   // Returns [1, 3, 5, 7, 9]
   onlyOdd([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
   ```
4. findPairs
   ```JavaScript
   // helps finding pairs from source
   // pairs can be
   // - mutuallyExclusive like a can divide b, but b can't divide b
   // - not exclusive like a === b or a = reverse(b)
   const itemsWithTheirDoubles = findPairs(
        (a, b) => a * 2 === b,
        // The list is mutually exclusive
        true
   );
   /* returns array of [
         a,  b, index of A, index of B
        [2,  4, 0, 2],
        [3,  6, 3, 1],
        [7, 14, 5, 4]
   ]; */
   itemsWithTheirDoubles([2, 6, 4, 3, 14, 7]);

   const duplicateItems = findPairs((a, b) => a === b);
   /* returns array of [
         a,  b, index of A, index of B
        [2, 2, 0, 6],
        [6, 6, 1, 3],
        [1, 1, 4, 7]
   ]; */
   duplicateItems([2, 6, 4, 6, 1, 8, 2, 1]);

   const duplicateItemsMutuallyExclusive = findPairs((a, b) => a === b, true);
   /* returns array of [
         a,  b, index of A, index of B
        [2, 2, 0, 6],
        [6, 6, 1, 3],
        [6, 6, 3, 1],
        [1, 1, 4, 7],
        [2, 2, 6, 0],
        [1, 1, 7, 4]
   ]; */
   duplicateItemsMutuallyExclusive([2, 6, 4, 6, 1, 8, 2, 1]);
   ```
5. first
   ```JavaScript
   // returns 11
   first()([11, 12, 13]);

   // returns null
   first()([]);

   // returns 2
   first(x => x % 2 === 0)([1, 2, 4]);

   // the predicate can maintain its state
   const seenBefore = () => {
        const seen = {};
        return (n) => {
            if (seen[n]) {
                return true;
            } else {
                seen[n] = true;
                return false;
            }
        };
   };
   const firstDuplicate = first(seenBefore());
   // returns 2
   firstDuplicate([1, 2, 4, 2, 5, 4]);
   ```
6. groupBy
   ```JavaScript
   // groupBy by property
   const timNY = { n: "Tim",  s : "NY"};
   const billWA = { n: "Bill", s : "WA"};
   const steveCA = { n: "Steve", s : "CA"};
   const andrewWA = { n: "Andrew", s : "WA"};
   const input = [
       timNY,
       billWA,
       steveCA,
       andrewWA
   ];
   /* returns {
      "NY" : [timNY],
      "CA" : [steveCA],
      "WA" : [billWA, andrewWA]
   } */
   groupBy("s")(input);

   // groupBy by function
   const input = [1, 2, 3, 4, 5, 6, 7, 8, 9];
   /* returns {
       "odd" : [1, 3, 5, 7, 9],
       "even" : [2, 4, 6, 8]
   } */
   groupBy(n => n % 2 ? "odd" : "even")(input);
   ```
7. map
   ```JavaScript
   // similar to Array.map
   const doubleIt = map(n => n * 2);
   // returns [4, 6, 8, 10];
   doubleIt([2, 3, 4, 5]);
   ```
8. mapMany
   ```JavaScript
    const expand = mapMany(function*(n) {
        for (let i = 0; i <= n; i++) {
            yield i;
        }
   });
   // returns [0, 1, 2, 0, 1, 2, 3];
   expand([2, 3]);
   ```
9. matchesToArray
   ```JavaScript
   // Applies regex to string and maps matches to array
   // matches can be converted using an optional convertor
   const input = "p=<3088,2748,-1039>, v=<-103,-136,94>";
   const regex = /-*\d+/g;
   // returns [3088, 2748, -1039, -103, -136, 94]
   matchesToArray(input, regex, m => +m[0]);
   ```
0. query
   ```JavaScript
   // The engine of the library
   // Takes array of functions
   // The first parameter can be argument or a function returning a value
   // query(1, a, b, c) === c(b(a(1)))
   // returns 36
   query(
      range(1, 10),
      filter(n => n % 3 === 0),
      map(n => n * 2),
      reduce((acc, n) => acc + n, 0)
   );
   ```
1. range
   ```JavaScript
   // returns [1, 3, 5, 7]
   range(1, 8, 2)

   // returns [11, 12, 13, 14]
   range(11, 14)

   // returns [8, 6, 4, 2]
   range(8, 1, -2)
   ```
2. reduce
   ```JavaScript
   // works similar to Array.reduce, with a little change the seed value is not optional
   const sumIt = reduce((acc, n) => acc + n, 0);
   // returns 55
   const actual = sumIt([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
   ```
3. sort, ascendingBy, descendingBy
   ```JavaScript
   const tim12 = { name : "Tim",  age : 12 };
   const abe21 = { name : "Abe",  age : 21 };
   const mark21 = { name : "Mark", age : 21 };
   const bill22 = { name : "Bill", age : 22 };
   const items = [ tim12, abe21, mark21, bill22 ];
   const sorter = sort(descendingBy("age"), ascendingBy("name"));
   // returns [ bill22, abe21, mark21, tim12 ]
   sorter(items);
   ```
4. take
   ```JavaScript
   const takeTwo = take(2);
   // returns [11, 12]
   takeTwo([11, 12, 13, 14]);
   ```
5. toArray
   ```JavaScript
   // Just an alias for Array.from
   // Returns [1, 2, 3, 4] by consuming iterator returned by range
   toArray(range(1, 4))
   ```

*Refer tests for more examples, samples folder contain AOC puzzles solved using above functions.*

Read [this medium article](https://medium.com/@ajay.bhosale/linq-style-declarative-and-functional-programming-with-javascript-using-currying-and-generator-9e266e0e32fa) for functional programming concepts.