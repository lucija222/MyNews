export const allowOrDisableScroll = (condition: boolean) => {
    const body = document.body;
    if (condition) {
        body.classList.add("disable-scroll");
    } else if (!condition) {
        body.classList.remove("disable-scroll");
    }
};
