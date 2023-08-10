import "./App.scss";
import Header from "./component/Header";
import Container from "react-bootstrap/Container";
import { ToastContainer, toast } from "react-toastify";

import { useEffect } from "react";

import AppRoutes from "./routes/AppRoutes";

import { handleRefresh } from "./redux/actions/userAction";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();


  useEffect(() => {
    if (localStorage.getItem("email")) {
      dispatch(handleRefresh());
    }
  }, []);

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
