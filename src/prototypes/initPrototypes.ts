export function initPrototypes() {

  // Add memory to all sources
  Object.defineProperty(Source.prototype, 'memory', {
    configurable: true,
    get() {
      if (_.isUndefined(Memory.sources)) {
        Memory.sources = {}
      }
      if (!_.isObject(Memory.sources)) {
        return undefined
      }
      return Memory.sources[this.id] = Memory.sources[this.id] || {}
    },
    set(value) {
      if (_.isUndefined(Memory.sources)) {
        Memory.sources = {}
      }
      if (!_.isObject(Memory.sources)) {
        throw new Error('Could not set source memory')
      }
      Memory.sources[this.id] = value
    }
  })

  // Add memory to all structures
  Object.defineProperty(Structure.prototype, 'memory', {
    configurable: true,
    get() {
      if (_.isUndefined(Memory.structures)) {
        Memory.structures = {}
      }
      if (_.isUndefined(Memory.structures[this.structureType])) {
        Memory.structures[this.structureType] = {}
      }
      if (!_.isObject(Memory.structures)) {
        return undefined
      }
      return Memory.structures[this.structureType][this.id] = Memory.structures[this.structureType][this.id] || {}
    },
    set(value) {
      if (_.isUndefined(Memory.structures)) {
        Memory.structures = {}
      }
      if (_.isUndefined(Memory.structures[this.structureType])) {
        Memory.structures[this.structureType] = {}
      }
      if (!_.isObject(Memory.structures)) {
        throw new Error('Could not set structure memory')
      }
      Memory.structures[this.structureType][this.id] = value
    }
  })

}
