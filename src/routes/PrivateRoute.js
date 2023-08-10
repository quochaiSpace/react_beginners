import { Routes, Route, Link } from "react-router-dom";

import { useEffect } from "react";
import { useSelector } from "react-redux";


const PrivateRoute = (props) => {
    const user = useSelector((state) => state.user.account);

    if (user && !user.auth) {
        return <>You don't have Login!</>;
    }

    return <>{props.children}</>;
};

export default PrivateRoute;
