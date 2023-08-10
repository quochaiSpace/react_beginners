import { useState } from "react";

import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { handleLoginRedux } from "../redux/actions/userAction";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [hidePassword, setHidePassword] = useState(false);



    const isLoading = useSelector(state => state.user.isLoading);
    const account = useSelector(state => state.user.account)

    const navigate = useNavigate();

    const dispatch = useDispatch();



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
        dispatch(handleLoginRedux(email, password))


        // let res = await loginApi(email.trim(), password);
        // if (res && res.token) {
        //     loginContext(email, res.token);
        //     navigate("/");
        // } else {
        //     if (res && res.status === 400) {
        //         toast.error(res.data.error);
        //     }
        // }
    };

    useEffect(() => {
        if (account && account.auth === true) {
            navigate("/");
        }
    }, [account])


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
                {isLoading && <i className="fa-solid fa-sync fa-spin"></i>} &nbsp;Login
            </button>

            <div className="back">Go back</div>
        </div>
    );

}
export default Login
