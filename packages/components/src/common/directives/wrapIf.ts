// some clever typing so that TS knows what happens if you pass true/false values
export function wrapIf<TInner, TWrapper>(
    condition: false,
    inner: () => TInner,
    wrapper: (inner: TInner) => TWrapper
  ): TInner
  export function wrapIf<TInner, TWrapper>(
    condition: true,
    inner: () => TInner,
    wrapper: (inner: TInner) => TWrapper
  ): TWrapper
  export function wrapIf<TInner, TWrapper>(
    condition: unknown,
    inner: () => TInner,
    wrapper: (inner: TInner) => TWrapper
  ): TInner | TWrapper
  
  /**
   * @returns if condition is truthy, return result of wrapper, passing result of inner as arg. if falsy, return result of inner
   */
  export function wrapIf<TInner, TWrapper>(condition: any, inner: () => TInner, wrapper: (innards: TInner) => TWrapper) {
    return condition ? wrapper(inner()) : inner()
  }
  