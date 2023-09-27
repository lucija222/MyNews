export type NytMultimediaObj = {
    url: string;
    format: string;
    height: number;
    width: number;
    type: string;
    subtype: string;
    caption: string;
    copyright: string;
};

export interface NytArticleObj {
    section: string;
    title: string;
    url: string;
    byline: string;
    created_date: string;
    multimedia: Array<NytMultimediaObj>;
}

export interface NewsApiArticleObj {
    author: string,
    title: string;
    url: string;
    urlToImage: string,
    publishedAt: string;
}


export type NewDataArray = {
    url: string;
    title: string;
    byline: string;
    section: string;
    timestamp: string;
    img_src: string;
    img_objSrc: string;
    isFavorite: boolean;
}[];

export interface FilteredArticleObject {
    url: string;
    title: string;
    byline: string;
    section: string;
    timestamp: string;
    img_src: string;
    img_objSrc: string;
    isFavorite: boolean;
}