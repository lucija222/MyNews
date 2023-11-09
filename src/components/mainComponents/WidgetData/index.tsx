import { useContext,  Dispatch, SetStateAction, memo } from "react";
import { IsLoadingContext } from "../../../context/IsLoadingProvider";
import { WidgetUrlContext } from "../../../context/urlContexts/WidgetUrlProvider";
import FetchData from "../FetchData";

interface WidgetDataProps {
    cardClass: "category-card" | "widget-card";
    setIsWidgetLoading: Dispatch<SetStateAction<boolean>>
}


const WidgetData = ({cardClass, setIsWidgetLoading}: WidgetDataProps) => {
    const { API_Widget_URL, changeWidgetURLparams, isMaxWidgetFetchCalls } = useContext(WidgetUrlContext);
    const { isWidgetLoading } = useContext(IsLoadingContext);

    return (
        <FetchData cardClass={cardClass} URL={API_Widget_URL} isLoading={isWidgetLoading} setIsLoading={setIsWidgetLoading} changeURLparams={changeWidgetURLparams} isMaxFetchCalls={isMaxWidgetFetchCalls}/>
    );
};

export default memo(WidgetData);