import Taro, { Component, Config } from "@tarojs/taro";
import { AtAccordion, AtList, AtListItem, AtButton, AtDivider } from "taro-ui";
import { getOpenId, jumpUrl } from "../../utils";
import { View } from "@tarojs/components";
import "./index.scss";

export default class Index extends Component {
  state = {
    ship: "", // 船号
    searchResult: [] as any,
  };

  config: Config = {
    navigationBarTitleText: "搜索结果页"
  };

  async componentDidMount() {
    const { ship } = this.$router.params;
    this.setState({
      ship
    });
    const openid = await getOpenId();
    const res: any = await Taro.cloud.callFunction({
      name: "ship",
      data: {
        func: "getShip",
        data: {
          openid,
          shipNumber: ship
        }
      }
    });
    const {
      result: {
        data: { data }
      }
    } = res;

    const searchResult = data.map((item, idx) => {
      if (idx === 0) {
        item.open = true;
      } else {
        item.open = false;
      }
      return item;
    });
    this.setState({
      searchResult
    });
  }

  handleClick = (idx, value) => {
    const { searchResult } = this.state;
    const result = searchResult.map((item,index) => {
      item.open = false;
      if (index===idx) {
        item.open = value;
      }
      return item
    })
    this.setState({
      searchResult: result
    });
  };

  copy = idx => {
    const { searchResult } = this.state;
    const {
      shipNumber,
      horsepower,
      gearbox,
      pitch,
      leafLength,
      leafShape,
      leafHeight,
      price,
      topJaw,
      bottomJaw,
      gearLength,
      date,
      phone,
      name
    } = searchResult[idx];
    Taro.setClipboardData({
      data: `船号：${shipNumber} 马力：${horsepower} 齿轮箱：${gearbox} 螺距：${pitch} 叶子长度：${leafLength} 叶子形状：${leafShape} 叶尖高度：${leafHeight} 价格：${price} 上口：${topJaw} 下口：${bottomJaw} 档距： ${gearLength} 手机号：${phone} 姓名：${name} 日期：${date}`,
      success: function() {
        Taro.showToast({
          title: "复制成功",
          icon: "success"
        });
      }
    });
  };

  edit = idx => {
    const { searchResult } = this.state;
    const { _id } = searchResult[idx];
    jumpUrl(`/pages/editData/index?id=${_id}`);
  };

  render() {
    const { ship, searchResult } = this.state;
    return (
      <View className="searchResultCon">
        <View className="panelTitle">{` ${ship} 的搜索结果：`}</View>

        {searchResult.length > 0 &&
          searchResult.map((item, idx) => (
            <AtAccordion
              open={item.open}
              onClick={e => this.handleClick(idx, e)}
              title={`船号 ${item.shipNumber}`}
              key={item._id}
            >
              <AtList hasBorder={false}>
              <AtListItem title="船号" extraText={item.shipNumber} />
                <AtListItem title="日期" extraText={item.date} />
                <AtListItem title="机器马力" extraText={item.horsepower} />
                <AtListItem title="齿轮箱" extraText={item.gearbox} />
                <AtListItem title="螺距" extraText={item.pitch} />
                <AtListItem title="叶子长度" extraText={item.leafLength} />
                <AtListItem title="叶子形状" extraText={item.leafShape} />
                <AtListItem title="叶尖高度" extraText={item.leafHeight} />
                <AtListItem title="价格" extraText={item.price} />
                <AtListItem title="上口" extraText={item.topJaw} />
                <AtListItem title="下口" extraText={item.bottomJaw} />
                <AtListItem title="档距" extraText={item.gearLength} />
                <AtListItem title="手机号" extraText={item.phone} />
                <AtListItem title="姓名" extraText={item.name} />
                <View className="searchItemButtonCon">
                  <View className="searchItemButton searchItemButton1">
                    <AtButton
                      type="secondary"
                      size="small"
                      onClick={() => this.edit(idx)}
                    >
                      修改
                    </AtButton>
                  </View>
                  <View className="searchItemButton">
                    <AtButton
                      type="primary"
                      size="small"
                      onClick={() => this.copy(idx)}
                    >
                      复制
                    </AtButton>
                  </View>
                </View>
                <AtDivider  height={30}/>
              </AtList>
            </AtAccordion>
          ))}
      </View>
    );
  }
}
