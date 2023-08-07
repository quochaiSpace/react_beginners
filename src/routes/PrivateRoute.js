import { Routes, Route, Link } from "react-router-dom";

import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";

const PrivateRoute = (props) => {
    const { user } = useContext(UserContext);

    if (user && !user.auth) {
        return <>You don't have Login!</>;
    }

    return <>{props.children}</>;
};

export default PrivateRoute;
