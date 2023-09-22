import { Dispatch, SetStateAction, createContext, useState, useEffect, ReactNode } from "react";

interface INumOfRenderedCardsContext {
    numOfRenderedCategoryCards: number;
    setNumOfRenderedCategoryCards: Dispatch<SetStateAction<number>>;
    numOfRenderedWidgetCards: number;
    setNumOfRenderedWidgetCards: Dispatch<SetStateAction<number>>;
};

export const NumOfRenderedCardsContext = createContext<INumOfRenderedCardsContext>({
    numOfRenderedCategoryCards: 16,
    setNumOfRenderedCategoryCards: () => {},
    numOfRenderedWidgetCards: 16,
    setNumOfRenderedWidgetCards: () => {},
});

const NumOfRenderedCardsProvider = ({ children }: {children: ReactNode}) => {
    const [numOfRenderedCategoryCards, setNumOfRenderedCategoryCards] =
        useState(16);
    const [numOfRenderedWidgetCards, setNumOfRenderedWidgetCards] =
        useState(16);

    useEffect(() => {
        console.log("cardNum", numOfRenderedCategoryCards);
        console.log("widgetNum", numOfRenderedWidgetCards);
    }, [numOfRenderedCategoryCards, numOfRenderedWidgetCards]);

    return (
        <NumOfRenderedCardsContext.Provider
            value={{
                numOfRenderedCategoryCards,
                setNumOfRenderedCategoryCards,
                numOfRenderedWidgetCards,
                setNumOfRenderedWidgetCards,
            }}
        >
            {children}
        </NumOfRenderedCardsContext.Provider>
    );
};

export default NumOfRenderedCardsProvider;