import { any, count, countBy, cycle, each, filter, first,
         groupBy, iterate, map, mapMany, mapWithLast,
         matchesToArray, query, reduce, take, toArray } from "../dotless";

test("map", () => {
    const doubleIt = map<number, number>(n => n * 2);
    const source = [2, 3, 4, 5];
    const actual = doubleIt(source);
    const expected = [4, 6, 8, 10];
    expect(toArray(actual)).toEqual(expected);
});

test("mapMany", () => {
    const expand = mapMany<number, number>(function*(n) {
        for (let i = 0; i <= n; i++) {
            yield i;
        }
    });
    const source = [2, 3];
    const actual = expand(source);
    const expected = [0, 1, 2, 0, 1, 2, 3];
    expect(toArray(actual)).toEqual(expected);
});

test("mapWithLast", () => {
    const location = {distance: 0, hops: 0};
    const strides = [1, 4, 2];
    const run = mapWithLast(({distance, hops}, stride: number) => ({
        distance: distance + stride,
        hops: hops + 1
    }), location);
    const actual = run(strides);
    const expected = [{distance: 1, hops: 1}, {distance: 5, hops: 2}, {distance: 7, hops: 3}];
    expect(toArray(actual)).toEqual(expected);
});

test("filter", () => {
    const onlyOdd = filter<number>(n => n % 2 !== 0);
    const source = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const actual = onlyOdd(source);
    const expected = [1, 3, 5, 7, 9];
    expect(toArray(actual)).toEqual(expected);
});

test("filter empty result", () => {
    const onlyOdd = filter<number>(n => n % 2 !== 0);
    const source = [2, 4, 6, 8, 10];
    const actual = onlyOdd(source);
    const expected: number[] = [];
    expect(toArray(actual)).toEqual(expected);
});

test("reduce", () => {
    const sumIt = reduce<number, number>((acc, n) => acc + n, 0);
    const source = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const actual = sumIt(source);
    const expected = 55;
    expect(actual).toEqual(expected);
});

test("reduce pass correct index", () => {
    const indexCollected: number[] = [];
    const multiplyThem = reduce<number, number>((acc, n, index) => {
        indexCollected.push(index);
        return acc * n;
    }, 1);
    const source = [3, 4, 5];
    const actual = multiplyThem(source);
    const expected = 60;
    const expectedIndexes = [0, 1, 2];
    expect(actual).toEqual(expected);
    expect(indexCollected).toEqual(expectedIndexes);
});

test("any returns true for source containing items", () => {
    const hasItems = any();
    const source = [1, 2];
    const actual = hasItems(source);
    const expected = true;
    expect(actual).toEqual(expected);
});

test("any returns false for empty source", () => {
    const hasItems = any();
    const empty: number[] = [];
    const actual = hasItems(empty);
    const expected = false;
    expect(actual).toEqual(expected);
});

test("any returns true for source containing matching item", () => {
    let numberOfCalls = 0;
    const containsEvenNumber = any<number>(n => {
        numberOfCalls = numberOfCalls + 1;
        return n % 2 === 0;
    });
    const positionOfFirstEven = 3;
    const source = [1, 3, 4, 2, 5];
    const actual = containsEvenNumber(source);
    const expected = true;
    expect(actual).toEqual(expected);
    expect(numberOfCalls).toEqual(positionOfFirstEven);
});

test("any returns false for source containing no matching item", () => {
    let numberOfCalls = 0;
    const containsEvenNumber = any<number>(n => {
        numberOfCalls = numberOfCalls + 1;
        return n % 2 === 0;
    });
    const source = [1, 3, 5, 7, 9];
    const actual = containsEvenNumber(source);
    const expected = false;
    expect(actual).toEqual(expected);
    expect(numberOfCalls).toEqual(source.length);
});

test("first returns first item for source containing items", () => {
    const expected = 11;
    const source = [expected, 22, 33];
    const actual = first()(source);
    expect(actual).toEqual(expected);
});

test("first returns null for empty source", () => {
    const actual = first()([]);
    const expected = null;
    expect(actual).toEqual(expected);
});

test("first with condition", () => {
    const firstEven = first<number>(n => n % 2 === 0);
    const actual = firstEven([1, 2, 4]);
    const expected = 2;
    expect(actual).toEqual(expected);
});

test("first with state", () => {
    const seenBefore = () => {
        const seen: any = {};
        return (n: number) => {
            if (seen[n]) {
                return true;
            } else {
                seen[n] = true;
                return false;
            }
        };
    };
    const firstDuplicate = first<number>(seenBefore());
    const actual = firstDuplicate([1, 2, 4, 2, 5, 4]);
    const expected = 2;
    expect(actual).toEqual(expected);
});

test("first with condition and no matching returns null", () => {
    const dividedByFive = first<number>(n => n % 5 === 0);
    const actual = dividedByFive([1, 2, 3, 4]);
    const expected = null;
    expect(actual).toEqual(expected);
});

test("take returns first n items", () => {
    let numberOfCalls = 0;
    function* source() {
        for (let i = 11; i <= 20; i++) {
            numberOfCalls = numberOfCalls + 1;
            yield i;
        }
    }
    const takeFour = take<number>(4);
    const actual = takeFour(source());
    const expected = [11, 12, 13, 14];
    expect(toArray(actual)).toEqual(expected);
    expect(numberOfCalls).toEqual(expected.length);
});

test("take returns less items if the source does not contain requested number of items", () => {
    let numberOfCalls = 0;
    function* source() {
        for (let i = 11; i <= 20; i++) {
            numberOfCalls = numberOfCalls + 1;
            yield i;
        }
    }
    const take20 = take<number>(20);
    const actual = take20(source());
    const expected = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    expect(toArray(actual)).toEqual(expected);
    expect(numberOfCalls).toEqual(expected.length);
});

test("take for 0 items returns empty and does not touch the source", () => {
    let numberOfCalls = 0;
    function* source() {
        for (let i = 11; i <= 20; i++) {
            numberOfCalls = numberOfCalls + 1;
            yield i;
        }
    }
    const takeNone = take<number>(0);
    const actual = takeNone(source());
    const expected: number[] = [];
    expect(toArray(actual)).toEqual(expected);
    expect(numberOfCalls).toEqual(expected.length);
});

test("take handler can be used multiple times", () => {
    const sourceA = [1, 2, 3, 4];
    const sourceB = [5, 6, 7, 8];
    const takeTwo = take<number>(2);
    const actualFirst = takeTwo(sourceA);
    const actualSecond = takeTwo(sourceB);
    const expectedFirst = [1, 2];
    const expectedSecond = [5, 6];
    expect(toArray(actualFirst)).toEqual(expectedFirst);
    expect(toArray(actualSecond)).toEqual(expectedSecond);
});

test("matchesToArray 01", () => {
    const expected = [3088, 2748, -1039, -103, -136, 94, -5, 0, -4];
    const input = "p=<3088,2748,-1039>, v=<-103,-136,94>, a=<-5,0,-4>";
    const regex = /-*\d+/g;
    const actual = matchesToArray(input, regex, m => +m[0]);
    expect(actual).toEqual(expected);
});

test("matchesToArray 01", () => {
    const input = "p=<3088,2748,-1039>, v=<-103,-136,94>, a=<-5,0,-4>";
    const expected = [3088, 2748, -1039, -103, -136, 94, -5, 0, -4];
    const regex = /-*\d+/g;
    const actual = matchesToArray(input, regex, m => +m[0]);
    expect(actual).toEqual(expected);
});

test("matchesToArray 02", () => {
    const input = "p=<3088,2748,-1039>, v=<-103,-136,94>, a=<-5,0,-4>";
    const expected = [3088, 2748, -1039, -103, -136, 94, -5, 0, -4];
    const regex = /-*\d+/g;
    const actual = matchesToArray(input, regex).map(m => +m[0]);
    expect(actual).toEqual(expected);
});

test("countBy property", () => {
    const input = [
        { n: "Tim",  s : "NY"},
        { n: "Bill", s : "WA"},
        { n: "Steve", s : "CA"},
        { n: "Andrew", s : "WA"}
    ];
    const expected = { "NY" : 1, "CA" : 1, "WA" : 2};
    const actual = countBy("s")(input);
    expect(actual).toEqual(expected);
});

test("countBy function", () => {
    const input = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const expected = {
        "odd" : 5,
        "even" : 4
    };
    const actual = countBy<number>(n => n % 2 ? "odd" : "even")(input);
    expect(actual).toEqual(expected);
});

test("countBy self", () => {
    const input = [1, 2, 2, 1, 1, 1, 3, 4, 4];
    const expected = {
        "1" : 4,
        "2" : 2,
        "3" : 1,
        "4" : 2
    };
    const actual = countBy<number>()(input);
    expect(actual).toEqual(expected);
});

test("groupBy property", () => {
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
    const expected = { "NY" : [timNY], "CA" : [steveCA], "WA" : [billWA, andrewWA]};
    const actual = groupBy("s")(input);
    expect(actual).toEqual(expected);
});

test("groupBy function", () => {
    const input = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const expected = {
        "odd" : [1, 3, 5, 7, 9],
        "even" : [2, 4, 6, 8]
    };
    const actual = groupBy<number>(n => n % 2 ? "odd" : "even")(input);
    expect(actual).toEqual(expected);
});

test("cycle", () => {
    const input = [1, 2, 3];
    const expected = [1, 2, 3, 1, 2, 3, 1, 2, 3, 1];
    const actual = query(cycle(input), take(10), toArray);
    expect(actual).toEqual(expected);
});

test("count items", () => {
    const input = [1, 2, 3];
    const expected = 3;
    const actual = count()(input);
    expect(actual).toEqual(expected);
});

test("count items matching a predicate", () => {
    const input = [1, 2, 3];
    const expected = 1;
    const actual = count<number>(n => n % 2 === 0)(input);
    expect(actual).toEqual(expected);
});

test("each", () => {
    const input = [{ n: 1, v: false}, {n: 2, v: false}];
    const expected = 2;
    const actual = query(input,
        each(p => { p.v = true; }),
        // the iterator has to be consumed to
        // invoke the each action
        count(p => p.v)
    );
    expect(actual).toEqual(expected);
});

test("iterate 01", () => {
    const actual = query(
        iterate(a => a + 2, 10),
        take(5),
        toArray
    );
    const expected = [10, 12, 14, 16, 18];
    expect(actual).toEqual(expected);
});

test("iterate 02", () => {
    const actual = query(
        iterate(([a, b]) => [b, a + b], [0, 1]),
        map(([a, _]) => a),
        take(10),
        toArray
    );
    const expected = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34];
    expect(actual).toEqual(expected);
});
