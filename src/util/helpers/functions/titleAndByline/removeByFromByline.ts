export const removeByFromByline = (byline: string) => {    
    
    if (byline.startsWith("By ")) {
        return byline.slice(3).trim();
    };

    return byline;
};
