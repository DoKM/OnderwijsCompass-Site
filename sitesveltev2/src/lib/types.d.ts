export { LineInput, KeyValueArray}

type LineInput = {
    line1: string;
    line2: string;
    line3: string;
    timeStamp: number;
    formattedTime?: string;
};

type KeyValueArray = { key: string; value: number }[]