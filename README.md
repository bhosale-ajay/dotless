# dotless
A JavaScript library to write linq style functional code

## Why dotless?
Its an experimental library providing functions required to write functional style programs with JavaScript, and which can work with [generator functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*), providing capability for lazy evaluation. I developed this library to solve puzzles from [Advent Of Code](https://adventofcode.com/).

All the functions are independent to each other and not defined as part of one single class. They can be composed along with other functions.

## Installation
```
npm i dotless --save

or

yarn add dotless
```

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
1. count
   ```JavaScript
   /*
   returns 1
   */
   count(n => n % 2 === 0)([1, 2, 3]);
   ```
1. countBy
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
1. cycle
   ```JavaScript
   /*
   Iterates infinitely over a collection

   returns [1, 2, 3, 1, 2, 3, 1, 2, 3, 1]
   */
   query(cycle([1, 2, 3]), 
         take(10),
         toArray);
   ```
1. each
   ```JavaScript
   /*
   Calls a method for every item in iterator
   The iterator must be consumed (toArray, count)
   Updates every property "v" for every item
   */
   const input = [{ n: 1, v: false}, 
                  { n: 2, v: false}];
   query(input,
      each(p => { p.v = true; }),
      count(p => p.v)
   );
   ```
1. filter
   ```JavaScript
   // works similar to Array.filter
   const onlyOdd = filter(n => n % 2 !== 0)
   // Returns [1, 3, 5, 7, 9]
   onlyOdd([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
   ```
1. findPairs
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
1. first
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
1. groupBy
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
1. iterate
   ```JavaScript
   // acts as an infinite loop
   // first it yields the default value
   // and calls iterator to generate values
   // returns [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
   query(
      iterate(([a, b]) => [b, a + b], [0, 1]),
      map(([a, _]) => a),
      take(10),
      toArray
   );
   ```
1. map
   ```JavaScript
   // similar to Array.map
   const doubleIt = map(n => n * 2);
   // returns [4, 6, 8, 10];
   doubleIt([2, 3, 4, 5]);
   ```
1. mapMany
   ```JavaScript
    const expand = mapMany(function*(n) {
        for (let i = 0; i <= n; i++) {
            yield i;
        }
   });
   // returns [0, 1, 2, 0, 1, 2, 3];
   expand([2, 3]);
   ```
1. mapWithLast
   ```JavaScript
   // Combines reduce and map
   // instead of returning a single accumulator returns iterator of accumulator
   const location = { distance : 0, hops : 0};
   const strides = [1, 4, 2];
   const run = mapWithLast(({distance, hops}, stride: number) => ({
       distance: distance + stride,
       hops: hops + 1
   }), location);
   // returns [{distance: 1, hops: 1}, {distance: 5, hops: 2}, {distance: 7, hops: 3}]
   run(strides);
   ```
1. matchesToArray
   ```JavaScript
   // Applies regex to string and maps matches to array
   // matches can be converted using an optional convertor
   const input = "p=<3088,2748,-1039>, v=<-103,-136,94>";
   const regex = /-*\d+/g;
   // returns [3088, 2748, -1039, -103, -136, 94]
   matchesToArray(input, regex, m => +m[0]);
   ```
1. query
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
1. reduce
   ```JavaScript
   // works similar to Array.reduce, with a little change the seed value is not optional
   const sumIt = reduce((acc, n) => acc + n, 0);
   // returns 55
   const actual = sumIt([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
   ```
1. sort, ascendingBy, ascendingByLocale, descendingBy, descendingByLocale, mergeCompareFns
   ```JavaScript
   const tim12 = { name : "Tim",  age : 12 };
   const abe21 = { name : "Abe",  age : 21 };
   const mark21 = { name : "Mark", age : 21 };
   const bill22 = { name : "Bill", age : 22 };
   const items = [ tim12, abe21, mark21, bill22 ];
   const sorter = sort(descendingBy("age"), ascendingBy("name"));
   // returns [ bill22, abe21, mark21, tim12 ]
   sorter(items);
   // sort the items array as follows [ bill22, abe21, mark21, tim12 ]
   // mergeCompareFns merge functions to use them with inbuilt "sort" method
   items.sort(mergeCompareFns(descendingBy(i => i.age), ascendingBy("name")))

   const f1 = { name: "AB", online: true, surname: "G" };
   const f2 = { name: "CD", online: false, surname: "G" };
   const f3 = { name: "EF", online: true, surname: "K" };
   const f4 = { name: "GH", online: false, surname: "K" };
   const f5 = { name: "IJ", online: true, surname: "G" };
   const fs = [f1, f2, f3, f4, f5];

   const onlineSorter = (a: Friend, b: Friend) =>
       a.online === b.online ? 0 : a.online ? -1 : 1;
   const friendSorter = mergeCompareFns(
       onlineSorter,
       // Only properties of String type can be passed here
       ascendingByLocale("surname"),
       // You can also pass, two more parameters
       // locales and options
       // Refer https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare 
       ascendingByLocale("name", 'de', { sensitivity: 'base' })
   );

   // returns [f1, f5, f3, f2, f4]
   fs.sort(friendSorter);
   ```
1. take
   ```JavaScript
   const takeTwo = take(2);
   // returns [11, 12]
   takeTwo([11, 12, 13, 14]);
   ```
1. toArray
   ```JavaScript
   // Just an alias for Array.from
   // Returns [1, 2, 3, 4] by consuming iterator returned by range
   toArray(range(1, 4))
   ```
1. Result&lt;T&gt;

   A type simile to Maybe, it combines two types `SuccessResult<T>` and `ErrorResult`.
   ```JavaScript
   function divide(
     a: number, 
     b: number) : Result<number> {
      if(b === 0) {
        return new ErrorResult("Can not divide by 0.");
      }
      return new SuccessResult(a / b);
   }
   const r = divide(4, 2);
   if(r.IsSuccess) {
       console.log(`Result is ${r.value}`);
   } else {
       console.log(r.message);
   }
   ```

1. PromiseResult&lt;T&gt;

   A type which combines Promise and Result&lt;T&gt;.

1. keptPromise

   A function which wraps, creating Promise which returns PromiseResult.

   ```JavaScript
   function divide(
       a: number, 
       b: number) : PromiseResult<number> {
       return keptPromise((success, failure) => {
           if(b === 0) {
               failure("Can not divide by 0.");
           } else {
               success(a / b);
           }
       });
   }
   ```

1. buildTrain

   Executes functions returning Result&lt;T&gt; and returns their `SuccessResult` values as Array. If a function returns `ErrorResult`, then it halts the execution and returns that `ErrorResult`. 

   ```JavaScript
   const a = 12;
   const b = true;
   const c = "done";
   const r = buildTrain(
      () => new SuccessResult(a),
      () => new SuccessResult(b),
      () => new SuccessResult(c)
   );
   expect(r.IsSuccess).toEqual(true);
   if (r.IsSuccess) {
      const [x, y, z] = r.value;
      expect(x).toEqual(a);
      expect(y).toEqual(b);
      expect(z).toEqual(c);
   }
   ```

1. relayTrain

   This is similar to `query`, but takes functions returning `Result<T>`. It pass the result from previous function to next function. Halts processing if a function returns `ErrorResult` and returns that `ErrorResult`.

   ```JavaScript
   const r = relayTrain(
       () => new SuccessResult("1234567890"),
       data => new SuccessResult(data.length),
       len => new SuccessResult(len % 2 === 0)
   );
   expect(r.IsSuccess).toEqual(true);
   if (r.IsSuccess) {
    expect(r.value).toEqual(true);
   }
   ```

1. relayTrainAsync

   This is similar to `relayTrain`, but takes functions returning `PromiseResult<T>`. Useful to run chained async functions. Same can be achieved by chaining them with '.then', but has advantage of simplifying the state to check status of PromiseResult.

   ```JavaScript
   const r = await relayTrainAsync(
     // Returns PromiseResult<User>
     () => getUserProfileAsync(),
     // Returns PromiseResult<PostId[]>
     (user) => getPostsAsync(u.id),
     // Returns PromiseResult<PostDetails[]>
     (ps) => getPostDetails(ps)
   );
   ```

*Refer tests for more examples, samples folder contain AOC puzzles solved with `query` functions.*

Read [this article](https://medium.com/@ajay.bhosale/linq-style-declarative-and-functional-programming-with-javascript-using-currying-and-generator-9e266e0e32fa) which explains query and related operators.

Read [this article](https://dev.to/bhosaleajay/async-await-and-keeping-your-promises-2h5e) which explains keptPromise.