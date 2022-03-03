import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import Router from "./routes/Router";

import "./scss/index.scss";
ReactDOM.render(
    <StrictMode>
        <Router />
    </StrictMode>,
    document.getElementById("root")
);
