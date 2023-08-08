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
    ImageUpload: require("../../assets/images/image_upload.png"),
    imageBtn: require("../../assets/images/image_upload_btn.png"),
  };

  // 文件临时地址
  const [fileUrl, setFileUrl] = useState("");

  // 触发图片选择
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

  return (
    <View className='page-image-upload'>
      <Image className='page-image-title' src={assets.imageTitle}></Image>
      <View className='image-upload-container'>
        <Image className='image-upload-ipt' src={assets.ImageUpload}></Image>
        {fileUrl && (
          <Image className='image-target' mode='widthFix' src={fileUrl}></Image>
        )}
      </View>
      <Image
        className='image-upload-btn'
        src={assets.imageBtn}
        onClick={handleChooseFile}
      ></Image>
      <View className='image-upload-hint'>
        重要提示：照片仅供当次使用，生成后即删除，可放心使用。
      </View>
      <View className='image-upload-steps'></View>
    </View>
  );
}
