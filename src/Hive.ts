export class Hive {
  private static someVar: string = `Hello World ${Hive.num}`
  private static num: number = 0

  public static tick() {
    console.log(`Hive tick`)

    const goals = Memory.getHiveGoals()

    // Automatically delete memory of missing creeps
    for (const name in Memory.creeps) {
      if (!(name in Game.creeps)) {
        delete Memory.creeps[name]
      }
    }

    for (const room in Memory.rooms) {
      console.log(`room memory: ${JSON.stringify(room)}`)
    }

    for (const room in Game.rooms) {
      console.log(`room: ${JSON.stringify(room)}`)
      console.log(`room ${JSON.stringify(room)} memory? ${JSON.stringify(Game.rooms[room].memory)}`)

    }
  }
}
