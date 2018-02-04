import {EstablishFirstRoom} from '../../actions/hive/EstablishFirstRoom'

export class EstablishHive implements Goal {
  public prerequisite(): boolean {
    return true
  }

  public result(): boolean {
    return true
  }

  public actions(): Action[] {
    return [new EstablishFirstRoom()]
  }

}
