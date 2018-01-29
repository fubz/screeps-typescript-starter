// import * as Profiler from 'utils/repos/Profiler/Profiler'
// import Traveler from 'utils/repos/Traveler/Traveler'
import Hive from 'Hive'
import MemoryManager from 'Memory'
import { ErrorMapper } from 'utils/ErrorMapper'

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  console.log(`===== Current game tick is ${Game.time} =====`)

  Hive.tick()
  // fubz

  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name]
    }
  }
})
