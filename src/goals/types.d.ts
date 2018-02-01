interface Goal {
  // TODO: Should this be a list? or a check if the prereq is currently met? maybe that should be two different functions?
  prerequisite(): boolean
  // TODO: This needs to be some kind of custom obj
  result(): boolean

  actions(): Action[]

}

interface Action {
  tick(): void
  complete(): void
}
