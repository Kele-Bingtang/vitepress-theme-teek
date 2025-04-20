<script lang="ts" setup name="Message">
import type { MessageEmits, MessageProps, MessageType } from "./message";
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import { VPBadge } from "vitepress/theme";
import { useEventListener, useNamespace, useZIndex } from "@teek/hooks";
import { closeIcon, circleCloseFilledIcon, infoFilledIcon, successFilledIcon, warningFilledIcon } from "@teek/assets";
import { TkIcon } from "@teek/components/common/Icon";
import { messagePropsDefaults } from "./message";
import { getLastOffset, getOffsetOrSpace } from "./instance";

defineOptions({ name: "Message" });

const props = withDefaults(defineProps<MessageProps>(), messagePropsDefaults as any) as Required<MessageProps>;
const emit = defineEmits<MessageEmits>();

const iconsMap = {
  success: successFilledIcon,
  warning: warningFilledIcon,
  error: circleCloseFilledIcon,
  info: infoFilledIcon,
};

const isStartTransition = ref(false);

const ns = useNamespace("message");
const { currentZIndex, nextZIndex } = useZIndex();

const messageRef = ref<HTMLDivElement>();
const visible = ref(false);
const height = ref(0);

const badeTypeMap: Record<MessageType, string> = {
  info: "info",
  success: "success",
  warning: "warning",
  error: "danger",
};

const badgeType = computed(() => (props.type ? badeTypeMap[props.type] : "info"));
const typeClass = computed(() => {
  const type = props.type;
  return { [ns.bm("icon", type)]: type && iconsMap[type] };
});
const iconComponent = computed(() => props.icon || iconsMap[props.type] || "");

const lastOffset = computed(() => getLastOffset(props.id));
const offset = computed(() => getOffsetOrSpace(props.id, props.offset) + lastOffset.value);
const bottom = computed((): number => height.value + offset.value);
const customStyle = computed(() => ({
  top: `${offset.value}px`,
  zIndex: currentZIndex.value,
}));

let timer: ReturnType<typeof setTimeout> | null;

const clearTimer = () => {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
};

const startTimer = () => {
  if (props.duration === 0) return;

  clearTimer();
  timer = setTimeout(() => {
    close();
  }, props.duration);
};

const close = () => {
  visible.value = false;

  // 如果消息从未开始转换，则可以立即销毁它
  nextTick(() => {
    if (!isStartTransition.value) {
      props.onClose?.();
      emit("destroy");
    }
  });
};

const keydown = ({ code }: KeyboardEvent) => {
  if (code === "Space") {
    // 按 ESC 关闭信息
    close();
  }
};

let resizeObserver: ResizeObserver;

onMounted(() => {
  startTimer();
  nextZIndex();
  visible.value = true;

  // 添加 ResizeObserver
  resizeObserver = new ResizeObserver(() => {
    if (messageRef.value) height.value = messageRef.value.getBoundingClientRect().height;
  });

  if (messageRef.value) resizeObserver.observe(messageRef.value);
});

onUnmounted(() => {
  // 移除 ResizeObserver
  if (resizeObserver && messageRef.value) resizeObserver.unobserve(messageRef.value);
});

watch(
  () => props.repeatNum,
  () => {
    clearTimer();
    startTimer();
  }
);

useEventListener(document, "keydown", keydown);

defineExpose({
  visible,
  bottom,
  close,
});
</script>

<template>
  <transition
    :name="ns.b('fade')"
    @before-enter="isStartTransition = true"
    @before-leave="onClose"
    @after-leave="$emit('destroy')"
  >
    <div
      v-show="visible"
      :id="id"
      ref="messageRef"
      :class="[
        ns.b(),
        { [ns.m(type)]: type },
        ns.is('center', center),
        ns.is('closable', showClose),
        ns.is('plain', plain),
        customClass,
      ]"
      :style="customStyle"
      role="alert"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <VPBadge v-if="repeatNum > 1" :text="repeatNum" :type="badgeType" :class="ns.e('badge')" />
      <TkIcon v-if="iconComponent" :icon="iconComponent" :class="[ns.e('icon'), typeClass]" />
      <slot>
        <p v-if="!dangerouslyUseHTMLString" :class="ns.e('content')">
          {{ message }}
        </p>
        <p v-else :class="ns.e('content')" v-html="message" />
      </slot>
      <TkIcon v-if="showClose" :icon="closeIcon" :class="ns.e('closeBtn')" @click.stop="close" />
    </div>
  </transition>
</template>
