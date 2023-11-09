import "./SearchFilter.scss";
import { SearchSvg } from "../../../assets/svg/svgImports";
import { SetIsLoadingContext } from "../../../context/IsLoadingProvider";
import { Dispatch, SetStateAction, FormEventHandler, useContext, useState, useRef, useEffect } from "react"; 
import { SelectedCategoryContext } from "../../../context/SelectedCategoryProvider";
import { EncodedSearchInputContext } from "../../../context/EncodedSearchInputProvider";
import { CategoryUrlContext } from "../../../context/urlContexts/CategoryUrlProvider";
import { WidgetUrlContext } from "../../../context/urlContexts/WidgetUrlProvider";

interface SearchFilterProps {
    isMenuOpen?: boolean,
    setIsMenuOpen?: Dispatch<SetStateAction<boolean>>
};

const SearchFilter = ({isMenuOpen, setIsMenuOpen }: SearchFilterProps) => {
    const [localSearchInput, setLocalSearchInput] = useState("");
    const placeholders = ["Search news", "Please enter a term to search"];
    const inputRef = useRef<null | HTMLInputElement>(null);

    const { setEncodedSearchInput } = useContext(EncodedSearchInputContext);
    const { setSelectedCategory } = useContext(SelectedCategoryContext);
    const { resetCardURLparams } = useContext(CategoryUrlContext);
    const { resetWidgetURLparams } = useContext(WidgetUrlContext);
    const { setIsCategoryLoading } = useContext(SetIsLoadingContext);

    const handleFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const inputCurrent = inputRef.current;

        if (!localSearchInput && inputCurrent?.placeholder === placeholders[0]) {
            inputCurrent.placeholder = placeholders[1];
            inputCurrent.classList.replace("placeholder_0", "placeholder_1");

        } else if (localSearchInput) {
            if (inputCurrent?.placeholder === placeholders[1]) {
                inputCurrent.placeholder = placeholders[0];
                inputCurrent.classList.replace("placeholder_1", "placeholder_0");
            }

            if (isMenuOpen && setIsMenuOpen) {
                setIsMenuOpen(false);
            }

            setEncodedSearchInput(encodeURIComponent(localSearchInput));
            resetCardURLparams();
            resetWidgetURLparams();
            setLocalSearchInput("");
            setSelectedCategory("searchResults");
            setIsCategoryLoading(true);
            window.scrollTo(0, 0);
        }
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
                    placeholder={placeholders[0]}
                    autoComplete="off"
                    ref={inputRef}
                    value={localSearchInput}
                    className="placeholder_0"
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
