// import Traveler from 'utils/repos/Traveler/Traveler'
import {Hive} from 'Hive'
import MemoryManager from 'Memory'
import { ErrorMapper } from 'utils/ErrorMapper'
import Traveler from 'utils/Traveler'
import {initPrototypes} from './prototypes/initPrototypes'
import {Logger} from './utils/Logger'
import * as profiler from './utils/Profiler.js'
import {Report} from './utils/Report'

declare let global: any
initPrototypes()
profiler.enable()
// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  profiler.wrap(() => {
    Logger.debug(`===== Current game tick is ${Game.time} =====`)

    // Load Memory from the global object if it is there and up to date.
    // This way we cache Memory in global and we avoid the overhead of deserializing it every tick
    if (global.lastTick && global.LastMemory && Game.time === (global.lastTick + 1)) {
      delete global.Memory
      global.Memory = global.LastMemory
      RawMemory._parsed = global.LastMemory
    } else {
      global.LastMemory = RawMemory._parsed
      global.roomData = {}
    }
    global.lastTick = Game.time

    Hive.tick()

    try {
      if (Game.cpu.bucket > 4000) {
       // new Report().execute()
      } else {
        console.log(JSON.stringify('CPU USED: ' + Game.cpu.getUsed() + ' --- Bucket: ' + Game.cpu.bucket))
      }
    } catch (e) {
      console.log('error with Task_Report \n', e.stack)
    }
  })
})
