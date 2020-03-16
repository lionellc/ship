import Taro, { Component, Config } from "@tarojs/taro";
import { AtButton, AtInput, AtForm, AtDivider } from "taro-ui";
import { getOpenId } from "../../utils";
import { View, Text, Picker } from "@tarojs/components";
import moment from "moment";
import "./index.scss";

export default class Index extends Component {
  state = {
    id: "",
    searchResult: {
      shipNumber: "", // 船号
      horsepower: "", // 马力
      gearbox: "", // 齿轮箱
      pitch: "", // 螺距
      leafLength: "", // 叶子长度
      leafShape: "", // 叶子形状
      leafHeight: "", // 叶尖高度
      price: "", // 价格
      topJaw: "", // 上口
      bottomJaw: "", // 下口
      gearLength: "", // 档距
      phone: "", // 手机号
      name: "", // 姓名
      date: '',
      toastStr: "",
      _id: ""
    }
  };

  config: Config = {
    navigationBarTitleText: "编辑页面"
  };

  componentWillMount() {}

  async componentDidMount() {
    const { id } = this.$router.params;
    this.setState({
      id
    });
    const openid = await getOpenId();
    const res: any = await Taro.cloud.callFunction({
      name: "ship",
      data: {
        func: "getShip",
        data: {
          openid,
          _id: id
        }
      }
    });
    const {
      result: {
        data: { data }
      }
    } = res;

    this.setState({
      searchResult: data[0]
    });
  }

  handleChange = (key, e) => {
    const { searchResult } = this.state;
    if (key === "date") {
      this.setState({
        searchResult: {
          ...searchResult,
          date: e.detail.value
        }
      });
    } else {
      this.setState({
        searchResult: {
          ...searchResult,
          [key]: e
        }
      });
    }
    
  };

  resetPage = () => {
    this.setState({
      shipNumber: "", // 船号
      horsepower: "", // 马力
      gearbox: "", // 齿轮箱
      pitch: "", // 螺距
      leafLength: "", // 叶子长度
      leafShape: "", // 叶子形状
      leafHeight: "", // 叶尖高度
      price: "", // 价格
      topJaw: "", // 上口
      bottomJaw: "", // 下口
      gearLength: "", // 档距
      phone: "", // 手机号
      name: "" ,// 姓名
      date: moment(new Date()).format("YYYY-MM-DD"), // 日期
    });
  };

  handleSave = async () => {
    const { searchResult } = this.state;

    if (!searchResult.shipNumber) {
      Taro.showToast({
        icon: "none",
        title: "请输入船号"
      });

      return;
    }
    const res: any = await Taro.cloud.callFunction({
      name: "ship",
      data: {
        func: "addShip",
        data: searchResult
      }
    });

    const {
      result: {
        data: { shipData: _id }
      }
    } = res;

    if (_id) {
      Taro.showToast({
        icon: "success",
        title: "修改成功"
      });
    } else {
      Taro.showToast({
        icon: "none",
        title: "保存失败"
      });
    }
  };

  render() {
    const { searchResult } = this.state;
    return (
      <View className="inputDataCon">
        <AtForm className="inputFormCon">
          <AtInput
            clear
            name="value"
            title="船号"
            type="text"
            placeholder="请输入船号"
            value={searchResult.shipNumber}
            onChange={e => this.handleChange("shipNumber", e)}
          />
          <View className="inputPicker">
            <Picker
              mode="date"
              value={searchResult.date}
              onChange={e => this.handleChange("date", e)}
            >
              <View className="picker">
                <Text className="title">日期：</Text>
                <Text>{searchResult.date}</Text>
                </View>
            </Picker>
            <AtDivider height={1} lineColor="#eee" />
          </View>
          <AtInput
            clear
            name="value"
            title="机器马力"
            type="text"
            placeholder="请输入机器马力"
            value={searchResult.horsepower}
            onChange={e => this.handleChange("horsepower", e)}
          />
          <AtInput
            clear
            name="value"
            title="齿轮箱"
            type="text"
            placeholder="请输入齿轮箱"
            value={searchResult.gearbox}
            onChange={e => this.handleChange("gearbox", e)}
          />
          <AtInput
            clear
            name="value"
            title="螺距"
            type="digit"
            placeholder="请输入螺距"
            value={searchResult.pitch}
            onChange={e => this.handleChange("pitch", e)}
          />
          <AtInput
            clear
            name="value"
            title="叶子长度"
            type="digit"
            placeholder="请输入叶子长度"
            value={searchResult.leafLength}
            onChange={e => this.handleChange("leafLength", e)}
          />
          <AtInput
            clear
            name="value"
            title="叶子形状"
            type="text"
            placeholder="请输入叶子形状"
            value={searchResult.leafShape}
            onChange={e => this.handleChange("leafShape", e)}
          />
          <AtInput
            clear
            name="value"
            title="叶尖高度"
            type="text"
            placeholder="请输入叶尖高度"
            value={searchResult.leafHeight}
            onChange={e => this.handleChange("leafHeight", e)}
          />
          <AtInput
            clear
            name="value"
            title="价格"
            type="text"
            placeholder="请输入价格"
            value={searchResult.price}
            onChange={e => this.handleChange("price", e)}
          />
          <AtInput
            clear
            name="value"
            title="上口"
            type="text"
            placeholder="请输入上口"
            value={searchResult.topJaw}
            onChange={e => this.handleChange("topJaw", e)}
          />
          <AtInput
            clear
            name="value"
            title="下口"
            type="text"
            placeholder="请输入下口"
            value={searchResult.bottomJaw}
            onChange={e => this.handleChange("bottomJaw", e)}
          />
          <AtInput
            clear
            name="value"
            title="档距"
            type="text"
            placeholder="请输入档距"
            value={searchResult.gearLength}
            onChange={e => this.handleChange("gearLength", e)}
          />
          <AtInput
            clear
            name="value"
            title="手机号"
            type="phone"
            placeholder="请输入手机号"
            value={searchResult.phone}
            onChange={e => this.handleChange("phone", e)}
          />
          <AtInput
            clear
            name="value"
            title="姓名"
            type="text"
            placeholder="姓名"
            value={searchResult.name}
            onChange={e => this.handleChange("name", e)}
          />
        </AtForm>

        <AtButton
          type="primary"
          className="searchButton"
          onClick={this.handleSave}
        >
          保存
        </AtButton>

        <AtButton
          type="secondary"
          className="clearButton"
          onClick={this.resetPage}
        >
          重置
        </AtButton>
      </View>
    );
  }
}
