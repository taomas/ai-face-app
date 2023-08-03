import Taro, { useLoad } from "@tarojs/taro";
import React, { useState } from "react";
import { View, Image } from "@tarojs/components";
import { uploadImage } from "../../api";
import "./index.scss";

export default function PageHistory() {
  useLoad(async () => {});

  // 文件临时地址
  const [fileUrl, setFileUrl] = useState("");

  // 触发选择文件
  const handleChooseFile = async () => {
    try {
      console.log("handleChooseFile");
      // 选择图片上传
      const res = await Taro.chooseImage({
        sourceType: ["album", "camera"],
        count: 1,
        sizeType: ["compressed"],
      });
      console.log("chooseImage", res);

      // 选择成功，更新图片地址
      if (res.tempFilePaths && res.tempFilePaths.length > 0) {
        // 更新图片
        setFileUrl(res.tempFilePaths[0]);

        // 触发上传文件
        await handleUploadFile(res.tempFilePaths[0]);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  // 触发上传文件
  const handleUploadFile = async (path) => {
    try {
      // 加载loading
      Taro.showLoading({
        title: "上传中...",
      });

      const name = path.substr(path.lastIndexOf("/") + 1);
      await uploadImage({
        filePath: path,
        name,
        formData: {
          test: "111",
        },
      });
    } catch (error) {
      console.log("error", error);
    } finally {
      Taro.hideLoading();
    }
  };

  // 渲染上传组件
  const renderImageUpload = () => {
    console.log("renderVideoUpload", fileUrl);
    if (fileUrl) {
      return (
        <View className='image-upload-container'>
          <View className='image-upload-input'>
            <Image className='image-upload-temp' src={fileUrl}></Image>
          </View>
          <View className='image-upload-input-footer'>
            <View
              className='image-upload-input-button'
              onClick={handleChooseFile}
            >
              选择视频
            </View>
          </View>
        </View>
      );
    }

    return (
      <View className='image-upload-container'>
        <View className='image-upload-input' onClick={handleChooseFile}>
          <View className='iconfont icon-add image-upload-input-icon'></View>
          <View className='image-upload-input-text'>
            点击此处/下方按钮上传视频
          </View>
          <View className='image-upload-input-label'>
            视频需要小于20秒（视频越长则何时视频时间越长）
          </View>
          <View className='image-upload-input-inner'></View>
        </View>
        <View className='image-upload-input-footer'>
          <View
            className='image-upload-input-button'
            onClick={handleChooseFile}
          >
            上传图片
          </View>
        </View>
      </View>
    );
  };

  return <View className='page-image-upload'>{renderImageUpload()}</View>;
}
