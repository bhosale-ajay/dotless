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

export function mapMany<TSource, TResult>(convertor: (item: TSource) => IterableIterator<TResult>) {
    return function*(source: Iterable<TSource>) {
        for (const item of source) {
            yield* convertor(item);
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
                    initialValue: TResult) {
    return (source: Iterable<TSource>): TResult => {
        let accumulator = initialValue;
        let currentIndex = 0;
        for (const item of source) {
            accumulator = callback(accumulator, item, currentIndex++);
        }
        return accumulator;
    };
}

export function any<TSource>(predicate: (item: TSource) => boolean = _ => true) {
    return (source: Iterable<TSource>): boolean => {
        for (const item of source) {
            if (predicate(item)) {
                return true;
            }
        }
        return false;
    };
}

export function first<TSource>(predicate: (item: TSource) => boolean = _ => true) {
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

export function findPairs<TSource>(comparer: (a: TSource, b: TSource) => boolean,
                                   mutuallyExclusive = false) {
    return function*(source: TSource[]) {
        for (let thisIndex = 0; thisIndex < source.length; thisIndex++) {
            for (let thatIndex = mutuallyExclusive ? 0 : thisIndex + 1;
                     thatIndex < source.length;
                     thatIndex++) {
                if (thatIndex !== thisIndex &&
                    comparer(source[thisIndex], source[thatIndex])) {
                    yield [source[thisIndex], source[thatIndex], thisIndex, thatIndex];
                }
            }
        }
    };
}

export const toArray = Array.from;

export function query<T1, T2>(
    a: T1,
    b: (arg: T1) => T2): T2;
export function query<T1, T2, T3>(
    a: T1,
    b: (arg: T1) => T2,
    c: (arg: T2) => T3): T3;
export function query<T1, T2, T3, T4>(
    a: T1,
    b: (arg: T1) => T2,
    c: (arg: T2) => T3,
    d: (arg: T3) => T4): T4;
export function query<T1, T2, T3, T4, T5>(
    a: T1,
    b: (arg: T1) => T2,
    c: (arg: T2) => T3,
    d: (arg: T3) => T4,
    e: (arg: T4) => T5): T5;
export function query<T1, T2, T3, T4, T5, T6>(
    a: T1,
    b: (arg: T1) => T2,
    c: (arg: T2) => T3,
    d: (arg: T3) => T4,
    e: (arg: T4) => T5,
    f: (arg: T5) => T6): T6;
export function query<T1, T2, T3, T4, T5, T6, T7>(
    a: T1,
    b: (arg: T1) => T2,
    c: (arg: T2) => T3,
    d: (arg: T3) => T4,
    e: (arg: T4) => T5,
    f: (arg: T5) => T6,
    g: (arg: T6) => T7): T7;
export function query<T1, T2, T3, T4, T5, T6, T7, T8>(
    a: T1,
    b: (arg: T1) => T2,
    c: (arg: T2) => T3,
    d: (arg: T3) => T4,
    e: (arg: T4) => T5,
    f: (arg: T5) => T6,
    g: (arg: T6) => T7,
    h: (arg: T7) => T8): T8;
export function query<T1, T2, T3, T4, T5, T6, T7, T8, T9>(
    a: T1,
    b: (arg: T1) => T2,
    c: (arg: T2) => T3,
    d: (arg: T3) => T4,
    e: (arg: T4) => T5,
    f: (arg: T5) => T6,
    g: (arg: T6) => T7,
    h: (arg: T7) => T8,
    i: (arg: T8) => T9): T9;
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
    j: (arg: T9) => T10): T10;
export function query(... chain: any[]) {
    return chain.reduce((a, f) => f(a));
}

export function ascendingBy(property: string | ((obj: any) => any) = _ => _) {
    return (a: any, b: any) => {
        const aValue = (property instanceof Function) ? property(a) : a[property];
        const bValue = (property instanceof Function) ? property(b) : b[property];
        if (aValue > bValue) {
            return 1;
        } else if (aValue === bValue) {
            return 0;
        } else {
            return -1;
        }
    };
}

export function descendingBy(property: string | ((obj: any) => any) = _ => _) {
    return (a: any, b: any) => {
        const aValue = (property instanceof Function) ? property(a) : a[property];
        const bValue = (property instanceof Function) ? property(b) : b[property];
        if (aValue > bValue) {
            return -1;
        } else if (aValue === bValue) {
            return 0;
        } else {
            return 1;
        }
    };
}

export function sort<T>(...compareFns: Array<(a: T, b: T) => -1|0|1>) {
    const sorter = (a: T, b: T) => {
        let result = 0;
        for (const compareFn of compareFns) {
            result = compareFn(a, b);
            if (result !== 0) {
                return result;
            }
        }
        return result;
    };
    return (array: T[]) => array.sort(sorter);
}

export function matchesToArray<T = RegExpExecArray>(str: string,
                                  regex: RegExp,
                                  convertor: (x: RegExpExecArray) => T = _ => _ as unknown as T) {
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

export function groupBy<TSource>(property: string | ((obj: TSource) => string)) {
    return (source: Iterable<TSource>) => {
        const result: Dictionary<[TSource]> = {};
        for (const item of source) {
            const key = ((property instanceof Function) ? property(item) : (item as any)[property]).toString();
            result[key] = result[key] || [];
            result[key].push(item);
        }
        return result;
    };
}

export function countBy<TSource>(property: (string | ((obj: TSource) => string)) = x => x.toString()) {
    return (source: Iterable<TSource>) => {
        const result: Dictionary<number> = {};
        for (const item of source) {
            const key = ((property instanceof Function) ? property(item) : (item as any)[property]).toString();
            result[key] = (result[key] || 0) + 1;
        }
        return result;
    };
}
