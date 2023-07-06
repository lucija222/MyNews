export type Multimedia = {
    url: string;
    format: string;
    height: number;
    width: number;
    type: string;
    subtype: string;
    caption: string;
    copyright: string;
};

export interface filteredAPIdata {
    section: string;
    title: string;
    url: string;
    byline: string;
    created_date: string;
    multimedia: Array<Multimedia>;
}

export type NewDataArray = 
    {
        url: string;
        title: string;
        byline: string;
        section: string;
        timestamp: string;
        img_src: string;
        isFavorite: boolean;
    }[];