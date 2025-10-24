import {create} from "zustand/react";

const initialStore = {
    notifications: null
}

export const useNotificationStore = create(set => ({
    ...initialStore,

    setNotifications: (data) => set({
        notifications: data
    }),
    clearNotificationStore: () => set({
        ...initialStore
    })
}))