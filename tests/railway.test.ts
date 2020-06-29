import { buildTrain, relayTrain, ErrorResult, SuccessResult } from "../dotless";
import {
    Result,
    relayTrainAsync,
    PromiseResult,
    keptPromise
} from "../railway";

function successfulAsyncOps<T>(r: T): PromiseResult<T> {
    return keptPromise<T>(s => s(r));
}

function failedAsyncOps(): PromiseResult<any> {
    return keptPromise<any>((_, e) => e("Failed"));
}

test("buildTrain returns correct results", () => {
    const a = 12;
    const b = true;
    const c = "done";
    const r = buildTrain(
        () => new SuccessResult(a),
        () => new SuccessResult(b),
        () => new SuccessResult(c)
    );
    expect(r.IsSuccess).toEqual(true);
    if (r.IsSuccess) {
        const [x, y, z] = r.value;
        expect(x).toEqual(a);
        expect(y).toEqual(b);
        expect(z).toEqual(c);
    }
});

test("buildTrain returns error and do not call subsequent methods", () => {
    const a = 12;
    const errorMessage = "Some Error";
    const c = "done";
    let called = false;
    const r = buildTrain(
        () => new SuccessResult(a),
        () => new ErrorResult(errorMessage),
        () => {
            called = true;
            return new SuccessResult(c);
        }
    );
    expect(r.IsSuccess).toEqual(false);
    expect(called).toEqual(false);
    if (!r.IsSuccess) {
        expect(r.message).toEqual(errorMessage);
    }
});

test("relayTrain returns correct results", () => {
    const r = relayTrain(
        () => new SuccessResult("1234567890"),
        data => new SuccessResult(data.length),
        len => new SuccessResult(len % 2 === 0)
    );
    expect(r.IsSuccess).toEqual(true);
    if (r.IsSuccess) {
        expect(r.value).toEqual(true);
    }
});

test("relayTrain returns error and do not call subsequent methods", () => {
    let called = false;
    const errorMessage = "Not a correct input.";
    const r = relayTrain(
        () => new SuccessResult("1234567890"),
        // This casting is required for test code
        _ => new ErrorResult(errorMessage) as Result<number>,
        len => {
            called = true;
            return new SuccessResult(len % 2 === 0);
        }
    );
    expect(r.IsSuccess).toEqual(false);
    if (!r.IsSuccess) {
        expect(r.message).toEqual(errorMessage);
    }
    expect(called).toEqual(false);
});

// such call not possible with TypeScript, but can happen with JavaScript
test("relayTrain returns error when passed no relay functions", () => {
    const r = (relayTrain as any)();
    expect(r.IsSuccess).toEqual(false);
    if (!r.IsSuccess) {
        expect(r.message).toEqual("No actions provided.");
    }
});

// such call not possible with TypeScript, but can happen with JavaScript
test("relayTrainAsync returns correct results", async () => {
    const r = await relayTrainAsync(
        () => successfulAsyncOps("1234567890"),
        d => successfulAsyncOps(d.length),
        l => successfulAsyncOps(l === 10)
    );
    expect(r.IsSuccess).toEqual(true);
    if (r.IsSuccess) {
        expect(r.value).toEqual(true);
    }
});

test("relayTrainAsync returns error and do not call subsequent methods", async () => {
    let called = false;
    const r = await relayTrainAsync(
        () => successfulAsyncOps("1234567890"),
        _ => failedAsyncOps() as PromiseResult<number>,
        l => {
            called = true;
            return successfulAsyncOps(l === 10);
        }
    );
    expect(r.IsSuccess).toEqual(false);
    expect(called).toEqual(false);
});

// such call not possible with TypeScript, but can happen with JavaScript
test("relayTrainAsync returns error when passed no relay functions", async () => {
    const r = await (relayTrainAsync as any)();
    expect(r.IsSuccess).toEqual(false);
    if (!r.IsSuccess) {
        expect(r.message).toEqual("No actions provided.");
    }
});
