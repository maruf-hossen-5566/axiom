import {persist, createJSONStorage} from "zustand/middleware";
import {create} from "zustand/react";
import {del, get, set} from "idb-keyval";

const indexDBStorage = {
    getItem: async (name) => (await get(name)) || null,
    setItem: async (name, value) => await set(name, value),
    removeItem: async (name) => await del(name),
};


const initialStore = {
    thumbnail: null, title: "", content: "", tags: [],
}


export const usePostDetailStore = create(persist((set) => ({
    ...initialStore,

    setTitle: (value) => set({
        title: value
    }), setContent: (newContent) => set({
        content: newContent
    }), setThumbnail: (value) => set({
        thumbnail: value
    }), setTags: (value) => set({
        tags: value
    }),
    clearPostStore: () => set({
        ...initialStore
    })
}), {
    name: "post-detail-storage",
    storage: createJSONStorage(() => indexDBStorage),
}))

