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
})

export const useUserStore = create(
    devtools(persist(userStore, { name: 'userStore' }))
)

export const useTableStateStore = create(
    devtools(tableStateStore, { name: 'tableStateStore' })
)
