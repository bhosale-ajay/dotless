import { range, toArray } from "../dotless";

test("range returns from, and all the intermediate numbers with +ve > 1 step", () => {
    const actual = range(1, 8, 2);
    const expected = [1, 3, 5, 7];
    expect(toArray(actual)).toEqual(expected);
});

test("range returns from, to, and all the intermediate numbers for +ve > 1 step", () => {
    const actual = range(1, 9, 2);
    const expected = [1, 3, 5, 7, 9];
    expect(toArray(actual)).toEqual(expected);
});

test("range returns from, to, and all the intermediate numbers for step 1", () => {
    const actual = range(1, 4, 1);
    const expected = [1, 2, 3, 4];
    expect(toArray(actual)).toEqual(expected);
});

test("range returns from, and all the intermediate numbers with -ve < -1 step", () => {
    const actual = range(8, 1, -2);
    const expected = [8, 6, 4, 2];
    expect(toArray(actual)).toEqual(expected);
});

test("range returns from, to, and all the intermediate numbers for -ve < -1 step", () => {
    const actual = range(9, 1, -2);
    const expected = [9, 7, 5, 3, 1];
    expect(toArray(actual)).toEqual(expected);
});

test("range returns from, to, and all the intermediate numbers for step -1", () => {
    const actual = range(4, 1, -1);
    const expected = [4, 3, 2, 1];
    expect(toArray(actual)).toEqual(expected);
});

test("range returns empty if step is 0", () => {
    const actual = range(1, 4, 0);
    const expected: number[] = [];
    expect(toArray(actual)).toEqual(expected);
});

test("range returns only one item if from === to and step 1", () => {
    const actual = range(1, 1, 1);
    const expected = [1];
    expect(toArray(actual)).toEqual(expected);
});

test("range returns only one item if from === to and step -1", () => {
    const actual = range(1, 1, -1);
    const expected = [1];
    expect(toArray(actual)).toEqual(expected);
});

test("range returns empty if from > to and step 1", () => {
    const actual = range(4, 1, 1);
    const expected: number[] = [];
    expect(toArray(actual)).toEqual(expected);
});

test("range returns empty if from > to and step -1", () => {
    const actual = range(1, 4, -1);
    const expected: number[] = [];
    expect(toArray(actual)).toEqual(expected);
});
