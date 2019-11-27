import { ascendingBy, descendingBy, sort } from "../dotless";

interface Person {
    name: string;
    age: number;
}

test("sort with properties", () => {
    const tim12 = { name: "Tim", age: 12 };
    const abe21 = { name: "Abe", age: 21 };
    const mark21 = { name: "Mark", age: 21 };
    const bill22 = { name: "Bill", age: 22 };
    const items = [tim12, abe21, mark21, bill22];
    const sorter = sort<Person>(descendingBy("age"), ascendingBy("name"));
    const actual = sorter(items);
    const expected = [bill22, abe21, mark21, tim12];
    expect(actual).toEqual(expected);
});

test("sort with function 01", () => {
    const adi21 = { name: "Adi", age: 21 };
    const axe21 = { name: "Axe", age: 21 };
    const abe22 = { name: "Abe", age: 22 };
    const aro22 = { name: "Aro", age: 22 };
    const henry21 = { name: "Henry", age: 21 };
    const homer22 = { name: "Homer", age: 22 };
    const items = [adi21, axe21, abe22, aro22, henry21, homer22];
    const sorter = sort<Person>(
        descendingBy(x => x.name.length),
        descendingBy("age"),
        ascendingBy("name")
    );
    const actual = sorter(items);
    const expected = [homer22, henry21, abe22, aro22, adi21, axe21];
    expect(actual).toEqual(expected);
});

test("sort with function 02", () => {
    const adi21 = { name: "Adi", age: 21 };
    const axe21 = { name: "Axe", age: 21 };
    const abe22 = { name: "Abe", age: 22 };
    const aro22 = { name: "Aro", age: 22 };
    const henry22 = { name: "Henry", age: 22 };
    const homer22 = { name: "Homer", age: 22 };
    const items = [abe22, aro22, henry22, homer22, adi21, axe21];
    const sorter = sort<Person>(
        ascendingBy(x => x.name.length),
        ascendingBy("age"),
        descendingBy("name")
    );
    const actual = sorter(items);
    const expected = [axe21, adi21, aro22, abe22, homer22, henry22];
    expect(actual).toEqual(expected);
});

test("sort 01", () => {
    const adi21 = { name: "Adi", age: 21 };
    const axe21 = { name: "Axe", age: 21 };
    const items = [adi21, axe21];
    const sorter = sort(ascendingBy("age"));
    const actual = sorter(items);
    expect(actual).toEqual(items);
});

test("sort 02", () => {
    const adi21 = { name: "Adi", age: 21 };
    const axe20 = { name: "Axe", age: 20 };
    const items = [adi21, axe20];
    const sorter = sort(descendingBy("age"));
    const actual = sorter(items);
    expect(actual).toEqual(items);
});

interface Entity {
    name: string;
    founded: number;
}

test("sort 03", () => {
    const entitySorter = sort<Entity>(
        descendingBy("founded"),
        ascendingBy("name")
    );
    const city1 = { name: "New York", founded: 1624, state: "NY" };
    // Seattle was founded on 1851 and not 1833, this is just for testing
    const city2 = { name: "Seattle", founded: 1833, state: "WA" };
    const city3 = { name: "Chicago", founded: 1833, state: "IL" };
    expect(entitySorter([city1, city2, city3])).toEqual([city3, city2, city1]);
    const co1 = { name: "Microsoft", founded: 1975, founders: "BG, PA" };
    const co2 = { name: "Apple", founded: 1976, founders: "SJ, SW, RW" };
    const co3 = { name: "ABC", founded: 1976, founders: "AB" };
    expect(entitySorter([co1, co2, co3])).toEqual([co3, co2, co1]);
});
