import { ReactNode } from "react";
import EncodedSearchInputProvider from "./EncodedSearchInputProvider";
import IsFetchDataProvider from "./IsFetchDataProvider";
import IsLoadingProvider from "./IsLoadingProvider";
import SelectedCategoryProvider from "./SelectedCategoryProvider";
import UrlProviders from "./urlContexts/UrlProviders";




const ContextProviders = ({ children }: { children: ReactNode }) => {
    return (
        <SelectedCategoryProvider>
            <EncodedSearchInputProvider>
                <IsLoadingProvider>
                    <IsFetchDataProvider>
                        <UrlProviders>
                            {children}
                        </UrlProviders>
                    </IsFetchDataProvider>
                </IsLoadingProvider>
            </EncodedSearchInputProvider>
        </SelectedCategoryProvider>
    );
};

export default ContextProviders;
