declare let global: any

export function initMemoryPrototypes() {

  Memory.protoype.getHiveGoals = () => Memory.goals || {}

}
