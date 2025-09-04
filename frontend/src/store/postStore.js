import {persist, createJSONStorage} from "zustand/middleware";
import {create} from "zustand/react";


const initialStore = {
    post: null, content: null, comments: null, commentSortBy: "top"
};

export const usePostStore = create(persist((set) => ({
    ...initialStore,

    setPost: (data) => set({
        post: data,
    }), setCommentSortBy: (value) => set({
        commentSortBy: value,
    }), setContent: (data) => set({
        content: data,
    }), setComments: (data) => set({
        comments: data,
    }), clearPost: () => set({
        post: null,
    }), clearPostStore: () => set({...initialStore}),
}), {
    name: "post-storage", storage: createJSONStorage(() => sessionStorage),
}));
