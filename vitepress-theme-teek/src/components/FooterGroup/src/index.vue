<script setup lang="ts" name="FooterGroup">
import type { FooterGroup } from "@teek/config/types";
import { useTeekConfig } from "@teek/configProvider";
import { useNamespace } from "@teek/hooks";
import { isExternal } from "@teek/helper";
import { externalLinkIcon } from "@teek/assets/icons";
import Icon from "@teek/components/Icon";

defineOptions({ name: "FooterGroup" });

const ns = useNamespace("footer-group");

const { getTeekConfigRef } = useTeekConfig();

const footerGroupConfig = getTeekConfigRef<FooterGroup[]>("footerGroup", []);
</script>

<template>
  <div v-if="footerGroupConfig.length" :class="ns.b()">
    <div v-for="(group, index) in footerGroupConfig" :key="(group.title || '') + index">
      <div :class="[ns.e('title'), 'flx-center']">
        <Icon v-if="group.icon" :icon="group.icon" style="margin-right: 4px" aria-hidden="true" />
        {{ group.title }}
      </div>

      <ul>
        <li
          v-for="(link, idx) in group.links || []"
          :key="(link.name || '') + idx"
          :class="[ns.e('link'), 'flx-align-center']"
        >
          <Icon v-if="link.icon" :icon="link.icon" style="margin-right: 4px" aria-hidden="true" />
          <a
            :name="link.name"
            :href="link.link"
            :title="link.name"
            :target="isExternal(link.link || '') ? '_blank' : '_self'"
            class="hover-color"
            :aria-label="link.name"
            rel="noopener noreferrer"
            :aria-describedby="link.name"
          >
            {{ link.name }}
            <Icon
              v-if="isExternal(link.link || '')"
              :icon="externalLinkIcon"
              :class="ns.e('link__external-icon')"
              aria-hidden="true"
            />
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
