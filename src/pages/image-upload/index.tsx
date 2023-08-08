import Taro, { useLoad } from "@tarojs/taro";
import React, { useState } from "react";
import { View, Image } from "@tarojs/components";
import { uploadImage } from "../../api";
import "./index.scss";

export default function PageHistory() {
  useLoad(async () => {});

  // 定义静态资源信息
  const assets = {
    imageTitle: require("../../assets/images/logo_title.png"),
    imageContent: require("../../assets/images/image_content.png"),
    imageBtn: require("../../assets/images/image_btn_confirm.png"),
  };

  return (
    <View className='page-image-upload'>
      <View className='image-upload-title'></View>
      <View className='image-upload-ipt'></View>
      <View className='image-upload-btn'></View>
      <View className='image-upload-hint'></View>
      <View className='image-upload-steps'></View>
    </View>
  );
}
