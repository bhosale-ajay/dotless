export declare function range(from: number, to: number, step?: number): IterableIterator<number>;
export declare function map<TSource, TResult>(convertor: (item: TSource) => TResult): (source: Iterable<TSource>) => IterableIterator<TResult>;
export declare function mapMany<TSource, TResult>(convertor: (item: TSource) => IterableIterator<TResult>): (source: Iterable<TSource>) => IterableIterator<TResult>;
export declare function mapWithLast<TSource, TResult>(convertor: (last: TResult, item: TSource) => TResult, seed: TResult): (source: Iterable<TSource>) => IterableIterator<TResult>;
export declare function filter<TSource>(predicate: (item: TSource) => boolean): (source: Iterable<TSource>) => IterableIterator<TSource>;
export declare function reduce<TSource, TResult>(callback: (accumulator: TResult, item: TSource, index: number) => TResult, initialValue: TResult): (source: Iterable<TSource>) => TResult;
export declare function any<TSource>(predicate?: (item: TSource) => boolean): (source: Iterable<TSource>) => boolean;
export declare function first<TSource>(predicate?: (item: TSource) => boolean): (source: Iterable<TSource>) => TSource | null;
export declare function take<TSource>(n: number): (source: Iterable<TSource>) => IterableIterator<TSource>;
export declare function findPairs<TSource>(comparer: (a: TSource, b: TSource) => boolean, mutuallyExclusive?: boolean): (source: TSource[]) => Iterable<[TSource, TSource, number, number]>;
export declare const toArray: {
    <T>(arrayLike: ArrayLike<T>): T[];
    <T, U>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
    <T>(iterable: Iterable<T> | ArrayLike<T>): T[];
    <T, U>(iterable: Iterable<T> | ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
};
export declare function query<T1, T2>(a: T1, b: (arg: T1) => T2): T2;
export declare function query<T1, T2, T3>(a: T1, b: (arg: T1) => T2, c: (arg: T2) => T3): T3;
export declare function query<T1, T2, T3, T4>(a: T1, b: (arg: T1) => T2, c: (arg: T2) => T3, d: (arg: T3) => T4): T4;
export declare function query<T1, T2, T3, T4, T5>(a: T1, b: (arg: T1) => T2, c: (arg: T2) => T3, d: (arg: T3) => T4, e: (arg: T4) => T5): T5;
export declare function query<T1, T2, T3, T4, T5, T6>(a: T1, b: (arg: T1) => T2, c: (arg: T2) => T3, d: (arg: T3) => T4, e: (arg: T4) => T5, f: (arg: T5) => T6): T6;
export declare function query<T1, T2, T3, T4, T5, T6, T7>(a: T1, b: (arg: T1) => T2, c: (arg: T2) => T3, d: (arg: T3) => T4, e: (arg: T4) => T5, f: (arg: T5) => T6, g: (arg: T6) => T7): T7;
export declare function query<T1, T2, T3, T4, T5, T6, T7, T8>(a: T1, b: (arg: T1) => T2, c: (arg: T2) => T3, d: (arg: T3) => T4, e: (arg: T4) => T5, f: (arg: T5) => T6, g: (arg: T6) => T7, h: (arg: T7) => T8): T8;
export declare function query<T1, T2, T3, T4, T5, T6, T7, T8, T9>(a: T1, b: (arg: T1) => T2, c: (arg: T2) => T3, d: (arg: T3) => T4, e: (arg: T4) => T5, f: (arg: T5) => T6, g: (arg: T6) => T7, h: (arg: T7) => T8, i: (arg: T8) => T9): T9;
export declare function query<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(a: T1, b: (arg: T1) => T2, c: (arg: T2) => T3, d: (arg: T3) => T4, e: (arg: T4) => T5, f: (arg: T5) => T6, g: (arg: T6) => T7, h: (arg: T7) => T8, i: (arg: T8) => T9, j: (arg: T9) => T10): T10;
export declare function ascendingBy(property?: string | ((obj: any) => any)): (a: any, b: any) => 1 | 0 | -1;
export declare function descendingBy(property?: string | ((obj: any) => any)): (a: any, b: any) => 1 | 0 | -1;
export declare function sort<T>(...compareFns: Array<(a: T, b: T) => -1 | 0 | 1>): (array: T[]) => T[];
export declare function matchesToArray<T = RegExpExecArray>(str: string, regex: RegExp, convertor?: (x: RegExpExecArray) => T): T[];
interface Dictionary<T> {
    [key: string]: T;
}
export declare function groupBy<TSource>(property: string | ((obj: TSource) => string)): (source: Iterable<TSource>) => Dictionary<[TSource]>;
export declare function countBy<TSource>(property?: (string | ((obj: TSource) => string))): (source: Iterable<TSource>) => Dictionary<number>;
export {};
