export const isValidString = (
    mainString: string,
    stringsToCheckArray: string[]
) => {
    if (!mainString) {
        return mainString;
    }

    const isValidString = stringsToCheckArray.some((string) =>
        mainString.includes(string)
    );
    return !isValidString;
};