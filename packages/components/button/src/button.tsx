import { defineComponent } from "vue";
import "./style";
export default defineComponent({
  name: "ProButton",
  setup(_, { slots }) {
    return () => {
      return (
        <button class="pro-button">{slots.default && slots.default()}</button>
      );
    };
  },
});
