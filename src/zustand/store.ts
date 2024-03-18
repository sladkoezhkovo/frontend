import {create} from 'zustand'
import {devtools, persist} from 'zustand/middleware'
const store = (set: any) => ({
    email: null,
    update: (email: string) => set(() => ({ email: email })),
    logout: () => set(()=>({email:null})),
})

export const useUserStore = create(
    devtools(
        persist(
            store, { name: "userStore"}
        )
    )
)