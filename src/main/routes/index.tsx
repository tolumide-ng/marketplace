import * as React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./AppRouter";
import "../assets/styles/_variables.css";
import "../assets/styles/_base.css";
import "../assets/styles/_default.css";

export const Routes = () => (
    <Router>
        <AppRouter />
    </Router>
);

export default Routes;
