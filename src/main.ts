import { ErrorMapper } from 'utils/ErrorMapper'
import Traveler from 'utils/Traveler'
import {Logger} from './utils/Logger'
import {Report} from './utils/Report'
// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  Logger.info(`===== Current game tick is ${Game.time} =====`)

  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name]
    }
  }
  try {
    if (Game.cpu.bucket > 4000) {
      new Report().execute()
    } else {
      console.log(JSON.stringify('CPU USED: ' + Game.cpu.getUsed() + ' --- Bucket: ' + Game.cpu.bucket))
    }
  } catch (e) {
    console.log('error with Task_Report \n', e.stack)
  }
})
