import Taro, { useLoad } from "@tarojs/taro";
import React, { useState } from "react";
import { View, Image } from "@tarojs/components";
import "./index.scss";

export default function PageEntry() {
  useLoad(async () => {});

  // 定义静态资源信息
  const assets = {
    imageTitle: require("../../assets/images/logo_title.png"),
    imageContent: require("../../assets/images/image_content.png"),
    imageBtn: require("../../assets/images/image_btn_confirm.png"),
  };

  // 跳转到图片上传页面
  const handleJumpToUpload = () => {
    Taro.navigateTo({
      url: "/pages/image-upload/index",
    });
  };

  return (
    <View className='page-image-entry'>
      <Image className='page-image-title' src={assets.imageTitle}></Image>
      <Image className='page-image-content' src={assets.imageContent}></Image>
      <View className='page-image-hint'>
        重要提示：本小程序不保留任何用户上传的图片，请放心使用
      </View>
      <Image
        className='page-image-btn'
        src={assets.imageBtn}
        onClick={handleJumpToUpload}
      ></Image>
      <View className='page-image-tips'>- 本小程序仅供娱乐 -</View>
      <View className='page-image-entry-bg'></View>
    </View>
  );
}
