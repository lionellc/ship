import Taro from "@tarojs/taro";
// import { getGlobalData } from "./globalData";

// async function getUserInfo() {
//   const userData = getGlobalData("userData");
//   if (userData) {
//     return userData;
//   }
//   try {
//     const userData = await Taro.getUserInfo();
//     return userData;
//   } catch (err) {
//     console.log(err);
//     console.log("微信登录或用户接口故障");
//     return {};
//   }
// }

async function getOpenId() {
  let openId;
  try {
    openId = Taro.getStorageSync("lionel_ship_openid");
  } catch (err) {
    console.log(err);
  }

  if (openId) {
    return openId;
  } else {
    const res: any = await Taro.cloud.callFunction({
      name: "user",
      data: {
        func: "getOpenId"
      }
    });

    console.log(res);
    const openId = res.result.data.openId;
    Taro.setStorage({ key: "lionel_ship_openid", data: openId });
    return openId;
  }
}

// async function getIsAuth() {
//   const openid = await getOpenId();
//   let { userInfo } = await getUserInfo();
//   let isAuth = false;
//   if (userInfo) {
//     userInfo.isAuth = true;
//     userInfo._id = openid;
//     isAuth = true;
//   } else {
//     userInfo = {
//       _id: openid,
//       isAuth: false
//     };
//   }

//   console.log(userInfo, "userInfo");
//   const data = await Taro.cloud.callFunction({
//     name: "user",
//     data: {
//       func: "addUser",
//       data: userInfo
//     }
//   });
//   console.log(data);
//   return isAuth;
// }

const PAGE_LEVEL_LIMIT = 10;
function jumpUrl(url, options: { method?: string } = {}) {
  const pages = Taro.getCurrentPages();
  let method = options.method || "navigateTo";
  if (url && typeof url === "string") {
    if (method == "navigateTo" && pages.length >= PAGE_LEVEL_LIMIT - 3) {
      method = "redirectTo";
    }

    if (method == "navigateToByForce") {
      method = "navigateTo";
    }

    if (method == "navigateTo" && pages.length == PAGE_LEVEL_LIMIT) {
      method = "redirectTo";
    }

    Taro[method]({
      url
    });
  }
}

// export { getUserInfo, getOpenId, getIsAuth, jumpUrl };
export { getOpenId, jumpUrl };
