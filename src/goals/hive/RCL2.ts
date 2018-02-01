
export class RC2 implements Goal {
  public prerequisite(): boolean {
    return true
  }

  public result(): boolean {
    return true
  }

  public actions(): Action[] {
    return [new UpgradeController()]
  }

}
