// 修改主题
import { ref } from "vue";
const useTheme = () => {
  const isDarkTheme = ref(false); // 是否是暗黑主题
  // 主题切换
  const isLightTheme = () => {
    if (isDarkTheme.value) {
      // 黑色
      const blackStyles = [
        // 字体颜色
        { colorName: "--font-color", color: "#fff" },
        // 背景颜色
        { colorName: "--bg-color", color: "#636363" },
        // hover背景颜色
        { colorName: "--hoverBg-color", color: "rgb(67, 74, 80)" },
      ];
      blackStyles.map((item) => {
        document
          .getElementsByTagName("body")[0]
          .style.setProperty(item.colorName, item.color);
      });
    } else {
      // 白色
      const lightStyles = [
        // 字体颜色
        { colorName: "--font-color", color: "#fff" },
        // 背景颜色
        { colorName: "--bg-color", color: "#fff" },
        // hover背景颜色
        { colorName: "--hoverBg-color", color: "#002060" },
      ];
      lightStyles.map((item) => {
        document
          .getElementsByTagName("body")[0]
          .style.setProperty(item.colorName, item.color);
      });
    }
  };
  return { isDarkTheme, isLightTheme };
};

export default useTheme;
