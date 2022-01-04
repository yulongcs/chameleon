import {Dispatch, SetStateAction, useState} from 'react'
import {TablePaginationConfig} from 'antd/lib/table/interface'

export interface PageParams {
  pageSize: number
  pageNo: number
}
const defaultState: PageParams = {
  pageSize: 20,
  pageNo: 1,
}

function usePagination(
  initialState?: PageParams | (() => PageParams),
): [
  PageParams,
  (params: Partial<PageParams>) => void,
  number,
  Dispatch<SetStateAction<number>>,
  TablePaginationConfig,
] {
  const [pageParams, setPageParams] = useState(initialState || defaultState)
  const [pageTotal, setPageTotal] = useState<number>(0)
  const updateParams = (page: Partial<PageParams>) => {
    setPageParams(prevState => ({...prevState, ...page}))
  }

  const paginationConf: TablePaginationConfig = {
    current: pageParams.pageNo,
    total: pageTotal,
    pageSize: pageParams.pageSize,
    onChange: (pageNo: number, pageSize?: number) => {
      updateParams({pageNo, pageSize})
    },
    onShowSizeChange: (pageNo, pageSize) => {
      updateParams({pageNo, pageSize})
    },
  }

  return [pageParams, updateParams, pageTotal, setPageTotal, paginationConf]
}

export default usePagination
