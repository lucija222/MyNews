import React from "react";
import "./index.scss";
import App from "./App";
import ReactDOM from "react-dom/client";
import FeaturedOrLatestStateProvider from "./context/FeaturedOrLatestTogglerProvider";
import ViewportSizesProvider from "./context/ViewportSizesProvider";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <React.StrictMode>
        <ViewportSizesProvider>
            <FeaturedOrLatestStateProvider>
                <App />
            </FeaturedOrLatestStateProvider>
        </ViewportSizesProvider>
    </React.StrictMode>
);
