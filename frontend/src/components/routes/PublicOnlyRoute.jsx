import React from 'react';
import useUserStore from "@/store/userStore.js";
import {Navigate} from "react-router-dom";

const PublicOnlyRoute = ({children}) => {
    const isAuthenticated = useUserStore(state => state.isAuthenticated)

    if (isAuthenticated) {
        return <Navigate
            to={"/"}
            replace
        />
    }

    return children
};

export default PublicOnlyRoute;