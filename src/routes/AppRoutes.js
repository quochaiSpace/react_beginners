import { Routes, Route, Link } from "react-router-dom";

import Home from "../component/Home";
import Login from "../component/Login";
import TableUsers from "../component/TableUsers";
import PrivateRoute from "./PrivateRoute";

const AppRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />

                {/* <PrivateRoute path="/users">
          <TableUsers />
        </PrivateRoute> */}

                <Route
                    path="/users"
                    element={
                        <PrivateRoute>
                            <TableUsers />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </div>
    );
};

export default AppRoutes;
