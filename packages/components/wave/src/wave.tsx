import { defineComponent, onMounted } from "vue";
import { useGetInstance } from "./hooks/useGetInstance";
import "./style";
import { useBindAnimation } from "./hooks/useAnimation";
export default defineComponent({
  name: "ProWave",
  setup(_props, { slots }) {
    let node;
    onMounted(() => {
      // 拿到当前的实例
      node = useGetInstance();
      useBindAnimation(node as Element);
    });
    return () => {
      return <>{slots.default && slots.default()}</>;
    };
  },
});
