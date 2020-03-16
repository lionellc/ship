import Taro, { Component, Config } from "@tarojs/taro";
import Index from "./pages/index";

import "taro-ui/dist/style/index.scss";
import "./app.scss";

// import { getIsAuth, getOpenId } from "./utils";
// import { setGlobalData } from "./utils/globalData";
// import { getWxUserData } from "./utils/wx";

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      "pages/index/index",
      "pages/editData/index",
      "pages/searchResult/index",
      "pages/inputdata/index",
    ],
    window: {
      backgroundTextStyle: "light",
      navigationBarBackgroundColor: "#fff",
      navigationBarTitleText: "WeChat",
      navigationBarTextStyle: "black"
    },
    tabBar: {
      color: "#000000",
      selectedColor: "#6190E8",
      backgroundColor: "#ffffff",
      list: [
        {
          pagePath: "pages/index/index",
          text: "查找",
          iconPath: "asset/shoppingbag_active.png",
          selectedIconPath: "asset/shoppingbag_active.png"
        },
        {
          pagePath: "pages/inputdata/index",
          text: "录入",
          iconPath: "asset/shoppingbag_active.png",
          selectedIconPath: "asset/shoppingbag_active.png"
        }
      ]
    },
    cloud: true
  };

  async componentDidMount() {
    if (process.env.TARO_ENV === "weapp") {
      Taro.cloud.init({
        env: "************",
        traceUser: true // 是否要捕获每个用户的访问记录。设置为true，用户可在管理端看到用户访问记录
      });

      Taro.showShareMenu({
        withShareTicket: true
      })
      // const userData = await getWxUserData();
      // setGlobalData("userData", userData);
      // getIsAuth();
    }
  }

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return <Index />;
  }
}

Taro.render(<App />, document.getElementById("app"));
