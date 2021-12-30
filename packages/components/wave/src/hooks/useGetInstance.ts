import { getCurrentInstance, RendererNode } from "vue";

export const useGetInstance = (): null | undefined | RendererNode => {
  const instance = getCurrentInstance();
  // console.log(instance?.vnode.el);
  let node = instance?.vnode.el;
  while (node && !node.tagName) {
    node = node.nextSibling;
  }
  return node;
};
