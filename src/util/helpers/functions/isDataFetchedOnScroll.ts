export const isDataFetchedOnCategoryChange = (
    selectedCategory: string,
    URL: string
) => {
    const checkMatch = (match: RegExpMatchArray | null, condition: string) => {
        if (match && match[1] === condition) {
            return true;
        }
        return false;
    };

    switch (selectedCategory) {
        case "searchResults":
            const pageMatch = URL.match(/page=(\d+)/);
            return checkMatch(pageMatch, "1");

        default:
            const offsetMatch = URL.match(/offset=(\d+)/);
            return checkMatch(offsetMatch, "0");
    }
};