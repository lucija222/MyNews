export const addElipsis = (string: string) => {
    const punctuationArray = [",", ".", ";", ":", "-", "_"];
    const lastChar = string.slice(-1);

    if (punctuationArray.includes(lastChar)) {
        string = string.slice(0, -1);
    }
    return `${string}...`;
};