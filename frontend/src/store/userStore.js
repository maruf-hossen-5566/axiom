import {persist} from "zustand/middleware";
import {create} from "zustand/react";

const initialStore = {
    isAuthenticated: false,
    user: null,
}

const useUserStore = create(persist((set) => ({
    ...initialStore,

    login: (userData) => set({
        isAuthenticated: true, user: userData
    }),
    logout: () => set({
        isAuthenticated: false, user: null
    }),
}), {
    name: "user-storage", getStorage: () => localStorage
}))

export default useUserStore;