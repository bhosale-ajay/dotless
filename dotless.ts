export function* range(from: number, to: number, step = 1) {
    let current = from;
    if (step === 0) {
        return;
    }
    const directionFactor = step > 0 ? 1 : -1;
    while ((to - current) * directionFactor >= 0) {
        yield current;
        current = current + step;
    }
}

export function map<TSource, TResult>(convertor: (item: TSource) => TResult) {
    return function*(source: Iterable<TSource>) {
        for (const item of source) {
            yield convertor(item);
        }
    };
}

export function mapMany<TSource, TResult>(
    convertor: (item: TSource) => IterableIterator<TResult>
) {
    return function*(source: Iterable<TSource>) {
        for (const item of source) {
            yield* convertor(item);
        }
    };
}

export function mapWithLast<TSource, TResult>(
    convertor: (last: TResult, item: TSource) => TResult,
    seed: TResult
) {
    return function*(source: Iterable<TSource>) {
        let last = seed;
        for (const item of source) {
            last = convertor(last, item);
            yield last;
        }
    };
}

export function filter<TSource>(predicate: (item: TSource) => boolean) {
    return function*(source: Iterable<TSource>) {
        for (const item of source) {
            if (predicate(item)) {
                yield item;
            }
        }
    };
}

export function reduce<TSource, TResult>(
    callback: (accumulator: TResult, item: TSource, index: number) => TResult,
    initialValue: TResult
) {
    return (source: Iterable<TSource>): TResult => {
        let accumulator = initialValue;
        let currentIndex = 0;
        for (const item of source) {
            accumulator = callback(accumulator, item, currentIndex++);
        }
        return accumulator;
    };
}

export function any<TSource>(
    predicate: (item: TSource) => boolean = _ => true
) {
    return (source: Iterable<TSource>): boolean => {
        for (const item of source) {
            if (predicate(item)) {
                return true;
            }
        }
        return false;
    };
}

export function first<TSource>(
    predicate: (item: TSource) => boolean = _ => true
) {
    return (source: Iterable<TSource>): TSource | null => {
        for (const item of source) {
            if (predicate(item)) {
                return item;
            }
        }
        return null;
    };
}

export function take<TSource>(n: number) {
    return function*(source: Iterable<TSource>) {
        let fetched = 0;
        if (n < 1) {
            return;
        }
        for (const item of source) {
            yield item;
            if (++fetched === n) {
                break;
            }
        }
    };
}

export function findPairs<TSource>(
    comparer: (a: TSource, b: TSource) => boolean,
    mutuallyExclusive = false
) {
    return function*(
        source: TSource[]
    ): Iterable<[TSource, TSource, number, number]> {
        for (let thisIndex = 0; thisIndex < source.length; thisIndex++) {
            for (
                let thatIndex = mutuallyExclusive ? 0 : thisIndex + 1;
                thatIndex < source.length;
                thatIndex++
            ) {
                if (
                    thatIndex !== thisIndex &&
                    comparer(source[thisIndex], source[thatIndex])
                ) {
                    yield [
                        source[thisIndex],
                        source[thatIndex],
                        thisIndex,
                        thatIndex
                    ];
                }
            }
        }
    };
}

export function toArray<T>(arg: Generator<T, any, unknown> | Iterable<T>): T[] {
    return Array.from(arg) as T[];
}

export function query<T1, T2>(a: T1, b: (arg: T1) => T2): T2;
export function query<T1, T2, T3>(
    a: T1,
    b: (arg: T1) => T2,
    c: (arg: T2) => T3
): T3;
export function query<T1, T2, T3, T4>(
    a: T1,
    b: (arg: T1) => T2,
    c: (arg: T2) => T3,
    d: (arg: T3) => T4
): T4;
export function query<T1, T2, T3, T4, T5>(
    a: T1,
    b: (arg: T1) => T2,
    c: (arg: T2) => T3,
    d: (arg: T3) => T4,
    e: (arg: T4) => T5
): T5;
export function query<T1, T2, T3, T4, T5, T6>(
    a: T1,
    b: (arg: T1) => T2,
    c: (arg: T2) => T3,
    d: (arg: T3) => T4,
    e: (arg: T4) => T5,
    f: (arg: T5) => T6
): T6;
export function query<T1, T2, T3, T4, T5, T6, T7>(
    a: T1,
    b: (arg: T1) => T2,
    c: (arg: T2) => T3,
    d: (arg: T3) => T4,
    e: (arg: T4) => T5,
    f: (arg: T5) => T6,
    g: (arg: T6) => T7
): T7;
export function query<T1, T2, T3, T4, T5, T6, T7, T8>(
    a: T1,
    b: (arg: T1) => T2,
    c: (arg: T2) => T3,
    d: (arg: T3) => T4,
    e: (arg: T4) => T5,
    f: (arg: T5) => T6,
    g: (arg: T6) => T7,
    h: (arg: T7) => T8
): T8;
export function query<T1, T2, T3, T4, T5, T6, T7, T8, T9>(
    a: T1,
    b: (arg: T1) => T2,
    c: (arg: T2) => T3,
    d: (arg: T3) => T4,
    e: (arg: T4) => T5,
    f: (arg: T5) => T6,
    g: (arg: T6) => T7,
    h: (arg: T7) => T8,
    i: (arg: T8) => T9
): T9;
export function query<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
    a: T1,
    b: (arg: T1) => T2,
    c: (arg: T2) => T3,
    d: (arg: T3) => T4,
    e: (arg: T4) => T5,
    f: (arg: T5) => T6,
    g: (arg: T6) => T7,
    h: (arg: T7) => T8,
    i: (arg: T8) => T9,
    j: (arg: T9) => T10
): T10;
export function query(...chain: any[]) {
    return chain.reduce((a, f) => f(a));
}

export function ascendingBy<T>(property: keyof T | ((obj: T) => any) = _ => _) {
    return (a: T, b: T) => {
        const aValue = property instanceof Function ? property(a) : a[property];
        const bValue = property instanceof Function ? property(b) : b[property];
        if (aValue > bValue) {
            return 1;
        } else if (aValue === bValue) {
            return 0;
        } else {
            return -1;
        }
    };
}

export function descendingBy<T>(
    property: keyof T | ((obj: T) => any) = _ => _
) {
    return (a: T, b: T) => {
        const aValue = property instanceof Function ? property(a) : a[property];
        const bValue = property instanceof Function ? property(b) : b[property];
        if (aValue > bValue) {
            return -1;
        } else if (aValue === bValue) {
            return 0;
        } else {
            return 1;
        }
    };
}
type Compare<T> = (a: T, b: T) => -1 | 0 | 1;
export function mergeCompareFns<T>(...compareFns: Array<Compare<T>>) {
    return (a: T, b: T) => {
        let result = 0;
        for (const compareFn of compareFns) {
            result = compareFn(a, b);
            if (result !== 0) {
                return result;
            }
        }
        return result;
    };
}

export function sort<T>(a: Compare<T>): <U extends T>(array: U[]) => U[];
export function sort<T1, T2 = T1>(
    a: Compare<T1>,
    b: Compare<T2>
): <U extends T1 & T2>(array: U[]) => U[];
export function sort<T1, T2 = T1, T3 = T1>(
    a: Compare<T1>,
    b: Compare<T2>,
    c: Compare<T3>
): <U extends T1 & T2 & T3>(array: U[]) => U[];
export function sort<T1, T2 = T1, T3 = T1, T4 = T1>(
    a: Compare<T1>,
    b: Compare<T2>,
    c: Compare<T3>,
    d: Compare<T4>
): <U extends T1 & T2 & T3 & T4>(array: U[]) => U[];
export function sort<T1, T2 = T1, T3 = T1, T4 = T1, T5 = T1>(
    a: Compare<T1>,
    b: Compare<T2>,
    c: Compare<T3>,
    d: Compare<T4>,
    e: Compare<T5>
): <U extends T1 & T2 & T3 & T4 & T5>(array: U[]) => U[];
export function sort<T>(...compareFns: Array<Compare<T>>) {
    return <U extends T>(array: U[]) =>
        array.sort(mergeCompareFns(...compareFns));
}

export function matchesToArray<T = RegExpExecArray>(
    str: string,
    regex: RegExp,
    convertor: (x: RegExpExecArray) => T = _ => (_ as unknown) as T
) {
    let m = regex.exec(str);
    const result: T[] = [];
    while (m !== null) {
        /* istanbul ignore next */
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }
        result.push(convertor(m));
        m = regex.exec(str);
    }
    return result;
}

interface Dictionary<T> {
    [key: string]: T;
}

export function groupBy<TSource>(
    property: keyof TSource | ((obj: TSource) => string)
) {
    return (source: Iterable<TSource>) => {
        const result: Dictionary<TSource[]> = {};
        for (const item of source) {
            const key = String(
                property instanceof Function ? property(item) : item[property]
            );
            result[key] = result[key] === undefined ? [] : result[key];
            result[key].push(item);
        }
        return result;
    };
}

export function countBy<TSource>(
    property: keyof TSource | ((obj: TSource) => string) = x => String(x)
) {
    return (source: Iterable<TSource>) => {
        const result: Dictionary<number> = {};
        for (const item of source) {
            const key = String(
                property instanceof Function ? property(item) : item[property]
            );
            result[key] = (result[key] === undefined ? 0 : result[key]) + 1;
        }
        return result;
    };
}

export function* cycle<T>(input: Iterable<T>) {
    while (true) {
        yield* input;
    }
}

export function count<TSource>(
    predicate: (item: TSource) => boolean = _ => true
) {
    return (source: Iterable<TSource>) => {
        let countOfItems = 0;
        for (const item of source) {
            if (predicate(item)) {
                countOfItems = countOfItems + 1;
            }
        }
        return countOfItems;
    };
}

export function each<TSource>(action: (item: TSource) => void) {
    return function*(source: Iterable<TSource>) {
        for (const item of source) {
            action(item);
            yield item;
        }
    };
}

export function* iterate<T>(iterator: (current: T) => T, base: T) {
    let current = base;
    yield current;
    while (true) {
        current = iterator(current);
        yield current;
    }
}
