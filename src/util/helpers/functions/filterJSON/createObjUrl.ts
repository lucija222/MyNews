export const createObjUrl = async (responsesArray: Response[]) => {
    const objUrlArray = responsesArray.map(async (response) => {
        if (!response.ok) {
            console.log("FALLBACK IMAGE");
            return "./images/onErrorImgURL.png";
        }

        const imgArrayBuffer = await response.arrayBuffer();
        const contentType = response.headers.get("content-type") || "image/*";
        const imgBlob = new Blob([imgArrayBuffer], { type: contentType });
        return URL.createObjectURL(imgBlob);
    });

    return objUrlArray;
};