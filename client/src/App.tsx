import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Nav from "./components/Nav";

const App: React.FC = (): React.ReactElement => {
    return (
        <Fragment>
            <Nav />
            <Outlet />
        </Fragment>
    );
};

export default App;
