import requestClient from "./request";

// 上传参数类型
interface IUploadImage {
  filePath: string;
  name: string;
  formData?: any;
}

// 图片上传到cos的方法
export const handleApiUploadCos = async ({
  filePath = "",
  name = "",
  formData = {},
}: IUploadImage) => {
  try {
    const response = await requestClient.upload(
      `/cos/upload`,
      filePath,
      name,
      formData
    );
    return response; // 返回后端返回的数据
  } catch (error) {
    console.error("上传图片异常:", error);
    throw error;
  }
};

// 生成动漫图片
export const handleApiGenerateImage = async (data: any) => {
  try {
    const response = await requestClient.post(`/ai/face_cartoon_pic`, data);

    return response; // 返回后端返回的数据
  } catch (error) {
    console.error("上传图片异常:", error);
    throw error;
  }
};
