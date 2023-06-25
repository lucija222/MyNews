import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import IsDesktopViewportProvider from "./context/IsDesktopViewportProvider";
import FeaturedOrLatestTogglerProvider from "./context/FeaturedOrLatestTogglerProvider";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <IsDesktopViewportProvider>
            <FeaturedOrLatestTogglerProvider>
                <App />
            </FeaturedOrLatestTogglerProvider>
        </IsDesktopViewportProvider>
    </React.StrictMode>
);
