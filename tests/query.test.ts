import { any, ascendingBy, descendingBy, filter, findPairs,
         first, map, query, range, reduce, sort, take, toArray
    } from "../dotless";

test("query 01", () => {
    const actual = query(
        range(1, 10),
        filter(n => n % 3 === 0),
        map(n => n * 2),
        reduce((acc, n) => acc + n, 0)
    );
    const expected = 36;
    expect(actual).toEqual(expected);
});

test("query 02", () => {
    const actual = query(
        range(1, 10),
        filter(n => n % 3 === 0),
        any(n => n % 5 === 0)
    );
    const expected = false;
    expect(actual).toEqual(expected);
});

test("query 03", () => {
    const actual = query(
        range(1, 100),
        filter(n => n % 3 === 0 && n % 5 === 0),
        first()
    );
    const expected = 15;
    expect(actual).toEqual(expected);
});

test("query 04", () => {
    const actual = query(
        range(1, 100),
        filter(n => n % 3 === 0 && n % 5 === 0),
        take(3),
        toArray
    );
    const expected = [15, 30, 45];
    expect(actual).toEqual(expected);
});

test("query 05", () => {
    const actual = query(
        range(1, 10),
        reduce((acc, n) => acc + n, 0)
    );
    const expected = 55;
    expect(actual).toEqual(expected);
});

test("query 06", () => {
    let lastA = 56;
    const actual = query(
        [23, 11, 20, 56, 81, 11, 34, 19, 81, 56, 90],
        findPairs((a, b) => {
            lastA = a;
            return a === b;
        }),
        take(2),
        map(pair => pair[0]),
        toArray
    );
    const expected = [11, 56];
    expect(actual).toEqual(expected);
    expect(lastA).toEqual(56);
});

test("query 07", () => {
    const actual = query(
        [9, 3, 93, 7, 5, 49, 11, 81, 121, 25],
        findPairs((a, b) => a * a === b, true),
        take(3),
        map(p => p[0]),
        toArray
    );
    const expected = [9, 3, 7];
    expect(actual).toEqual(expected);
});

test("query 08", () => {
    const actual = query(
        [9, 3, 93, 7, 5, 49, 11, 81, 121, 25],
        findPairs((a, b) => a === b * b, true),
        take(3),
        map(p => p[0]),
        toArray,
        sort<number>(descendingBy())
    );
    const expected = [81, 49, 9];
    expect(actual).toEqual(expected);
});

test("query 08", () => {
    const actual = query(
        [9, 3, 93, 7, 5, 49, 11, 81, 121, 25],
        filter(n => n % 3 === 0),
        toArray,
        sort(descendingBy())
    );
    const expected = [93, 81, 9, 3];
    expect(actual).toEqual(expected);
});

test("query 09", () => {
    const actual = query(
        [93, 23, 73, 43, 53, 63, 33, 83, 13],
        filter(n => n % 3 === 0),
        toArray,
        sort(ascendingBy())
    );
    const expected = [33, 63, 93];
    expect(actual).toEqual(expected);
});

test("query X", () => {
    const actual = query(
        1,
        n => n + n,
        n => `The value is ${n}.`
    );
    const expected = `The value is 2.`;
    expect(actual).toEqual(expected);
});
