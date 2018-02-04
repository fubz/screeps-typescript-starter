// type shim for nodejs' `require()` syntax
declare const require: (module: string) => any
// declare module 'screeps-profiler'

/// <reference path="./goals/types.d.ts"/>

interface RawMemory{
  _parsed: Memory
}

interface Room {
  setGoal(): void
}

interface Memory {
  getHiveGoals(): any
}
