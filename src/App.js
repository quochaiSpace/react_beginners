import "./App.scss";
import Header from "./component/Header";
import TableUsers from "./component/TableUsers";
import Container from "react-bootstrap/Container";
import Home from "./component/Home";
import Login from "./component/Login";
import { ToastContainer, toast } from "react-toastify";
import { Routes, Route, Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "./context/UserContext";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const { user, loginContext } = useContext(UserContext);

  console.log(">>>>user: ", user);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      loginContext(
        localStorage.getItem("email"),
        localStorage.getItem("token")
      );
    }
  });

  return (
    <>
      <div className="app-container">
        <Header />
        <Container>
          <AppRoutes />
        </Container>

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </>
  );
}

export default App;
