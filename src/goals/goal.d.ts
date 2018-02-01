
interface Goal {
  prerequisite(): boolean; //TODO: Should this be a list?  or a check if the prereq is currently met?  maybe that should be two different functions?
  result(): boolean; //TODO: This needs to be some kind of custom obj
  tasks(): Action[];

}

interface Action {
  tick(): void;
  complete(): void;
}
