export const sliceString = (string: string, maxLength: number, type?: string) => {
    if (string.length < maxLength) {
        if (type === "author") {
            const newString = string.replace(/^By\s*/, "").trim();
            return newString;
        } else return string;
    }

    let slicedString = string.slice(0, maxLength);
    const lastWhiteSpaceIndex = slicedString.lastIndexOf(" ");

    if (lastWhiteSpaceIndex !== -1) {
        slicedString = slicedString.slice(0, lastWhiteSpaceIndex);
    }

    const lastCharacter = slicedString.slice(-1);

    if (lastCharacter === ("," || ";" || ":")) {
        slicedString = slicedString.slice(0, -1);
    }

    if (type === "author") {
        slicedString = slicedString.replace(/^By\s*/, "").trim();
      }

    return `${slicedString.trim()}...`;
};
