export const sliceString = (string: string, maxLength: number, type?: string) => {

    const checkLastCharForPunctuation = (text: string) => {
        const punctuationArray = [",", ".", ";", ":"];
        const lastChar = text.slice(-1);
        
        if (punctuationArray.includes(lastChar)) {
            text = text.slice(0, -1);
        }

        return text;
    };

    if (string.length < maxLength) {
        if (type === "author") {
            const newString = string.replace(/^By\s*/, "").trim();
            return newString;
        } else return checkLastCharForPunctuation(string);
    }

    let slicedString = string.slice(0, maxLength);
    const finalString = checkLastCharForPunctuation(slicedString);


    if (type === "author") {
        slicedString = slicedString.replace(/^By\s*/, "").trim();
      }

    return `${finalString.trim()}...`;
};