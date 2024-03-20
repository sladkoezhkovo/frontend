import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
const userStore = (set: any) => ({
    email: null,
    update: (email: string) => set(() => ({ email: email })),
    logout: () =>
        set(() => {
            localStorage.removeItem('access_token')
            return { email: null }
        }),
})
export const useUserStore = create(
    devtools(persist(userStore, { name: 'userStore' }))
)

const selectedTableStore = (set) => ({
    table: 'users',
    update: (table: string) => set(() => ({ table: table })),
})

export const useSelectedTableStore = create(
    devtools(persist(selectedTableStore, { name: 'selectedTable' }))
)

interface tableState {
    page: number
    limit: number
}

const tableStateStore = (set: any) => ({
    limit: 10,
    page: 1,
    setLimit: (limit: number) =>
        set((state: tableState) => ({ limit, page: state.page })),
    setPage: (page: number) =>
        set((state: tableState) => ({ page, limit: state.limit })),
    reset: () => set(() => ({ page: 1, limit: 10 })),
})

export const useTableStateStore = create(
    devtools(tableStateStore, { name: 'tableStateStore' })
)
