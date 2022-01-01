import { computed, onUnmounted, ref } from "vue";
import raf from "../raf";
// @ts-ignore
import TransitionEvents from "../css-animation/Event";
import { useGetInstance } from "./useGetInstance";
import { ComponentInternalInstance } from "@vue/runtime-core";
const clickWaveAnimateId = ref();
const animationStart = ref(false);
const animationStartId = ref();
const instanceRef = ref();
const isHidden = (el: any) => {
  return !el || el.offsetParent === null;
};

export type waveProps = { insertExtraNode: any };

export const useBindAnimation = (
  instance: ComponentInternalInstance | null,
  props: waveProps,
  node?: Element
) => {
  instanceRef.value = instance;
  // 判断事件是否存在
  if (
    !node ||
    !node.getAttribute ||
    node.getAttribute("disabled") ||
    node.className.indexOf("disabled") >= 0
  ) {
    return;
  }
  const extraNode = ref();
  const styleForPesudo = ref();
  // 获取当前按钮的一些颜色信息，并触发click事件
  const onClick = (e: Event) => {
    if ((e.target as any).tagName === "INPUT" || isHidden(e.target)) {
      return;
    }
    resetEffect(node);
    // 获取颜色信息
    const waveColor =
      getComputedStyle(node).getPropertyValue("background-color") ||
      getComputedStyle(node).getPropertyValue("border-top-color") || // Firefox Compatible
      getComputedStyle(node).getPropertyValue("border-color");
    clickWaveAnimateId.value = setTimeout(
      () => useOnClick(props, node, waveColor),
      0
    );
    raf.cancel(clickWaveAnimateId.value);
    animationStart.value = true;
    animationStartId.value = raf(() => {
      animationStart.value = false;
    }, 10);
  };
  node.addEventListener("click", onClick, true);
  // 初始化
  onUnmounted(() => {
    node.removeEventListener("click", onClick, true);
  });
  const insertExtraNode = computed(() => props.insertExtraNode);

  // 重置动画
  const resetEffect = (node?: Element) => {
    if (!node || node === extraNode.value || !(node instanceof Element)) {
      return;
    }
    const attributeName = getAttributeName();
    node.setAttribute(attributeName, "false");
    if (styleForPesudo.value) {
      styleForPesudo.value.innerHTML = "";
    }
    if (
      insertExtraNode.value &&
      extraNode.value &&
      node.contains(extraNode.value)
    ) {
      node.removeChild(extraNode.value);
    }
    TransitionEvents.removeStartEventListener(node, onTransitionStart);
    TransitionEvents.removeEndEventListener(node, onTransitionEnd);
  };

  /**
   * 动画开始
   * @param e
   */
  const onTransitionStart = (e?: AnimationEvent) => {
    if (instance?.isUnmounted) return;
    const instance1 = useGetInstance(instance);
    if (!e || e.target !== instance1.node) {
      return;
    }
    if (animationStart.value) {
      // 重置
      resetEffect(instance1.node as Element);
    }
  };

  /**
   * 监听动画结束
   * @param e
   */
  const onTransitionEnd = (e?: AnimationEvent) => {
    if (!e || e.animationName !== "fadeEffect") {
      return;
    }
    // 重置动画
    resetEffect(node);
  };

  // 获取当前的节点信息
  const getAttributeName = () => {
    const { insertExtraNode } = props;
    return insertExtraNode
      ? "pro-click-animating"
      : "pro-click-animating-without-extra-node";
  };

  /**
   * 触发点击事件的操作
   */
  const useOnClick = (props: waveProps, node: Element, waveColor: string) => {
    // 判断节点状态
    if (!node || isHidden(node) || node.className.indexOf("-leave") >= 0) {
      return;
    }
    extraNode.value = document.createElement("div");
    const myExtraNode = extraNode.value;
    extraNode.value.className = "pro-click-animating-node";
    const attributeName = getAttributeName();
    node.removeAttribute(attributeName);
    node.setAttribute(attributeName, "true");
    styleForPesudo.value =
      styleForPesudo.value || document.createElement("style");
    if (checkWaveColor(waveColor)) {
      // 定义csp
      myExtraNode.style.borderColor = waveColor;
      styleForPesudo.value.innerHTML = `
      [pro-click-animating-without-extra-node='true']::after, .pro-click-animating-node {
          --pro-wave-shadow-color: ${waveColor};
      }`;
      if (!document.body.contains(styleForPesudo.value)) {
        document.body.appendChild(styleForPesudo.value);
      }
    }
    if (insertExtraNode.value) {
      node.appendChild(myExtraNode);
    }
    TransitionEvents.addStartEventListener(node, onTransitionStart);
    TransitionEvents.addEndEventListener(node, onTransitionEnd);
  };
  return {
    cancel: () => {
      node.removeEventListener("click", onClick, true);
    },
  };
};

const isNotGrey = (color: string): boolean => {
  // eslint-disable-next-line no-useless-escape
  const match = (color || "").match(/rgba?\((\d*), (\d*), (\d*)(, [\.\d]*)?\)/);
  if (match && match[1] && match[2] && match[3]) {
    return !(match[1] === match[2] && match[2] === match[3]);
  }
  return true;
};
/**
 * 检查颜色
 * @param color
 */
const checkWaveColor = (color: string): boolean => {
  return !!(
    color &&
    color !== "#ffffff" &&
    color !== "rgb(255,255,255)" &&
    isNotGrey(color) &&
    !/rgba\(\d*, \d*, \d*, 0\)/.test(color) && // any transparent rgba color
    color !== "transparent"
  );
};
