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
