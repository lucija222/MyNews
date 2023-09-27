import { NewDataArray } from "../../../../typesAndInterfaces/apiTandI";
import { filterNewsApiJson } from "./filterNewsApiJson";
import { filterNytNewswireApiJson } from "./filterNytNewswireApiJson";

export const filterJsonData = async (
    jsonData: any,
    selectedCategory: string,
    cardClass: string,
) => {
    const isSearchResults = selectedCategory === "searchResults";
    const isWidgetCard = cardClass === "widget-card";

    const newDataArray: NewDataArray =
        !isSearchResults || isWidgetCard
            ? await filterNytNewswireApiJson(
                  jsonData,
                  isWidgetCard,
                  selectedCategory
              )
            : await filterNewsApiJson(jsonData);

    return newDataArray;
};
