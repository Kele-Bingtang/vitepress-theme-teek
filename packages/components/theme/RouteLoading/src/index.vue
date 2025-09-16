<script setup>
import { onBeforeMount, onMounted, watch } from "vue";
import { onContentUpdated } from "vitepress";
import { useVpRouter, useNamespace } from "@teek/composables";
import { isString } from "@teek/helper";
import { useTeekConfig } from "@teek/components/theme/ConfigProvider";

const loading = defineModel({ default: true });
const ns = useNamespace("route-loading");
const vpRouter = useVpRouter();
const { getTeekConfigRef } = useTeekConfig();

const loadingConfig = getTeekConfigRef("loading", false);

/**
 * 路由开始时加载 Loading 动画
 */
const handleRouteStart = () => {
  if (!loading.value) loading.value = true;
};
/**
 * 路由完成时关闭 Loading 动画
 */
const handleRouteComplete = () => {
  setTimeout(
    () => {
      if (loading.value) loading.value = false;
    },
    Math.floor(Math.random() * (500 - 460 + 1)) + 460
  );
};

/**
 * 路由开始时加载 Loading 动画
 */
vpRouter.bindBeforeRouteChange(
  "routeLoadingBefore",
  () => {
    handleRouteStart();
  },
  "before"
);

/**
 * 路由结束时取消 Loading 动画
 */
vpRouter.bindAfterRouteChange(
  "routeLoadingAfter",
  () => {
    handleRouteComplete();
  },
  "before"
);

watch(
  () => vpRouter.route.path,
  () => {
    handleRouteStart();
    handleRouteComplete();
  }
);

onBeforeMount(handleRouteStart);

onMounted(handleRouteComplete);

onContentUpdated(handleRouteComplete);
</script>

<template>
  <slot :loading>
    <div :class="ns.b()">
      <Transition :name="ns.join('fade')" mode="out-in">
        <div v-show="loading" :class="ns.e('mask')">
          <div :class="ns.e('loader')">
            <div :class="ns.e('spinner')" />
            <p>{{ isString(loadingConfig) ? loadingConfig : "Teek 拼命加载中 ..." }}</p>
          </div>
        </div>
      </Transition>
    </div>
  </slot>
</template>
