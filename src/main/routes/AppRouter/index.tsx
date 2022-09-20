import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router";
import ErrorBoundary from "../../pages/ErrorBoundary";
import { HomePage } from "../../pages/Home";
import "./index.css";

const AppRouter = () => {
    return (
        <div className="appwide">
            <main className="appwide-container">
                <ErrorBoundary>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                    </Routes>
                </ErrorBoundary>
            </main>
        </div>
    );
};

export default AppRouter;
