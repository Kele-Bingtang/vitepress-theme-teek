<script setup lang="ts" name="Pagination">
import type { PaginationProps, PaginationEmits, LayoutKey } from "./pagination";
import { computed, h, provide, watch, useSlots, VNode } from "vue";
import { useNamespace } from "@teek/hooks";
import { arrowLeftIcon, arrowRightIcon } from "@teek/assets";
import { paginationKey } from "./pagination";
import Prev from "./components/prev.vue";
import Next from "./components/next.vue";
import Jumper from "./components/jumper.vue";
import Total from "./components/total.vue";
import Pager from "./components/pager.vue";

defineOptions({ name: "Pagination" });

const props = withDefaults(defineProps<PaginationProps>(), {
  pagerCount: 7,
  layout: ["prev, pager, next, jumper, ->, total"].join(", "),
  prevIcon: () => arrowLeftIcon,
  nextIcon: () => arrowRightIcon,
  size: "default",
  background: false,
  disabled: false,
  hideOnSinglePage: false,
});
const emit = defineEmits<PaginationEmits>();

const ns = useNamespace("pagination");

const slots = useSlots() as any;

const currentPageModel = defineModel<number>("currentPage", { type: Number, default: 1 });
const pageSizeModel = defineModel<number>("pageSize", { type: Number, default: 10 });

const isAbsent = (v: unknown): v is undefined => typeof v !== "number";

// 总页数
const pageCountBridge = computed<number>(() => {
  let pageCount = 0;
  if (!isAbsent(props.pageCount)) pageCount = props.pageCount;
  else if (!isAbsent(props.total)) pageCount = Math.max(1, Math.ceil(props.total / pageSizeModel.value));
  return pageCount;
});

watch(pageCountBridge, val => {
  if (currentPageModel.value > val) currentPageModel.value = val;
});

watch(
  [currentPageModel, pageSizeModel],
  value => {
    emit("change", ...value);
  },
  { flush: "post" }
);

const handleSizeChange = (val: number) => {
  pageSizeModel.value = val;
  emit("size-change", pageSizeModel.value);

  const newPageCount = pageCountBridge.value;
  if (currentPageModel.value > newPageCount) currentPageModel.value = newPageCount;
};

const prev = () => {
  if (props.disabled) return;

  handleCurrentChange(currentPageModel.value - 1);
  emit("prev-click", currentPageModel.value);
};

const next = () => {
  if (props.disabled) return;

  handleCurrentChange(currentPageModel.value + 1);
  emit("next-click", currentPageModel.value);
};

const handleCurrentChange = (val: number) => {
  currentPageModel.value = val;
  const newPageCount = pageCountBridge.value;

  if (currentPageModel.value < 1) currentPageModel.value = 1;
  else if (currentPageModel.value > newPageCount) currentPageModel.value = newPageCount;
  emit("current-change", currentPageModel.value);
};

const addClass = (element: any, cls: string) => {
  if (element) {
    if (!element.props) element.props = {};
    element.props.class = [element.props.class, cls].join(" ");
  }
};

provide(paginationKey, {
  pageCount: pageCountBridge,
  disabled: computed(() => props.disabled),
  currentPage: currentPageModel,
  changeEvent: handleCurrentChange,
  handleSizeChange,
});

const components = computed(() => {
  if (!props.layout) return [];
  if (props.hideOnSinglePage && pageCountBridge.value <= 1) return [];
  const components = props.layout.split(",").map((item: string) => item.trim()) as LayoutKey[];
  const rootChildren: Array<VNode | VNode[] | null> = [];
  const rightWrapperChildren: Array<VNode | VNode[] | null> = [];
  const rightWrapperRoot = h("div", { class: ns.e("right-wrapper") }, rightWrapperChildren);

  let haveRightWrapper = false;

  components.forEach(c => {
    if (c === "->") {
      haveRightWrapper = true;
      return;
    }
    if (!haveRightWrapper) rootChildren.push(componentMap.value[c]);
    else rightWrapperChildren.push(componentMap.value[c]);
  });

  addClass(rootChildren[0], ns.is("first"));
  addClass(rootChildren[rootChildren.length - 1], ns.is("last"));

  if (rightWrapperChildren.length > 0) {
    addClass(rightWrapperChildren[0], ns.is("first"));
    addClass(rightWrapperChildren[rightWrapperChildren.length - 1], ns.is("last"));

    rootChildren.push(rightWrapperRoot);
  }

  return rootChildren;
});

const componentMap = computed(() => ({
  prev: h(Prev, {
    disabled: props.disabled,
    currentPage: currentPageModel.value,
    prevText: props.prevText,
    prevIcon: props.prevIcon,
    onClick: prev,
  }),
  jumper: h(Jumper, {
    size: props.size,
  }),
  pager: h(Pager, {
    currentPage: currentPageModel.value,
    pageCount: pageCountBridge.value,
    pagerCount: props.pagerCount,
    onChange: handleCurrentChange,
    disabled: props.disabled,
  }),
  next: h(Next, {
    disabled: props.disabled,
    currentPage: currentPageModel.value,
    pageCount: pageCountBridge.value,
    nextText: props.nextText,
    nextIcon: props.nextIcon,
    onClick: next,
  }),
  slot: slots?.default?.() ?? null,
  total: h(Total, { total: isAbsent(props.total) ? 0 : props.total }),
}));
</script>

<template>
  <div :class="[ns.b(), ns.is('background', background), ns.m(size)]">
    <component v-for="component in components" :key="component" :is="component" />
  </div>
</template>
