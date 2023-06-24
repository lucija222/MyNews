import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import IsDesktopViewportProvider from "./context/IsDesktopViewportProvider";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <IsDesktopViewportProvider>
            <App />
        </IsDesktopViewportProvider>
    </React.StrictMode>
);
