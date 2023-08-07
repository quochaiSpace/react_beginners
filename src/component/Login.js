import { useState } from "react";

import { loginApi } from "../Service/UserService";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [hidePassword, setHidePassword] = useState(false);

    const [loadingAPI, setLodingAPI] = useState(false);

    const navigate = useNavigate();

    const { loginContext } = useContext(UserContext);

    // useEffect(() => {
    //   let token = localStorage.getItem("token");
    //   if (token) {
    //     navigate("/");
    //   }
    // }, []);

    const handleLogin = async () => {
        if (!email || !password) {
            toast.error("Email & Password is required");
            return;
        }

        setLodingAPI(true);
        let res = await loginApi(email.trim(), password);
        if (res && res.token) {
            loginContext(email, res.token);
            navigate("/");
        } else {
            if (res && res.status === 400) {
                toast.error(res.data.error);
            }
        }
        setLodingAPI(false);
    };

    return (
        <div className="login-container col-12 col-sm-4">
            <div className="title">Login</div>
            <div className="text">Email or usernamme ( eve.holt@reqres.in ) </div>
            <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type="text"
                placeholder="Email or username..."
            />
            <div className="input-2">
                <input
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    type={hidePassword === true ? "text" : "password"}
                    placeholder="Password..."
                />

                <i
                    className={
                        hidePassword === true
                            ? "fa-solid fa-eye-slash"
                            : "fa-regular fa-eye"
                    }
                    onClick={() => setHidePassword(!hidePassword)}
                ></i>
            </div>

            <button
                disabled={email && password ? false : true}
                className={email && password ? "active" : ""}
                onClick={() => handleLogin()}
            >
                {loadingAPI && <i className="fa-solid fa-sync fa-spin"></i>} &nbsp;Login
            </button>

            <div className="back">Go back</div>
        </div>
    );
};

export default Login;
