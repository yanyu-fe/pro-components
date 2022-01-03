import { computed, CSSProperties, defineComponent, ref, toRefs } from "vue";
import { waterMarkProps } from "./typing";
import "./style";
import { getPixelRatio } from "./tools";
export default defineComponent({
  name: "ProWaterMark",
  props: waterMarkProps,
  setup(_props, { slots }) {
    const {
      fontColor,
      image,
      content,
      className,
      preFixCls,
      markClassName,
      style,
      markStyle,
    } = toRefs(_props);
    const wrapperCls = `${preFixCls.value}-${className.value}`;
    const waterMarkCls = `${preFixCls.value}-${markClassName.value}`;
    const base64Url = ref();
    // 定义画布
    const canvas = document.createElement("canvas");
    // 定义2d
    const ctx = canvas.getContext("2d");
    // 获取缩放效果
    const ratio = getPixelRatio(ctx);
    // 获取画布的宽高和位置
    const canvasWidth = computed(
      () => `${(_props.gapX + _props.width) * ratio}px`
    );
    const canvasHeight = computed(
      () => `${(_props.gapY + _props.height) * ratio}px`
    );
    const canvasOffsetLeft = computed(
      () => _props.offsetLeft || _props.gapX / 2
    );
    const canvasOffsetTop = computed(() => _props.offsetTop || _props.gapY / 2);
    canvas.setAttribute("width", canvasWidth.value);
    canvas.setAttribute("height", canvasHeight.value);
    if (ctx) {
      // 旋转字符
      ctx.translate(
        canvasOffsetLeft.value * ratio,
        canvasOffsetTop.value * ratio
      );
      ctx.rotate((Math.PI / 180) * Number(_props.rotate));
      const markWidth = _props.width * ratio;
      const markHeight = _props.height * ratio;
      if (image.value) {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.referrerPolicy = "no-referrer";
        img.src = image.value;
        img.onload = () => {
          ctx.drawImage(img, 0, 0, markWidth, markHeight);
          base64Url.value = canvas.toDataURL();
        };
      } else if (content.value) {
        const markSize = Number(_props.fontSize) * ratio;
        ctx.font = `${_props.fontStyle} normal ${_props.fontWeight} ${markSize}px/${markHeight}px ${_props.fontFamily}`;
        ctx.fillStyle = fontColor.value;
        ctx.fillText(_props.content, 0, 0);
        base64Url.value = canvas.toDataURL();
      } else {
        console.error("当前环境不支持canvas");
      }
    }

    const wrapperStyle = computed<CSSProperties>(() => {
      return {
        position: "relative",
        ...style.value,
      };
    });
    const wrapperWaterStyle = computed<CSSProperties>(() => {
      return {
        zIndex: _props.zIndex,
        position: "absolute",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        backgroundSize: `${_props.gapX + _props.width}px`,
        pointerEvents: "none",
        backgroundRepeat: "repeat",
        backgroundImage: `url('${base64Url.value}')`,
        ...markStyle.value,
      };
    });
    return () => {
      return (
        <>
          <div class={wrapperCls} style={wrapperStyle.value}>
            {slots.default && slots.default()}
            <div class={waterMarkCls} style={wrapperWaterStyle.value} />
          </div>
        </>
      );
    };
  },
});
