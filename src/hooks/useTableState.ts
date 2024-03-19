import { useTableStateStore } from '../zustand/store.ts'

export const useTableState = () => {
    const limit = useTableStateStore((state) => state.limit)
    const page = useTableStateStore((state) => state.page)
    return { limit, page }
}
