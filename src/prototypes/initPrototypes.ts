declare let global: any

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

  // This is called during global reset to set up structure memory,
  // because it doesn't need to be called often.
  if (!Memory.structures) {
    console.log('[Memory] Initializing structure memory')
    Memory.structures = {}
  }

  // Adds structure memory to OwnedStructure things.
  // Easier to reason about garbage collection in this implementation.
  Object.defineProperty(OwnedStructure.prototype, 'memory', {
    get() {
      if (!Memory.structures[this.id]) {
        Memory.structures[this.id] = {}
      }
      return Memory.structures[this.id]
    },
    set(v) {
      return _.set(Memory, 'structures.' + this.id, v)
    },
    configurable: true,
    enumerable: false
  })

// Call this periodically to garbage collect structure memory
// (I find once every 10k ticks is fine)
  global.GCStructureMemory = () => {
    for (const id in Memory.structures ) {
      if (!Game.structures[id]) {
        console.log('Garbage collecting structure ' + id + ', ' + JSON.stringify(Memory.structures[id]))
        delete Memory.structures[id]
      }
    }
  }

}
