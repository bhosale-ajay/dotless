import { ascendingBy, descendingBy, sort } from "../dotless";

test("sort with properties", () => {
    const tim12 = { name : "Tim",  age : 12 };
    const abe21 = { name : "Abe",  age : 21 };
    const mark21 = { name : "Mark", age : 21 };
    const bill22 = { name : "Bill", age : 22 };
    const items = [ tim12, abe21, mark21, bill22 ];
    const sorter = sort(descendingBy("age"), ascendingBy("name"));
    const actual = sorter(items);
    const expected = [ bill22, abe21, mark21, tim12 ];
    expect(actual).toEqual(expected);
});

test("sort with function 01", () => {
    const adi21 = { name : "Adi",  age : 21 };
    const axe21 = { name : "Axe",  age : 21 };
    const abe22 = { name : "Abe",  age : 22 };
    const aro22 = { name : "Aro",  age : 22 };
    const henry21 = { name : "Henry", age : 21 };
    const homer22 = { name : "Homer", age : 22 };
    const items = [ adi21, axe21, abe22, aro22, henry21, homer22 ];
    const sorter = sort(descendingBy(x => x.name.length), descendingBy("age"), ascendingBy("name"));
    const actual = sorter(items);
    const expected = [ homer22, henry21, abe22, aro22, adi21, axe21 ];
    expect(actual).toEqual(expected);
});

test("sort with function 02", () => {
    const adi21 = { name : "Adi",  age : 21 };
    const axe21 = { name : "Axe",  age : 21 };
    const abe22 = { name : "Abe",  age : 22 };
    const aro22 = { name : "Aro",  age : 22 };
    const henry22 = { name : "Henry", age : 22 };
    const homer22 = { name : "Homer", age : 22 };
    const items = [ abe22, aro22, henry22, homer22, adi21, axe21 ];
    const sorter = sort(ascendingBy(x => x.name.length), ascendingBy("age"), descendingBy("name"));
    const actual = sorter(items);
    const expected = [ axe21, adi21, aro22, abe22, homer22, henry22];
    expect(actual).toEqual(expected);
});

test("sort 01", () => {
    const adi21 = { name : "Adi",  age : 21 };
    const axe21 = { name : "Axe",  age : 21 };
    const items = [ adi21, axe21 ];
    const sorter = sort(ascendingBy("age"));
    const actual = sorter(items);
    expect(actual).toEqual(items);
});

test("sort 02", () => {
    const adi21 = { name : "Adi",  age : 21 };
    const axe20 = { name : "Axe",  age : 20 };
    const items = [ adi21, axe20 ];
    const sorter = sort(descendingBy("age"));
    const actual = sorter(items);
    expect(actual).toEqual(items);
});
