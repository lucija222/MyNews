export const createObjUrl = async (responsesArray: Response[]) => {
    const objUrlArray = responsesArray.map(async (response) => {
        if (!response.ok) {
            return "./images/onErrorImgURL.png";
        }

        const imgBlob = await response.blob(); 
        return URL.createObjectURL(imgBlob);
    });

    return objUrlArray;
};