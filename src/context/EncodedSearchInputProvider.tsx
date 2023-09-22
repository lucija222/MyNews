import { Dispatch, SetStateAction, ReactNode, createContext, useState } from "react";

interface ISearchFlterInputContext {
    encodedSearchInput: string;
    setEncodedSearchInput: Dispatch<SetStateAction<string>>;
};

export const EncodedSearchInputContext = createContext<ISearchFlterInputContext>({
    encodedSearchInput: "",
    setEncodedSearchInput: () => {},
});

const EncodedSearchInputProvider = ({ children }: {children: ReactNode}) => {
    const [encodedSearchInput, setEncodedSearchInput] = useState("");

    return (
        <EncodedSearchInputContext.Provider
            value={{
                encodedSearchInput,
                setEncodedSearchInput,
            }}
        >
            {children}
        </EncodedSearchInputContext.Provider>
    );
};

export default EncodedSearchInputProvider;