export declare class ErrorResult {
    readonly message: string;
    readonly error: any;
    readonly IsSuccess = false;
    constructor(message: string, error?: any);
}
export declare class SuccessResult<T> {
    readonly value: T;
    readonly IsSuccess = true;
    constructor(value: T);
}
export declare type Result<T> = SuccessResult<T> | ErrorResult;
export declare type PromiseResult<T> = Promise<Result<T>>;
export declare type TrainBuilder<T> = Result<T> | (() => Result<T>);
export declare type TrainRelayAction<T1, T2> = (i: T1) => Result<T2>;
export declare type TrainRelayActionAsync<T1, T2> = (i: T1) => PromiseResult<T2>;
export declare function keptPromise<T>(callback: (success: (result: T) => void, failure: (message: string, error?: any) => void) => void): PromiseResult<T>;
export declare function buildTrain<T1, T2, T3>(a: TrainBuilder<T1>, b: TrainBuilder<T2>, c: TrainBuilder<T3>): Result<[T1, T2, T3]>;
export declare function buildTrain<T1, T2, T3, T4>(a: TrainBuilder<T1>, b: TrainBuilder<T2>, c: TrainBuilder<T3>, d: TrainBuilder<T4>): Result<[T1, T2, T3, T4]>;
export declare function buildTrain<T1, T2, T3, T4, T5>(a: TrainBuilder<T1>, b: TrainBuilder<T2>, c: TrainBuilder<T3>, d: TrainBuilder<T4>, e: TrainBuilder<T5>): Result<[T1, T2, T3, T4, T5]>;
export declare function buildTrain<T1, T2, T3, T4, T5, T6>(a: TrainBuilder<T1>, b: TrainBuilder<T2>, c: TrainBuilder<T3>, d: TrainBuilder<T4>, e: TrainBuilder<T5>, f: TrainBuilder<T6>): Result<[T1, T2, T3, T4, T5, T6]>;
export declare function relayTrain<T1, T2, T3>(a: TrainRelayAction<void, T1>, b: TrainRelayAction<T1, T2>, c: TrainRelayAction<T2, T3>): Result<T3>;
export declare function relayTrain<T1, T2, T3, T4>(a: TrainRelayAction<void, T1>, b: TrainRelayAction<T1, T2>, c: TrainRelayAction<T2, T3>, d: TrainRelayAction<T3, T4>): Result<T4>;
export declare function relayTrain<T1, T2, T3, T4, T5>(a: TrainRelayAction<void, T1>, b: TrainRelayAction<T1, T2>, c: TrainRelayAction<T2, T3>, d: TrainRelayAction<T3, T4>, e: TrainRelayAction<T4, T5>): Result<T5>;
export declare function relayTrain<T1, T2, T3, T4, T5, T6>(a: TrainRelayAction<void, T1>, b: TrainRelayAction<T1, T2>, c: TrainRelayAction<T2, T3>, d: TrainRelayAction<T3, T4>, e: TrainRelayAction<T4, T5>, f: TrainRelayAction<T5, T6>): Result<T6>;
export declare function relayTrain<T1, T2, T3, T4, T5, T6, T7>(a: TrainRelayAction<void, T1>, b: TrainRelayAction<T1, T2>, c: TrainRelayAction<T2, T3>, d: TrainRelayAction<T3, T4>, e: TrainRelayAction<T4, T5>, f: TrainRelayAction<T5, T6>, g: TrainRelayAction<T6, T7>): Result<T7>;
export declare function relayTrain<T1, T2, T3, T4, T5, T6, T7, T8>(a: TrainRelayAction<void, T1>, b: TrainRelayAction<T1, T2>, c: TrainRelayAction<T2, T3>, d: TrainRelayAction<T3, T4>, e: TrainRelayAction<T4, T5>, f: TrainRelayAction<T5, T6>, g: TrainRelayAction<T6, T7>, h: TrainRelayAction<T7, T8>): Result<T8>;
export declare function relayTrain<T1, T2, T3, T4, T5, T6, T7, T8, T9>(a: TrainRelayAction<void, T1>, b: TrainRelayAction<T1, T2>, c: TrainRelayAction<T2, T3>, d: TrainRelayAction<T3, T4>, e: TrainRelayAction<T4, T5>, f: TrainRelayAction<T5, T6>, g: TrainRelayAction<T6, T7>, h: TrainRelayAction<T7, T8>, i: TrainRelayAction<T8, T9>): Result<T9>;
export declare function relayTrainAsync<T1, T2, T3>(a: TrainRelayActionAsync<void, T1>, b: TrainRelayActionAsync<T1, T2>, c: TrainRelayActionAsync<T2, T3>): PromiseResult<T3>;
export declare function relayTrainAsync<T1, T2, T3, T4>(a: TrainRelayActionAsync<void, T1>, b: TrainRelayActionAsync<T1, T2>, c: TrainRelayActionAsync<T2, T3>, d: TrainRelayActionAsync<T3, T4>): PromiseResult<T4>;
export declare function relayTrainAsync<T1, T2, T3, T4, T5>(a: TrainRelayActionAsync<void, T1>, b: TrainRelayActionAsync<T1, T2>, c: TrainRelayActionAsync<T2, T3>, d: TrainRelayActionAsync<T3, T4>, e: TrainRelayActionAsync<T4, T5>): PromiseResult<T5>;
export declare function relayTrainAsync<T1, T2, T3, T4, T5, T6>(a: TrainRelayActionAsync<void, T1>, b: TrainRelayActionAsync<T1, T2>, c: TrainRelayActionAsync<T2, T3>, d: TrainRelayActionAsync<T3, T4>, e: TrainRelayActionAsync<T4, T5>, f: TrainRelayActionAsync<T5, T6>): PromiseResult<T6>;
export declare function relayTrainAsync<T1, T2, T3, T4, T5, T6, T7>(a: TrainRelayActionAsync<void, T1>, b: TrainRelayActionAsync<T1, T2>, c: TrainRelayActionAsync<T2, T3>, d: TrainRelayActionAsync<T3, T4>, e: TrainRelayActionAsync<T4, T5>, f: TrainRelayActionAsync<T5, T6>, g: TrainRelayActionAsync<T6, T7>): PromiseResult<T7>;
export declare function relayTrainAsync<T1, T2, T3, T4, T5, T6, T7, T8>(a: TrainRelayActionAsync<void, T1>, b: TrainRelayActionAsync<T1, T2>, c: TrainRelayActionAsync<T2, T3>, d: TrainRelayActionAsync<T3, T4>, e: TrainRelayActionAsync<T4, T5>, f: TrainRelayActionAsync<T5, T6>, g: TrainRelayActionAsync<T6, T7>, h: TrainRelayActionAsync<T7, T8>): PromiseResult<T8>;
export declare function relayTrainAsync<T1, T2, T3, T4, T5, T6, T7, T8, T9>(a: TrainRelayActionAsync<void, T1>, b: TrainRelayActionAsync<T1, T2>, c: TrainRelayActionAsync<T2, T3>, d: TrainRelayActionAsync<T3, T4>, e: TrainRelayActionAsync<T4, T5>, f: TrainRelayActionAsync<T5, T6>, g: TrainRelayActionAsync<T6, T7>, h: TrainRelayActionAsync<T7, T8>, i: TrainRelayActionAsync<T8, T9>): PromiseResult<T9>;
