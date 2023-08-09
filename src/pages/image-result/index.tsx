import Taro, { useLoad } from "@tarojs/taro";
import React, { useState } from "react";
import { View, Image } from "@tarojs/components";
import { handleApiUploadCos, handleApiGenerateImage } from "../../api";
import "./index.scss";

export default function PageHistory() {
  useLoad(async (options) => {
    if (options.url) {
      setImageUrl(options.url);
    }
  });

  // 定义图片url地址
  const [imageUrl, setImageUrl] = useState("");

  // 定义静态资源信息
  const assets = {
    imageTitle: require("../../assets/images/logo_title.png"),
    imageUpload: require("../../assets/images/image_upload.png"),
    btnRegenerate: require("../../assets/images/image_btn_regenerate.png"),
    btnDownload: require("../../assets/images/image_btn_download.png"),
  };

  // 重新返回上一页
  const handleGoBack = () => {
    // 返回页面重新制作
    Taro.redirectTo({
      url: "/pages/image-upload/index?isReSelect=true",
    });
  };

  // 下载图片
  const handleDownloadImage = async () => {
    // 下载imageUrl
    Taro.showLoading({
      title: "下载中...",
    });

    const res = await Taro.downloadFile({
      url: imageUrl,
    });

    // 保存图片
    await Taro.saveImageToPhotosAlbum({
      filePath: res.tempFilePath,
    });

    Taro.hideLoading();
  };

  return (
    <View className='page-image-result'>
      <Image className='page-image-title' src={assets.imageTitle}></Image>
      <View className='image-result-container'>
        <Image className='image-result-ipt' src={assets.imageUpload}></Image>
        <View className='image-result'>
          {imageUrl && (
            <Image
              className='image-target'
              mode='widthFix'
              src={imageUrl}
            ></Image>
          )}
        </View>
      </View>
      <Image
        className='image-result-btn-regenerate'
        src={assets.btnRegenerate}
        onClick={handleGoBack}
      ></Image>
      <Image
        className='image-result-btn-download'
        src={assets.btnDownload}
        onClick={handleDownloadImage}
      ></Image>
    </View>
  );
}
