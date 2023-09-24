import {
    FilteredArticleObject, NewDataArray, NewsApiArticleObj
} from "../../../../typesAndInterfaces/apiTandI";

export const filterNewsApiJson = (jsonData: any) => {
    
    let newDataArray: NewDataArray = [];

    if (jsonData.totalResults === 0) {
        const noResultsObj = {
            url: "",
            title: "No matches found",
            byline: "",
            section: "search result",
            timestamp: "",
            img_src: "",
            isFavorite: false,
        };
        newDataArray.push(noResultsObj);
        return newDataArray;
    }

    const isValidAuthorString = (author: string | null) => {
        if (!author) {
            return author;
        }
        
        return !author.includes(".com") && !author.includes("@");
    };

    const isValidImgURL = (imgURL: string) => {
        if (!imgURL) {
            return imgURL;
        }

        const doesImgUrlInclude = () => {
            const stringsToCheck = ["biztoc", "boingboing.net", "cnet.com", "cdn01.dailycaller", "i.cbc.ca", "ladbible.com", "//time.com"];
            const isValidUrl = stringsToCheck.some(string => imgURL.includes(string));
            return !isValidUrl;
        };

        return doesImgUrlInclude();
    };

    jsonData.articles.forEach((articleObj: NewsApiArticleObj) => {
        if (
            isValidAuthorString(articleObj.author) &&
            isValidImgURL(articleObj.urlToImage)
        ) {
            const mapped: FilteredArticleObject = {
                url: articleObj.url,
                title: articleObj.title,
                byline: articleObj.author,
                section: "search result",
                timestamp: articleObj.publishedAt,
                img_src: `//wsrv.nl/?url=${articleObj.urlToImage}&w=345`, //wsrv.nl - open source image service
                isFavorite: false,
            };

            newDataArray.push(mapped);
        }
    });

    return newDataArray;
};