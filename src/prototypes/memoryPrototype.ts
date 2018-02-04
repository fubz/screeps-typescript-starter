import RC2 from 'goals/hive/RCL2'

declare let global: any

export function initMemoryPrototypes() {

  Memory.protoype.getHiveGoals = () => Memory.goals || {}

}
