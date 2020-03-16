import Taro from "@tarojs/taro";
import { getGlobalData } from "./globalData";

async function getWxUserData() {
  const userData = getGlobalData("userData");
  if (userData) {
    return userData;
  }
  try {
    const userData = await Taro.getUserInfo();
    return userData;
  } catch (err) {
    return null;
  }
}

export { getWxUserData };
