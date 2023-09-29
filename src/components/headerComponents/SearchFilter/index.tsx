import "./SearchFilter.scss";
import { SearchSvg } from "../../../assets/svg/svgImports";
import { ApiURLContext } from "../../../context/ApiURLProvider";
import { SetIsLoadingContext } from "../../../context/IsLoadingProvider";
import { IsFetchDataContext } from "../../../context/IsFetchDataProvider";
import { FormEventHandler, useContext, useState, useRef, useEffect } from "react"; 
import { SelectedCategoryContext } from "../../../context/SelectedCategoryProvider";
import { EncodedSearchInputContext } from "../../../context/EncodedSearchInputProvider";

interface SearchFilterProps {
    isMenuOpen?: boolean,
    closeMenu?: () => void
};

const SearchFilter = ({isMenuOpen, closeMenu }: SearchFilterProps) => {
    const [localSearchInput, setLocalSearchInput] = useState("");

    const { setEncodedSearchInput } = useContext(EncodedSearchInputContext);
    const { setSelectedCategory } = useContext(SelectedCategoryContext);
    const { resetCardURLparams } = useContext(ApiURLContext);
    const { setIsFetchCategoryData, debounceFetch } = useContext(IsFetchDataContext);
    const { setIsCategoryLoading } = useContext(SetIsLoadingContext);

    const inputRef = useRef<null | HTMLInputElement>(null);

    const handleFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsCategoryLoading(true);
        setEncodedSearchInput(encodeURIComponent(localSearchInput));
        resetCardURLparams();
        setLocalSearchInput("");
        setSelectedCategory("searchResults");
        
        if (isMenuOpen && closeMenu) {
            closeMenu();
        }

        debounceFetch(setIsFetchCategoryData);
        window.scrollTo(0, 0);
    };

    const handleClosingMobileKeyboardOnEnter = (
        keyboardEvent: KeyboardEvent
    ) => {
        const currentInputRef = inputRef.current;
        if (keyboardEvent.key === "Enter" && currentInputRef) {
            setTimeout(() => {
                currentInputRef?.blur();
            }, 20);
        }
    };

    useEffect(() => {
        const currentInputRef = inputRef.current;

        currentInputRef?.addEventListener(
            "keydown",
            handleClosingMobileKeyboardOnEnter
        );

        return () => {
            currentInputRef?.removeEventListener(
                "keydown",
                handleClosingMobileKeyboardOnEnter
            );
        };
    }, []);

    return (
        <form onSubmit={handleFormSubmit}>
            <div>
                <SearchSvg />
                <input
                    type="search"
                    id="search"
                    aria-label="Input field"
                    placeholder="Search news"
                    autoComplete="off"
                    ref={inputRef}
                    value={localSearchInput}
                    onChange={(e) => {
                        setLocalSearchInput(e.target.value);
                    }}
                />
            </div>
            <button type="submit" className="form-btn">
                SEARCH
            </button>
        </form>
    );
};

export default SearchFilter;
