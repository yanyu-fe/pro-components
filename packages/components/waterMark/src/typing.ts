import { CSSProperties, ExtractPropTypes, PropType } from "vue";
type TypeFontStyle = "none" | "normal" | "italic" | "oblique";
type TypeFontFamily = "normal" | "light" | "weight" | number;
export const waterMarkProps = {
  //  定义类名
  className: {
    type: String,
    default: "water-mark",
  },
  // 定义样式
  style: {
    type: Object as PropType<CSSProperties>,
    default: () => ({}),
  },
  // 水印样式
  markStyle: {
    type: Object as PropType<CSSProperties>,
    default: () => ({}),
  },
  // 水印样式
  markClassName: {
    type: String,
    default: "water-mark-image",
  },
  // 水印之间的水平间距
  gapX: {
    type: Number,
    default: 212,
  },
  // 水印之间的垂直间距
  gapY: {
    type: Number,
    default: 222,
  },
  //    定义水印的层级
  zIndex: {
    type: Number,
    default: 9,
  },
  // 水印的宽度
  width: {
    type: Number,
    default: 120,
  },
  // 水印的高度
  height: {
    type: Number,
    default: 64,
  },
  // 水印在canvas 画布上绘制的垂直偏移量，正常情况下，水印绘制在中间位置, 即 offsetTop = gapY / 2
  offsetTop: {
    type: Number,
    default: 0,
  },
  // 水印在canvas 画布上绘制的水平偏移量, 正常情况下，水印绘制在中间位置, 即 offsetTop = gapX / 2
  offsetLeft: {
    type: Number,
    default: 0,
  },
  // 水印绘制的时候旋转的角度
  rotate: {
    type: Number,
    default: -22,
  },
  // 前缀
  preFixCls: {
    type: String,
    default: "pro",
  },
  // 高清印图片源, 为了高清屏幕显示，建议使用 2倍或3倍图，优先使用图片渲染水印
  image: {
    type: String,
    default: "",
  },
  // 水印内容,
  content: {
    type: String,
    default: "ProWaterMark",
  },
  // 文字颜色
  fontColor: {
    type: String,
    default: "rgba(0,0,0,.15)",
  },
  // 文字样式
  fontStyle: {
    type: String as PropType<TypeFontStyle>,
    default: "normal",
  },
  // 文字粗细
  fontFamily: {
    type: String,
    default: "sans-serif",
  },
  // 文字粗细
  fontWeight: {
    type: [String, Number] as PropType<TypeFontFamily>,
    default: "normal",
  },
  // 文字大小
  fontSize: {
    type: [String, Number],
    default: 16,
  },
};

export type WaterMarkProps = ExtractPropTypes<typeof waterMarkProps>;
