import { findPairs, toArray } from "../dotless";

test("findPairs pairs which are mutually exclusive", () => {
    const source = [2, 6, 4, 3, 14, 7];
    const itemsWithTheirDoubles = findPairs<number>(
        (a, b) => a * 2 === b,
        true
    );
    const actual = itemsWithTheirDoubles(source);
    const expected = [[2, 4, 0, 2], [3, 6, 3, 1], [7, 14, 5, 4]];
    expect(toArray(actual)).toEqual(expected);
});

test("findPairs duplicate", () => {
    const source = [2, 6, 4, 6, 1, 8, 2, 1];
    const duplicateItems = findPairs((a, b) => a === b);
    const actual = duplicateItems(source);
    const expected = [[2, 2, 0, 6], [6, 6, 1, 3], [1, 1, 4, 7]];
    expect(toArray(actual)).toEqual(expected);
});

test("findPairs duplicate ME", () => {
    const source = [2, 6, 4, 6, 1, 8, 2, 1];
    const duplicateItemsME = findPairs((a, b) => a === b, true);
    const actual = duplicateItemsME(source);
    const expected = [
        [2, 2, 0, 6],
        [6, 6, 1, 3],
        [6, 6, 3, 1],
        [1, 1, 4, 7],
        [2, 2, 6, 0],
        [1, 1, 7, 4]
    ];
    expect(toArray(actual)).toEqual(expected);
});

test("findPairs anagram", () => {
    const source = ["thaw", "what", "felt", "note", "hose", "tone"];
    const regularize = (str: string) =>
        str
            .split("")
            .sort()
            .join();
    const areAnagram = (a: string, b: string) =>
        regularize(a) === regularize(b);
    const pairsWhichAreAnagram = findPairs(areAnagram);
    const actual = pairsWhichAreAnagram(source);
    const expected = [["thaw", "what", 0, 1], ["note", "tone", 3, 5]];
    expect(toArray(actual)).toEqual(expected);
});
