declare let global: any

export function initMemoryPrototypes() {

  // This doesn't work.... we need a MemoryManager??
  Memory.getHiveGoals = () => Memory.goals || {}
  // prototype isn't there?!!?
  // Memory.prototype.getHiveGoals = () => Memory.goals || {}

}
