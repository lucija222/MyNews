export const sliceString = (string: string, maxLength: number) => {
    let slicedString = string.slice(0, maxLength);
    const lastWhiteSpaceIndex = slicedString.lastIndexOf(" ");

    if (lastWhiteSpaceIndex !== -1) {
        slicedString = slicedString.slice(0, lastWhiteSpaceIndex);
    }

    const lastCharacter = slicedString.slice(-1);

    if (lastCharacter === ("," || ";" || ":")) {
        slicedString = slicedString.slice(0, -1);
    }

    return `${slicedString.trim()}...`;
};
