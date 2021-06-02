import React, { Component } from "react";
import { render } from "react-dom";
import HomePage from "./pages/HomePage";

function App(props) {
    return (
        <div>
            <HomePage />
        </div>
    );
}
const appDiv = document.getElementById("app");
render(<App/>, appDiv);