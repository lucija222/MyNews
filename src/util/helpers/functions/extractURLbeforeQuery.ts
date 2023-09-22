export const extractURLbeforeQuery = (URL: string) => {
    const questionmarkIndex = URL.indexOf("?");
    if (questionmarkIndex !== -1) {
        const extractedURL = URL.slice(0, questionmarkIndex);
        return extractedURL;
    }
    console.error("extractURLbeforeQuery: URL has no query");
    
    return "";
};