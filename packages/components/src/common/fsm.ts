type EventsFromTransitions<T> = { [Prop in keyof T]: keyof T[Prop] }[keyof T]

export function fsm<
  TTransitions extends Record<TStates, Partial<Record<TEvents, TStates>>>,
  TStates extends keyof TTransitions,
  TEvents extends EventsFromTransitions<TTransitions>
>(config: TTransitions) {
  return {
    transition(currentState: TStates, event: TEvents) {
      const nextState = config[currentState][event] as TStates
      return nextState || currentState
    },
  }
}

export type Machine = ReturnType<typeof fsm>

export type States<T extends Machine | Machine["transition"]> = T extends Machine
  ? Parameters<T["transition"]>[0]
  : T extends Machine["transition"]
  ? Parameters<T>[0]
  : never

export type Events<T extends Machine | Machine["transition"]> = T extends Machine
  ? Parameters<T["transition"]>[1]
  : T extends Machine["transition"]
  ? Parameters<T>[1]
  : never
