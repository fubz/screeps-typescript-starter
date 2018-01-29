export class Hive {
  private static someVar: string = `Hello World ${Hive.num}`
  private static num: number = 0

  static tick() {
    console.log(`Static tick ${Hive.someVar}`)
  }
}
