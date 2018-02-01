import {Settings} from '../Settings'
export class Logger {
  public static debug(message: string) {
    console.log(message)
  }

  public static info(message: string) {
    console.log('<span style=\'color: #5599e6\'>[INFO]</span> ' + message)
  }

  public static notice(message: string) {
    console.log('<span style=\'color: #FF4500\'>[NOTICE]</span> ' + message)
  }

  public static warn(message: string) {
    console.log('<span style=\'color: #ffd85b\'>[WARN]</span> ' + message)
  }

  public static error(message: string) {
    console.log('<span style=\'color: #ff5646\'>[ERROR]</span> ' + message)
  }

  public static cpuDebug(message: string) {
    if (Settings.CPU_DEBUG) {
      console.log('<span style=\'color: #00FF00\'>[CPU_DEBUG]</span> ' + message)
    }
  }

  public static travelDebug(message: string) {
    if (Settings.TRAVEL_DEBUG) {
      console.log('<span style=\'color: #00FF00\'>[TRAVEL_DEBUG]</span> ' + message)
    }
  }

  public static spawnDebug(message: string) {
    if (Settings.SPAWN_DEBUG) {
      console.log('<span style=\'color: #00FF00\'>[SPAWNER]</span> ' + message)
    }
  }
}
