import { ReactNode, memo } from "react";
import EncodedSearchInputProvider from "./EncodedSearchInputProvider";
import IsLoadingProvider from "./IsLoadingProvider";
import SelectedCategoryProvider from "./SelectedCategoryProvider";
import UrlProviders from "./urlContexts/UrlProviders";

const ContextProviders = ({ children }: { children: ReactNode }) => {
    return (
        <SelectedCategoryProvider>
            <EncodedSearchInputProvider>
                <IsLoadingProvider>
                    <UrlProviders>
                        {children}
                    </UrlProviders>
                </IsLoadingProvider>
            </EncodedSearchInputProvider>
        </SelectedCategoryProvider>
    );
};

export default memo(ContextProviders);
