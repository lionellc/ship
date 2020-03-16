import Taro, { Component, Config } from "@tarojs/taro";
import { AtButton, AtInput, AtForm } from "taro-ui";
import { View, Text } from "@tarojs/components";
import { getOpenId, jumpUrl } from "../../utils";
import "./index.scss";

export default class Index extends Component {
  state = {
    shipNumber: ""
  };

  config: Config = {
    navigationBarTitleText: "首页"
  };

  handleChange = value => {
    this.setState({
      shipNumber: value
    });
  };

  handleSearch = async () => {
    const { shipNumber } = this.state;
    if (!shipNumber) {
      Taro.showToast({
        icon: "none",
        title: "请输入船号"
      });
      return;
    }

    const openid = await getOpenId();
    const res: any = await Taro.cloud.callFunction({
      name: "ship",
      data: {
        func: "getShip",
        data: {
          openid,
          shipNumber
        }
      }
    });

    const {
      result: {
        data: { data }
      }
    } = res;

    if (data.length === 0) {
      Taro.showToast({
        title: "该船号不存在",
        icon: "none"
      });
    } else {
      jumpUrl(`/pages/searchResult/index?ship=${shipNumber}`)
    }
  };

  render() {
    return (
      <View className="searchCon">
        {/* <AtButton type="secondary" size="small" className="moreButton">
          更多
        </AtButton> */}
        <AtForm className="searchFormCon">
          <AtInput
            clear
            name="value"
            title="船号"
            type="text"
            placeholder="请输入船号"
            value={this.state.shipNumber}
            onChange={this.handleChange}
          />
        </AtForm>

        <AtButton
          type="primary"
          className="searchButton"
          onClick={this.handleSearch}
        >
          搜索
        </AtButton>
      </View>
    );
  }
}
