<script setup lang="ts" name="BaseTemplate">
import type { TkIconProps } from "@teek/components/common/Icon";
import { ref, useTemplateRef } from "vue";
import { ns } from "../namespace";
import { TkIcon } from "@teek/components/common/Icon";
import Title from "./Title.vue";
import Helper from "./Helper.vue";
import BorderHighlight from "./BorderHighlight.vue";

defineOptions({ name: "BaseTemplate" });

interface TemplateProps {
  /**
   * 标题
   */
  title?: string;
  /**
   * Helper 内的描述
   */
  helperDesc?: string;
  /**
   * 图标
   */
  icon?: TkIconProps["icon"];
  /**
   * 提示信息
   */
  tips?: { title?: string; content?: string; icon?: TkIconProps["icon"] }[];
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 是否显示帮助
   */
  helper?: boolean;
  /**
   * 是否边框高亮
   */
  borderHighlight?: boolean;
}

const { borderHighlight = true } = defineProps<TemplateProps>();

const helperVisible = ref(false);
const titleElementRef = useTemplateRef<HTMLDivElement>("titleElementRef");
</script>

<template>
  <div>
    <div ref="titleElementRef" class="flx-align-center">
      <Title :title :icon="icon" :disabled="disabled" :aria-label="title" />

      <Helper v-if="helper" v-model="helperVisible" :virtual-el="titleElementRef!">
        <div :class="ns.e('helper__body')">
          <h4 :class="ns.em('helper', 'title')">
            <slot name="helper-title">{{ title }}</slot>
          </h4>
          <p :class="ns.em('helper', 'desc')">
            <slot name="helper-desc">{{ helperDesc }}</slot>
          </p>

          <div v-for="(tip, index) in tips" :key="index" :class="ns.e('helper__body__tip')">
            <div class="flx-align-center" style="margin-bottom: 6px">
              <TkIcon v-if="tip.icon" :icon="tip.icon" :size="16" style="margin-right: 4px" />
              <span v-if="tip.title" style="font-weight: 600">
                {{ tip.title }}
              </span>
            </div>
            <span v-if="tip.content">{{ tip.content }}</span>
          </div>
        </div>
      </Helper>
    </div>

    <BorderHighlight v-if="borderHighlight" :active="helperVisible" style="margin-top: 8px">
      <slot />
    </BorderHighlight>

    <div v-else style="margin-top: 8px">
      <slot />
    </div>
  </div>
</template>
