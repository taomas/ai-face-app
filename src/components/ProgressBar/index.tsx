import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import "./index.scss";

interface ProgressBarProps {
  progress: number;
}

const ProgressBar = ({ progress }: ProgressBarProps) => {
  const progressBarStyle = {
    width: `${progress}%`,
  };

  return (
    <View className='progress-container'>
      <View className='progress-bar' style={progressBarStyle}>
        <View className='progress-fill' />
      </View>
    </View>
  );
};

export default ProgressBar;
