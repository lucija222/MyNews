import { ReactNode, createContext, useEffect, useState, useCallback, memo} from "react";

export interface FavoriteArticleData {
    url: string;
    title: string;
    byline: string;
    section: string;
    timestamp: string;
    img_src: string;
    img_objSrc: string;
    isFavorite: boolean;
};

interface TFavoriteArticlesDataContext {
    favoriteArticlesArray: FavoriteArticleData[];
    updateFavoriteArticlesArray: (
        newFavoriteArticleObject: FavoriteArticleData,
        isArticleFavorite: boolean
    ) => void;
};

export const FavoriteArticlesDataContext = createContext<TFavoriteArticlesDataContext>({
    favoriteArticlesArray: [],
    updateFavoriteArticlesArray: () => {},
});

const FavoriteArticlesDataProvider = ({ children }: {children: ReactNode}) => {
    const [favoriteArticlesArray, setFavoriteArticlesArray] = useState<
        FavoriteArticleData[]
    >([]);

    useEffect(() => {
        const localStorageData = localStorage.getItem("favoriteArticlesArray");
        const parsedLocalStorageData = localStorageData
            ? JSON.parse(localStorageData)
            : null;
        const initialFavoriteArticlesArray: FavoriteArticleData[] =
            Array.isArray(parsedLocalStorageData) ? parsedLocalStorageData : [];
        setFavoriteArticlesArray(initialFavoriteArticlesArray);
    }, []);

    const updateFavoriteArticlesArray = useCallback((
        newFavArticleObject: FavoriteArticleData,
        isArticleFavorite: boolean
    ) => {
        setFavoriteArticlesArray((prevArray) => {
            let updatedArray;
            
            const duplicateArticleIndex = prevArray.findIndex((article) => {
                return (
                    article.url === newFavArticleObject.url 
                );
            });

            if (isArticleFavorite) {
                if (duplicateArticleIndex !== -1) {
                    return prevArray;
                }
                updatedArray = [...prevArray, newFavArticleObject];

            } else {
                updatedArray = prevArray.filter((article, index) => {
                    return index !== duplicateArticleIndex;
                });
            }

            localStorage.setItem(
                "favoriteArticlesArray",
                JSON.stringify(updatedArray)
            );

            return updatedArray;
        });
    }, []);

    return (
        <FavoriteArticlesDataContext.Provider
            value={{ favoriteArticlesArray, updateFavoriteArticlesArray }}
        >
            {children}
        </FavoriteArticlesDataContext.Provider>
    );
};

export default memo(FavoriteArticlesDataProvider);