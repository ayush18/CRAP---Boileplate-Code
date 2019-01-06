import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import axiosMiddleware from "redux-axios-middleware";
import { composeWithDevTools } from "redux-devtools-extension";
import axios from "axios";
import swal from "sweetalert";

import reducers from "./reducers";

const axiosConfig = {
    axios: {
        // follow up to 10 HTTP 3xx redirects
        maxRedirects: 10,

        // cap the maximum content length we'll accept
        // to 50MBs
        maxContentLength: 50 * 1000 * 1000,

        /**
         * Set default BASE API URL Prefix
         */
        get baseURL() {
            return window.location.origin;
        },
    }
};

const axiosinstance = axios.create(axiosConfig.axios);
axiosinstance.interceptors.request.use((request) => {
    const token = window.authenticator.accessToken;
    request.headers.Authorization = `Bearer ${token}`;
    return request;
});

axiosinstance.interceptors.response.use(response => response, (error) => {
    if (error.response.status === 401) {
        swal({
            text: "Your session has expired. You are redirected to the login page.",
            dangerMode: true
        }).then((isOk) => {
            if (isOk) {
                window.location = "/";
            }
        });
        return Promise.reject(error);
    }
    return Promise.reject(error);
});


export default function configureStore(initialState = {}) {
    const middleware = [
        thunk,
        axiosMiddleware(axiosinstance)
    ];

    const composeEnhancers = composeWithDevTools({
        // Specify name here, actionsBlacklist, actionsCreators and other options if needed
    });

    return createStore(
        reducers,
        initialState,
        composeEnhancers(
            applyMiddleware(...middleware)
        )
    );
}
