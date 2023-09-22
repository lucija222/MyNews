import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import { newsAPI_Key, nytAPI_Key } from "../util/helpers/constants";
import { SelectedCategoryContext } from "./SelectedCategoryProvider";
import { EncodedSearchInputContext } from "./EncodedSearchInputProvider";
import { IsFetchDataContext } from "./IsFetchDataProvider";

interface IApiURLContext {
    API_Card_URL: string;
    API_Widget_URL: string;
    changeCardURLparams: () => void;
    changeWidgetURLparams: () => void;
    resetCardURLparams: () => void;
}

export const ApiURLContext = createContext<IApiURLContext>({
    API_Card_URL: `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${nytAPI_Key}`,
    API_Widget_URL: `https://api.nytimes.com/svc/news/v3/content/all/all.json?limit=50&offset=0&api-key=${nytAPI_Key}`,
    changeCardURLparams: () => {},
    changeWidgetURLparams: () => {},
    resetCardURLparams: () => {},
});

const ApiURLProvider = ({ children }: { children: ReactNode }) => {
    const { selectedCategory } = useContext(SelectedCategoryContext);
    const { encodedSearchInput } = useContext(EncodedSearchInputContext);
    const { setIsFetchCategoryData, setIsFetchWidgetData } =
        useContext(IsFetchDataContext);

    const [cardURL_Offset, setCardURL_Offset] = useState(0);
    const [cardURL_PageNum, setCardURL_PageNum] = useState(1);
    const [API_Card_URL, setAPI_Card_URL] = useState(
        `https://api.nytimes.com/svc/news/v3/content/nyt/homepage.json?limit=100&offset=${cardURL_Offset}&api-key=${nytAPI_Key}`
    );

    const [widgetURL_Offset, setWidgetURL_Offset] = useState(0);
    const [API_Widget_URL, setAPI_Widget_URL] = useState(
        `https://api.nytimes.com/svc/news/v3/content/nyt/all.json?limit=100&offset=${widgetURL_Offset}&api-key=${nytAPI_Key}`
    );

    const resetCardURLparams = () => {
        setCardURL_Offset(0);
        console.log("RESET RAN");
        
        // setCardURL_PageNum(1);
    };

    const changeCardURLparams = () => {
        if (cardURL_Offset < 400) {
            if (selectedCategory !== "favorites") {
                switch (selectedCategory) {
                    // case "searchResults":
                    //     setCardURL_PageNum((prevNum) => {
                    //         console.log("PAGE NUM change");
                    //         return prevNum + 1;
                    //     });

                    //     return;

                    default:
                        setCardURL_Offset((prevNum) => {
                            console.log("CARD OFFSET change");
                            return prevNum + 100;
                        });

                        break;
                }
            }

            setTimeout(() => {
                console.log("ENTERING FETCH?");
                
                setIsFetchCategoryData(true);
            }, 10);
            return;
        }
        console.log("Hit max card offset num:", cardURL_Offset);
    };

    const changeWidgetURLparams = () => {
        console.log("WIDGET PARAMS RAN");

        if (widgetURL_Offset < 450) {
            setWidgetURL_Offset((prevNum) => {
                return prevNum + 100;
            });

            setTimeout(() => {
                setIsFetchWidgetData(true);
            }, 10);
            
            return;
        }

        console.log("Hit max widget offset num:", widgetURL_Offset);
    };

    // useEffect(() => {
    //     console.log("API CARD CHANGED", cardURL_Offset);
    //     // setIsFetchCategoryData(true);
    // }, [cardURL_Offset]);

    // useEffect(() => {
    //     console.log("API WIDGET CHANGED", widgetURL_Offset);
    //     // setIsFetchWidgetData(true);
    // }, [widgetURL_Offset]);

    // useEffect(() => {
    //     console.log("API WIDGET CHANGED", widgetURL_Offset, API_Widget_URL);
    //     setIsFetchWidgetData(true);
    // }, [widgetURL_Offset, API_Widget_URL]);

    useEffect(() => {
        // console.log(selectedCategory);
        switch (selectedCategory) {
            
            case "Home":
                setAPI_Card_URL(
                    `https://api.nytimes.com/svc/news/v3/content/nyt/homepage.json?limit=100&offset=${cardURL_Offset}&api-key=${nytAPI_Key}`
                );
                return;

            case "General":
                setAPI_Card_URL(
                    `https://api.nytimes.com/svc/news/v3/content/nyt/world.json?limit=100&offset=${cardURL_Offset}&api-key=${nytAPI_Key}`
                );
                return;

            case "searchResults":           
                setAPI_Card_URL(
                    `https://newsapi.org/v2/everything?q=${encodedSearchInput}&searchIn=title&language=en&page=${cardURL_PageNum}&apiKey=${newsAPI_Key}`
                );
                return;

                case "Favorites":
                    setAPI_Card_URL("");
                    return;

            default:
                setAPI_Card_URL(
                    `https://api.nytimes.com/svc/news/v3/content/nyt/${selectedCategory}.json?limit=100&offset=${cardURL_Offset}&api-key=${nytAPI_Key}`
                );
                return;
        }
    }, [
        selectedCategory,
        cardURL_Offset,
        cardURL_PageNum,
        encodedSearchInput
    ]);

    useEffect(() => {
        setAPI_Widget_URL(
            `https://api.nytimes.com/svc/news/v3/content/nyt/all.json?limit=100&offset=${widgetURL_Offset}&api-key=${nytAPI_Key}`
        );
    }, [widgetURL_Offset]);

    useEffect(() => {
        console.log("API CARD CHANGED", API_Card_URL);
    }, [API_Card_URL]);

    return (
        <ApiURLContext.Provider
            value={{
                API_Card_URL,
                API_Widget_URL,
                changeCardURLparams,
                changeWidgetURLparams,
                resetCardURLparams,
            }}
        >
            {children}
        </ApiURLContext.Provider>
    );
};

export default ApiURLProvider;

// useEffect(() => {
//     //Change updating to a function
//     switch (selectedCategory) {
//         case "home":
//             setAPI_Card_URL((prevURL) => {
//                 prev_API_Card_URLbeforeQuery.current =
//                     extractURLbeforeQuery(prevURL);
//                 return `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${nytAPI_Key}`;
//             });
//             break;
//         case "general":
//             setAPI_Card_URL((prevURL) => {
//                 prev_API_Card_URLbeforeQuery.current =
//                     extractURLbeforeQuery(prevURL);
//                 return `https://api.nytimes.com/svc/news/v3/content/nyt/homepage.json?limit=${cardURL_Limit}&offset=${cardURL_Offset}&api-key=${nytAPI_Key}`;
//             });
//             break;
//         case "favorites":
//             setAPI_Card_URL((prevURL) => {
//                 prev_API_Card_URLbeforeQuery.current =
//                     extractURLbeforeQuery(prevURL);
//                 return "";
//             });
//             break;
//         case "searchResults":
//             setAPI_Card_URL((prevURL) => {
//                 prev_API_Card_URLbeforeQuery.current =
//                     extractURLbeforeQuery(prevURL);
//                 return `https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=headline:("${searchFilterInput}")&page=${cardURL_PageNum}&sort=newest&api-key=${nytAPI_Key}`;
//             });
//             break;
//         default:
//             setAPI_Card_URL((prevURL) => {
//                 prev_API_Card_URLbeforeQuery.current =
//                     extractURLbeforeQuery(prevURL);
//                 return `https://api.nytimes.com/svc/news/v3/content/nyt/${selectedCategory}.json?limit=${cardURL_Limit}&offset=${cardURL_Offset}&api-key=${nytAPI_Key}`;
//             });
//             break;
//     }
// }, [
//     selectedCategory,
//     cardURL_Limit,
//     cardURL_Offset,
//     cardURL_PageNum,
//     searchFilterInput
// ]);

// if (selectedCategory !== "searchResults") {
//     setCardURL_Limit((prevNum) => {
//         return prevNum + 100;
//     });

//     setCardURL_Offset((prevNum) => {
//         return prevNum + 100;
//     });

//     return; //CHeck if this return works
// } else if (selectedCategory === "searchResults") {
//     setCardURL_PageNum((prevNum) => {
//         return prevNum + 1;
//     });
// }
