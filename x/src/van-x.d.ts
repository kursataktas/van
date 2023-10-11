import type { State } from "vanjs-core"

declare const isCalcFunc: unique symbol

export declare const calc: <R>(f: () => R) => () => R & {[isCalcFunc]: 1}

type TransformField<F> = Reactive<F extends () => infer R & {[isCalcFunc]: 1} ? R : F>

type KnownNonObjectTypes = string | number | boolean | bigint | symbol | Function | null | undefined

type StatesOf<T> = T extends KnownNonObjectTypes ?
  T : { [K in keyof T]: State<TransformField<T[K]>> }

type Reactive<T> = T extends KnownNonObjectTypes ?
  T : { [K in keyof T]: TransformField<T[K]> }

export declare const reactive: <T>(obj: T) => Reactive<T>
export declare const stateFields: <T>(obj: T) => StatesOf<T>
