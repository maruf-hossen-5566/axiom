import {persist, createJSONStorage} from "zustand/middleware";
import {create} from "zustand/react";


const initialStore = {
    post: null, content: null, isLiked: false, likeCount: 0, comments: null, commentCount: 0, commentSortBy: "top"
};

export const usePostStore = create(persist((set) => ({
    ...initialStore,

    setPostData: (data) => set({...data}),

    setPost: (data) => set({
        post: data,
    }),
    setCommentSortBy: (value) => set({
        commentSortBy: value,
    }),
    setContent: (data) => set({
        content: data,
    }), setIsLiked: (value) => set({
        isLiked: value,
    }), setLikeCount: (value) => set({
        likeCount: value,
    }), setComments: (data) => set({
        comments: data,
    }), setCommentCount: (value) => set({
        commentCount: value,
    }), clearComments: () => set({
        comments: null,
    }), clearPost: () => set({
        post: null,
    }), clearPostStore: () => set({...initialStore}),
}), {
    name: "post-storage", storage: createJSONStorage(() => sessionStorage),
}));
