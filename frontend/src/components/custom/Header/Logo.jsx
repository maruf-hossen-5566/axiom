import React from 'react';
import {Link} from "react-router-dom";

const Logo = () => {
    return (
        <>
            <Link to={"/"} className={"font-poppins font-bold text-3xl cursor-pointer"}>axiom</Link>
        </>
    );
};

export default Logo;