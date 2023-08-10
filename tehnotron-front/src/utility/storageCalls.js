import AsyncStorage from "@react-native-async-storage/async-storage";

export const setItem = async (key, value, expirationTime) => {
    const timeNow = new Date();
    timeNow.setMinutes(timeNow.getMinutes() + expirationTime);

    const expiryTimeStamp = Math.floor(timeNow.getTime() / 1000);
    const data = {
        key: value,
        expiryTime: expiryTimeStamp
    };

    await AsyncStorage.setItem(key, JSON.stringify(data));
}

export const getItem = async (key) => {
    let item = await AsyncStorage.getItem(key);
    if (item !== null) {
        item = JSON.parse(item);
    }

    const currentTimeStamp = Math.floor(Date.now() / 1000);

    if (currentTimeStamp >= item?.expiryTime) {
        await AsyncStorage.removeItem(key);
        return null;
    }

    return item?.key;
}