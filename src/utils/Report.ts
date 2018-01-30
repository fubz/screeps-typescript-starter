import {Logger} from './Logger'
import {Task} from './Task'

declare let global: any;

export class Report extends Task {
  private reportCpuUsage = 0
  private static SIMULATION_ROOM = 'sim'
  private rooms: Room[] = []

  public execute(): void {
    this.reportCpuUsage = Game.cpu.getUsed()
    Logger.info('')
    let tick = Game.rooms[Report.SIMULATION_ROOM] ? ' ' + Game.time : ' '
    Logger.info("=== <span style='color: #5599e6'>Report</span>" + tick + " ===");
    // Prevents code from breaking in simulation room
    let cpuReport = Game.rooms[Report.SIMULATION_ROOM] ? 'Sim' : this.getCpuUsageReport()
    let secondCpuReport = Game.rooms[Report.SIMULATION_ROOM] ? 'Sim' : this.getCpuAverages()
    Logger.info(cpuReport + secondCpuReport)

    for (let name in Game.rooms) {
      if (Game.rooms.hasOwnProperty(name)) {
        if (this.needToReport(Game.rooms[name])) {
          this.rooms.push(Game.rooms[name])
        }
      }
    }
    Logger.info('Report Used: ' + (Game.cpu.getUsed() - this.reportCpuUsage) + ' CPU')
  }

  private needToReport(room: Room): boolean {
    if (room.controller === undefined) {
      return false
    }

    if (!room.controller.my) {
      return false
    }

    return true
  }

  private getCpuAverages(): string {
    let tenAvg = this.calculateCPUAverage(10)
    let hunAvg = this.calculateCPUAverage(100)
    let thoAvg = this.calculateCPUAverage(1000)
    let num = 0
    return ' --- Avg:' + '(Ten: ' + tenAvg.toString().slice(0, 5) + ') -- ' + '(Hundred: ' + hunAvg.toString().slice(0, 5) + ') -- ' + '(Thousand: ' + thoAvg.toString().slice(0, 5) + ')'
  }

  private calculateCPUAverage(n: number): number {
    const stack = Memory.global['cpu_stack']
    if (stack.length > n) {
      let sum = 0
      let arr = stack.slice(-n);
      for (let i = arr.length; !!i--; ) {
        sum += arr[i];
      }
      return sum / n
    }
    let newSum = 0
    let arr2 = stack.slice(-n);
    for (let l = arr2.length; !!l--; ) {
      newSum += arr2[l];
    }
    return newSum / stack.length
  }

  private getCpuUsageReport(): string {

    let color = "#79CB44";
    let cpu = Game.cpu.getUsed().toString().slice(0, 5)
    let cpuLimit = Game.cpu.limit.toString()
    let moreInfo = "OK"

    if (cpu > cpuLimit) {
      color = "#e67f7f" // red'ish
      moreInfo = "SHIT"
    }
    // track average cpu
    let stack = Memory.global["cpu_stack"] || [];
    stack.push(Game.cpu.getUsed());
    if (stack.length > 1000) {
      stack.shift();
    }
    Memory.global["cpu_stack"] = stack;

    let bucket = Game.cpu.bucket.toString()
    return "CPU Usage: <span style='color: " + color + "'>" + cpu + " / " + cpuLimit + " (" + moreInfo + ") " + " Bucket: " + bucket + "</span>";
  }
}
//Profiler.registerClass(Report, "Report")
