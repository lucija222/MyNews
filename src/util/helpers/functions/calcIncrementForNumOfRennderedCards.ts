export const calcIncrementForNumOfRennderedCards = (
    remainingDataLength: number,
    standardIncrementNum: number
) => {
    let incrementNum: number;

    if (remainingDataLength >= standardIncrementNum) {
        incrementNum = standardIncrementNum;
    } else {
        incrementNum = remainingDataLength;
    }
    
    return incrementNum;
};