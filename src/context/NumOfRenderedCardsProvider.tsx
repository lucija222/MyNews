import { PropsWithChildren, createContext, useState } from "react";

type SetNumOfRenderedCards = (
    numOrCallback: number | ((prevIndex: number) => number)
) => void;

export const numOfRenderedCardsContext = createContext<{
    numOfRenderedCategoryCards: number;
    setNumOfRenderedCategoryCards: SetNumOfRenderedCards;
    numOfRenderedWidgetCards: number;
    setNumOfRenderedWidgetCards: SetNumOfRenderedCards;
}>({
    numOfRenderedCategoryCards: 1,
    setNumOfRenderedCategoryCards: () => {},
    numOfRenderedWidgetCards: 1,
    setNumOfRenderedWidgetCards: () => {},
});

const NumOfRenderedCardsProvider = ({ children }: PropsWithChildren) => {
    const [numOfRenderedCategoryCards, setNumOfRenderedCategoryCards] = useState(1);
    const [numOfRenderedWidgetCards, setNumOfRenderedWidgetCards] = useState(1);

    return (
        <numOfRenderedCardsContext.Provider
            value={{
                numOfRenderedCategoryCards,
                setNumOfRenderedCategoryCards,
                numOfRenderedWidgetCards,
                setNumOfRenderedWidgetCards,
            }}
        >
            {children}
        </numOfRenderedCardsContext.Provider>
    );
};

export default NumOfRenderedCardsProvider;
