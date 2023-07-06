export const extractTime = (ISO8601: string) => {
    const T_Index = ISO8601.indexOf("T");

    if (T_Index !== -1) {
        const time = ISO8601.slice(T_Index + 1, T_Index + 6);
        const formattedTime = time.replace(/^0/, "");
        return formattedTime;
    }

    return "";
};