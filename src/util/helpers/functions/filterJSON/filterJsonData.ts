import { MutableRefObject } from "react";
import { NewDataArray } from "../../../../typesAndInterfaces/apiTandI";
import { filterNewsApiJson } from "./filterNewsApiJson";
import { filterNytNewswireApiJson } from "./filterNytNewswireApiJson";

export const filterJsonData = (
    jsonData: any,
    selectedCategory: string,
    cardClass: string,
    newsAPItotalResultsRef: MutableRefObject<number>
) => {
    const isSearchResults = selectedCategory === "searchResults";
    const isGeneralCategory = selectedCategory === "General";
    const isWidgetCard = cardClass === "widget-card";

    const newDataArray: NewDataArray =
        !isSearchResults || isWidgetCard
            ? filterNytNewswireApiJson(
                  jsonData,
                  isWidgetCard,
                  isGeneralCategory
              )
            : filterNewsApiJson(jsonData, newsAPItotalResultsRef);

    return newDataArray;
};
