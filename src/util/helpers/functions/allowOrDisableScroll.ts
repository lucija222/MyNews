export const allowOrDisableScroll = (condition: boolean) => {
    const body = document.body;
    if (condition) {
        body.classList.replace("allow-scroll", "disable-scroll");
    } else if (!condition) {
        body.classList.replace("disable-scroll", "allow-scroll");
    }
};
