import { nothing } from "lit"

// NOTE: the below generic versions cannot be used until this bug is fixed: https://github.com/runem/lit-analyzer/issues/207
// since lit-analyzer does not understand the use of nothing

// /**
//  * if value is truthy, return it, otherwise return nothing
//  */
// export function cond<T>(value: T): NonNullable<T> | typeof nothing

// /**
//  * if condition is truthy, return trueCase, otherwise return nothing
//  */
// export function cond<T>(condition: unknown, trueCase: T): T | typeof nothing

// /**
//  * condition is true, so always return trueCase
//  */
// export function cond<T>(condition: true, trueCase: T): T

// /**
//  * condition is false, to will always return nothing
//  */
// export function cond<T>(condition: false, trueCase: T): typeof nothing

// /**
//  * if condition is truthy, return trueCase, otherwise return falseCase
//  */
// export function cond<T, F>(condition: unknown, trueCase: T, falseCase: F): T | F

// /**
//  * condition is true, so always return trueCase
//  */
// export function cond<T, F>(condition: true, trueCase: T, falseCase: F): T

// /**
//  * condition is false, so always return falseCase
//  */
// export function cond<T, F>(condition: false, trueCase: T, falseCase: F): F

/**
 * if value is truthy, return it, otherwise return nothing
 */
export function cond(value: any): typeof value | typeof nothing

/**
 * if condition is truthy, return trueCase, otherwise return nothing
 */
export function cond(condition: unknown, trueCase: any): typeof trueCase | typeof nothing

/**
 * condition is true, so always return trueCase
 */
export function cond(condition: true, trueCase: any): typeof trueCase

/**
 * condition is false, to will always return nothing
 */
export function cond(condition: false, trueCase: any): typeof nothing

/**
 * if condition is truthy, return trueCase, otherwise return falseCase
 */
export function cond(condition: unknown, trueCase: any, falseCase: any): typeof trueCase | typeof falseCase

/**
 * condition is true, so always return trueCase
 */
export function cond(condition: true, trueCase: any, falseCase: any): typeof trueCase

/**
 * condition is false, so always return falseCase
 */
export function cond(condition: false, trueCase: any, falseCase: any): typeof falseCase

export function cond(condition: unknown, trueCase: any = condition, falseCase: any = nothing) {
  return condition ? trueCase : falseCase
}
