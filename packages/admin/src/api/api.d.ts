declare interface ApiRes<T> {
  code: number // (Integer)自定义状态码
  data: T
  message?: string // (String)状态码对应的提示信息,给前端展示
  msg?: string
  error?: string // (String)错误信息
  timestamp?: number // (Long)当前时间用于前台，因为前台时间不准确
  [k: string]: unknown
}

declare interface PaginationData<T> {
  total: number
  content: T[]
}

declare interface AdminPageParams {
  page: number
  size: number
}

declare interface Pageable {
  sort: {
    sorted: boolean
    unsorted: boolean
    empty: boolean
  }
  pageNumber: number
  pageSize: number
  offset: number
  paged: boolean
  unpaged: boolean
}

declare interface PageableData<T> {
  pageable: Pageable
  list: T[]
  total: number
}
