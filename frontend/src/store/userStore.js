import {persist} from "zustand/middleware";
import {create} from "zustand/react";


const useUserStore = create(persist((set) => ({
    isAuthenticated: false,
    user: null,

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