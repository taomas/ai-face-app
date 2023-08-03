import requestClient from "./request";

// 上传参数类型
interface IUploadImage {
  filePath: string;
  name: string;
  formData?: any;
}

// 图片上传方法
export const uploadImage = async ({
  filePath = "",
  name = "",
  formData = {},
}: IUploadImage) => {
  try {
    const response = await requestClient.upload(
      `/image/upload`,
      filePath,
      name,
      formData
    );
    return response.data; // 返回后端返回的数据
  } catch (error) {
    console.error("上传图片异常:", error);
    throw error;
  }
};
