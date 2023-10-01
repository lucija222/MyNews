import { ReactNode } from "react";

import CategoryUrlProvider from "./CategoryUrlProvider";
import WidgetUrlProvider from "./WidgetUrlProvider";


const UrlProviders = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <CategoryUrlProvider>
                <WidgetUrlProvider>
                    {children}
                </WidgetUrlProvider>
            </CategoryUrlProvider>
        </>
    );
};

export default UrlProviders;
