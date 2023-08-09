import Taro, { useLoad } from "@tarojs/taro";
import React, { useState } from "react";
import { View, Image } from "@tarojs/components";
import { handleApiUploadCos, handleApiGenerateImage } from "../../api";
import ProgressBar from "../../components/ProgressBar/index";
import "./index.scss";

export default function PageHistory() {
  useLoad(async () => {});

  // 定义静态资源信息
  const assets = {
    imageTitle: require("../../assets/images/logo_title.png"),
    imageUpload: require("../../assets/images/image_upload.png"),
    imageBtn: require("../../assets/images/image_upload_btn.png"),
    imageBtnAd: require("../../assets/images/image-btn-ad.png"),
  };

  // 文件临时地址
  const [fileUrl, setFileUrl] = useState("");
  // 是否开始扫描人脸
  const [isScan, setIsScan] = useState(false);
  // 扫描进度
  const [scanProgress, setScanProgress] = useState(0);
  // 是否扫描完成
  const [isScanDone, setIsScanDone] = useState(false);

  // 触发图片选择
  const handleChooseFile = async (isReSelect = false) => {
    try {
      console.log("handleChooseFile");
      // 选择图片上传
      const res = await Taro.chooseImage({
        sourceType: ["album", "camera"],
        count: 1,
        sizeType: ["compressed"],
      });

      // 如果是重新选择
      if (isReSelect) {
        setIsScanDone(false);
        setScanProgress(0);
      }
      console.log("chooseImage", res);

      // 选择成功，更新图片地址
      if (res.tempFilePaths && res.tempFilePaths.length > 0) {
        // 更新图片
        const tempFilePaths = res.tempFilePaths[0];
        // 触发上传文件
        setFileUrl(tempFilePaths);
        // 开始执行扫描人脸
        handleScanFace();
        // await handleUploadFile(tempFilePaths);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  // 触发重新拍照上传
  const handleReChooseFile = async () => {
    // setIsScan(false);
    setIsScanDone(false);
    setScanProgress(0);
    await handleChooseFile();
  };

  // 触发扫描人脸
  const handleScanFace = async () => {
    setIsScan(true);
    // 扫描进度10s内从0到100
    let progress = 0;
    const timer = setInterval(() => {
      progress += 1;
      setScanProgress(progress);
      if (progress >= 100) {
        setIsScanDone(true);
        clearInterval(timer);
      }
    }, 50);
  };

  // 触发上传文件
  const handleUploadFile = async (path) => {
    try {
      // 加载loading
      Taro.showLoading({
        title: "上传中...",
      });

      const name = path.substr(path.lastIndexOf("/") + 1);
      const res = await handleApiUploadCos({
        filePath: path,
        name,
        formData: {
          url: path,
        },
      });

      if (res?.length > 0) {
        const imageUrl = res[0]?.name;
        if (imageUrl) {
          const res = await handleApiGenerateImage({
            url: imageUrl,
          });

          if (res.resultUrl) {
            // 缓存url数据
            Taro.setStorageSync("resultUrl", res.resultUrl);

            // 跳转到结果页
            Taro.navigateTo({
              url: `/pages/image-result/index?url=${res.resultUrl}`,
            });
          }
          console.log("handleApiGenerateImage结果：", res);
        }
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      Taro.hideLoading();
    }
  };

  // 渲染选择后的图片
  const renderUploadImage = () => {
    return (
      <View className='image-upload-container'>
        <View className='image-upload-content'>
          {fileUrl ? (
            <View className='image-upload-result'>
              <Image
                className='image-target'
                mode='widthFix'
                src={fileUrl}
              ></Image>
              <View className='image-scan-line' />
            </View>
          ) : (
            <View className='image-upload'>
              <View className='iconfont icon-upload image-upload-icon'></View>
              <View className='image-upload-text'>请上传照片</View>
            </View>
          )}
        </View>
        <Image className='image-upload-ipt' src={assets.imageUpload}></Image>
      </View>
    );
  };

  // 渲染上传图片按钮
  const renderUploadBtn = () => {
    return (
      <View className='image-upload-operation'>
        <Image
          className='image-upload-btn'
          src={assets.imageBtn}
          onClick={() => {
            handleChooseFile();
          }}
        ></Image>
        <View className='image-upload-hint'>
          重要提示：照片仅供当次使用，生成后即删除，可放心使用。
        </View>
        <View className='image-upload-steps'></View>
      </View>
    );
  };

  // 渲染扫描人脸模块
  const renderScanFaceProgress = () => {
    return (
      <View className='image-progress-container'>
        <View className='image-progress-text'>
          {isScanDone ? "生成完毕，点击下方按钮查看漫画脸" : "开始扫描人脸"}
        </View>
        <View className='image-progress-bar'>
          <ProgressBar progress={scanProgress} />
        </View>
        {isScanDone && (
          <View className='image-ad-container'>
            <Image className='image-btn-ad' src={assets.imageBtnAd}></Image>
            <View
              className='image-btn-choose'
              onClick={() => {
                handleChooseFile(true);
              }}
            >
              重新上传/拍照
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <View className='page-image-upload'>
      <Image className='page-image-title' src={assets.imageTitle}></Image>
      {renderUploadImage()}
      {isScan ? renderScanFaceProgress() : renderUploadBtn()}
    </View>
  );
}
