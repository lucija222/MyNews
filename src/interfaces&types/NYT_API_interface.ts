interface NytArticle {
    slug_name: string;
    section: string;
    subsection: string;
    title: string;
    abstract: string;
    uri: string;
    url: string;
    byline: string;
    thumbnail_standard: string;
    item_type: string;
    source: string;
    updated_date: string;
    created_date: string;
    published_date: string;
    first_published_date: string;
    material_type_facet: string;
    kicker: string;
    subheadline: string;
    des_facet: string[];
    org_facet: null;
    per_facet: null | string[];
    geo_facet: null;
    related_urls: null;
    multimedia: Multimedia;
}

type Multimedia = {
    url: string;
    format: string;
    height: number;
    width: number;
    type: string;
    subtype: string;
    caption: string;
    copyright: string;
};

export type Filtered_NytAPI_Data = Array<NytArticle>;

export type NewDataArray = [
    {
        url: string;
        title: string;
        byline: string;
        section: string;
        timestamp: string;
        img_src: string;
    }
];

export interface filtered_Newswire {
    section: string;
    title: string;
    url: string;
    byline: string;
    created_date: string;
    multimedia: Array<Multimedia>;
}
