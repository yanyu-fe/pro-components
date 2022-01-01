import { ComponentInternalInstance } from "@vue/runtime-core";
import { getCurrentInstance } from "vue";

export const useGetInstance = (instance?: ComponentInternalInstance | null) => {
  let myInstance: ComponentInternalInstance | null;
  if (!instance) {
    myInstance = getCurrentInstance();
  } else {
    myInstance = instance;
  }
  // console.log(instance?.vnode.el);
  let node = myInstance?.vnode.el;
  while (node && !node.tagName) {
    node = node.nextSibling;
  }
  return { node, instance: myInstance };
};
