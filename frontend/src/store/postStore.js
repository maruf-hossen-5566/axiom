import {persist, createJSONStorage} from "zustand/middleware";
import {create} from "zustand/react";
import {del, get, set} from "idb-keyval";

const indexDBStorage = {
    getItem: async (name) => (await get(name)) || null,
    setItem: async (name, value) => await set(name, value),
    removeItem: async (name) => await del(name),
};


export const usePostStore = create(persist((set) => ({
    thumbnail: {},
    title: "",
    content: "",
    tags: [],

    setTitle: (value) => set({
        title: value
    }),
    // setContent: (newContent) => set({content: newContent}),
    setContent: (content) => set({content}),
    setThumbnail: (value) => set({
        thumbnail: value
    }), setTags: (value) => set({
        tags: value
    }),
}), {
    name: "post-storage",
    // storage: localStorage
    // getStorage: () => localStorage
    storage: createJSONStorage(() => indexDBStorage),

}))

