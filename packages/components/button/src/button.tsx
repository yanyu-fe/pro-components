import { defineComponent } from "vue";
import { ProWave } from "../../wave";
import "./style";
export default defineComponent({
  name: "ProButton",
  setup(_, { slots }) {
    return () => {
      return (
        <ProWave>
          <button class="pro-button">{slots.default && slots.default()}</button>
        </ProWave>
      );
    };
  },
});
