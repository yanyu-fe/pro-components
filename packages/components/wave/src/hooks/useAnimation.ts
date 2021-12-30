import { onUnmounted } from "vue";

export const useBindAnimation = (node?: Element) => {
  // 判断事件是否存在
  if (
    !node ||
    !node.getAttribute ||
    node.getAttribute("disabled") ||
    node.className.indexOf("disabled") >= 0
  ) {
    return;
  }
  // 获取当前按钮的一些颜色信息，并触发click事件
  const onClick = () => {
    // 获取颜色信息
    const waveColor =
      getComputedStyle(node).getPropertyValue("border-top-color") || // Firefox Compatible
      getComputedStyle(node).getPropertyValue("border-color") ||
      getComputedStyle(node).getPropertyValue("background-color");
    console.log(waveColor);
  };
  node.addEventListener("click", onClick, true);
  onUnmounted(() => {
    node.removeEventListener("click", onClick, true);
  });
};

/**
 * 触发点击事件的操作
 */
const useOnClick = () => {};
