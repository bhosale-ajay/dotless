// Refer https://adventofcode.com/2016/day/1 for problem statement
import { first, mapMany, matchesToArray, query, reduce } from "../dotless";
import * as inputSets from "./aoc201601.ip";

interface Dictionary<T> {
    [key: string]: T;
}
type Factor = -1 | 0 | 1;
type LeftOrRight = "L" | "R";
type Direction = "north" | "east" | "south" | "west";
interface Point {
    x: number;
    y: number;
}
interface Position extends Point {
    direction: Direction;
}
interface Instruction {
    leftOrRight: LeftOrRight;
    steps: number;
}
interface Impact {
    xFactor: Factor;
    yFactor: Factor;
    nextDirection: Direction;
}
interface DirectionInformation {
    L: Impact;
    R: Impact;
}

const decrease: Factor = -1;
const noChange: Factor = 0;
const increase: Factor = 1;

const north: DirectionInformation = {
    L: {
        xFactor: decrease,
        yFactor: noChange,
        nextDirection: "west"
    },
    R: {
        xFactor: increase,
        yFactor: noChange,
        nextDirection: "east"
    }
};

const east: DirectionInformation = {
    L: {
        xFactor: noChange,
        yFactor: increase,
        nextDirection: "north"
    },
    R: {
        xFactor: noChange,
        yFactor: decrease,
        nextDirection: "south"
    }
};

const west: DirectionInformation = { L: east.R, R: east.L };
const south: DirectionInformation = { L: north.R, R: north.L };
const directions = { north, east, west, south };
const startingPosition: Position = {
    x: 0,
    y: 0,
    direction: "north"
};

const matchToInstruction = (m: RegExpExecArray) =>
    ({ leftOrRight: m[1], steps: +m[2] } as Instruction);

const readInstructions = (doc: string) =>
    matchesToArray(doc, /(R|L)(\d+)/g, matchToInstruction);

const getAbsDistance = (p: Point) => Math.abs(p.x) + Math.abs(p.y);

function turn(cp: Position, ins: Instruction): Position {
    const impact = directions[cp.direction][ins.leftOrRight];
    return {
        x: cp.x + impact.xFactor * ins.steps,
        y: cp.y + impact.yFactor * ins.steps,
        direction: impact.nextDirection
    };
}

function findShortestPath(document: string) {
    return query(
        readInstructions(document),
        reduce(turn, startingPosition),
        getAbsDistance
    );
}

function takeSteps(from: Position) {
    let { x, y, direction } = from;
    return function*({ leftOrRight, steps }: Instruction) {
        const { xFactor, yFactor, nextDirection } = directions[direction][
            leftOrRight
        ];
        for (let i = 0; i < steps; i++) {
            x = x + xFactor;
            y = y + yFactor;
            direction = nextDirection;
            yield { x, y };
        }
    };
}

function visitedTwice() {
    const visited: Dictionary<boolean> = {};
    return ({ x, y }: Point): boolean => {
        const key = `b${x}_${y}`;
        if (visited[key]) {
            return true;
        } else {
            visited[key] = true;
            return false;
        }
    };
}

const findHQ = (document: string) => {
    return query(
        readInstructions(document),
        mapMany(takeSteps(startingPosition)),
        first(visitedTwice()),
        p => (p ? getAbsDistance(p) : 0)
    );
};

test("AOC 2016 01 Part 01", () => {
    expect(findShortestPath(inputSets.ip0101)).toEqual(5);
    expect(findShortestPath(inputSets.ip0102)).toEqual(2);
    expect(findShortestPath(inputSets.ip0103)).toEqual(12);
    expect(findShortestPath(inputSets.ip0105)).toEqual(161);
});

test("AOC 2016 01 Part 02", () => {
    expect(findHQ(inputSets.ip0104)).toEqual(4);
    expect(findHQ(inputSets.ip0105)).toEqual(110);
});
