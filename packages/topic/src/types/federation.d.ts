interface T {
  [key in string]: string
}

declare const __webpack_init_sharing__: (name: string, shareScope?: Scope) => Promise<void>

declare const __webpack_share_scopes__: Record<string, Partial<T>> = {
  default: Scope,
  [key in string]: T,
}

declare const __webpack_require__: {S: Scope}
