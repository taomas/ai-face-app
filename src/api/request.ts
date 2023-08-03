import Taro from "@tarojs/taro";

// baseurl地址
const API_BASE_URL = "https://www.gptgou.com";

class RequestClient {
  private getRequestUrl(url: string) {
    if (url.includes("://")) {
      return url;
    }
    return API_BASE_URL + url;
  }

  // Common request function
  async request(method, url, data, headers = {}) {
    try {
      const response = await Taro.request({
        method,
        url: this.getRequestUrl(url),
        data,
        header: {
          "content-type": "application/json", // Default content type is JSON, can be modified based on your needs
          ...headers,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // GET request
  async get(url, data = {}, headers = {}) {
    return this.request("GET", this.getRequestUrl(url), data, headers);
  }

  // POST request
  async post(url, data = {}, headers = {}) {
    return this.request("POST", this.getRequestUrl(url), data, headers);
  }

  // File upload request
  async upload(url, filePath, name, formData = {}, headers = {}) {
    try {
      const response = await Taro.uploadFile({
        url: this.getRequestUrl(url),
        filePath,
        name,
        formData,
        header: {
          ...headers,
        },
      });
      return JSON.parse(response.data);
    } catch (error) {
      throw error;
    }
  }
}

export default new RequestClient();
