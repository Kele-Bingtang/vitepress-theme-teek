<script setup>
import { onBeforeMount, onMounted, ref } from "vue";
import { useVpRouter, useNamespace } from "@teek/composables";
import { isString } from "@teek/helper";
import { useTeekConfig } from "@teek/components/theme/ConfigProvider";

const loading = ref(false);
const ns = useNamespace("route-loading");
const vpRouter = useVpRouter();
const { getTeekConfigRef } = useTeekConfig();

const loadingConfig = getTeekConfigRef("loading", true);

/**
 * 路由开始时加载 Loading 动画
 */
vpRouter.bindBeforeRouteChange("routeLoadingBefore", () => {
  handleRouteStart();
});

/**
 * 路由结束时取消 Loading 动画
 */
vpRouter.bindAfterRouteChange("routeLoadingAfter", () => {
  handleRouteComplete();
});

const handleRouteStart = () => (loading.value = true);
const handleRouteComplete = () => (loading.value = false);
onBeforeMount(() => {
  // 首次加载 Loading 动画
  handleRouteStart();
});

onMounted(() => {
  setTimeout(handleRouteComplete, 100);
});
</script>

<template>
  <slot :loading>
    <div :class="ns.b()">
      <div v-show="loading" :class="ns.e('mask')">
        <div :class="ns.e('loader')">
          <div :class="ns.e('spinner')" />
          <p>{{ isString(loadingConfig) ? loadingConfig : "Teek 拼命加载中 ..." }}</p>
        </div>
      </div>
    </div>
  </slot>
</template>
