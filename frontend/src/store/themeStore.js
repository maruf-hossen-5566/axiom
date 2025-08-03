import {persist} from "zustand/middleware";
import {create} from "zustand/react";


const useThemeStore = create(persist((set) => ({
    isDarkMode: false,

    setIsDarkMode: (value) => set({
        isDarkMode: value
    }),


}), {
    name: "theme-storage", getStorage: () => localStorage
}))

export default useThemeStore;