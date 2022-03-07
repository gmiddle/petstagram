import React, {useEffect, useRef} from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ModalProvider } from "./context/Modal";
import { setModalMount } from "./store/modal"
import { useDispatch } from "react-redux"

import configureStore from "./store";
import { csrfFetch } from "./store/csrf";
import * as sessionActions from "./store/session";

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
}

const Root = () => {
    const dispatch = useDispatch();
    const modalMooringRef = useRef(null);

    useEffect(() => {
        dispatch(setModalMount(modalMooringRef.current));
    }, [dispatch]);
    return (
        <>
            <App />
            <div ref={modalMooringRef} className="modal"></div>
        </>
    );
};

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <ModalProvider>
                <BrowserRouter>
                    <Root />
                </BrowserRouter>
            </ModalProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);