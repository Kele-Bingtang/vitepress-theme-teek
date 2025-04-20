<script setup lang="ts" name="ArchivesPage">
import { withBase, useData } from "vitepress";
import { computed, unref } from "vue";
import { useNamespace, useLocale } from "@teek/hooks";
import { usePosts } from "@teek/configProvider";

defineOptions({ name: "ArchivesPage" });

const ns = useNamespace("archives");
const { t } = useLocale();

const { frontmatter } = useData();

const posts = usePosts();

const defaultLabel = computed(() => {
  return {
    title: unref(frontmatter).title ?? t("tk.archives.title"),
    totalCount: unref(frontmatter).totalCount ?? t("tk.archives.totalCount"),
    year: unref(frontmatter).year ?? t("tk.archives.year"),
    month: unref(frontmatter).month ?? t("tk.archives.month"),
    count: unref(frontmatter).count ?? t("tk.archives.count"),
    notFound: unref(frontmatter).notFound ?? t("tk.archives.notFound"),
  };
});
</script>

<template>
  <div :class="`${ns.b()} ${ns.joinNamespace('page')}`" :aria-label="t('tk.archives.label')">
    <slot name="teek-archives-top-before" />

    <div :class="`${ns.e('header')} flx-justify-between`">
      <h1 :class="ns.joinNamespace('page-title-h1')">{{ defaultLabel.title }}</h1>
      <div class="count">
        {{ defaultLabel.totalCount.replace("{count}", posts.sortPostsByDate.length) }}
      </div>
    </div>

    <slot name="teek-archives-top-after" />

    <div :class="ns.e('timeline')">
      <template v-for="(monthPosts, year) in posts.groupPostsByYearMonth" :key="year">
        <div :class="`${ns.em('timeline', 'year')} flx-justify-between`">
          <div class="year">
            {{ String(year).trim() === "NaN" ? defaultLabel.notFound : String(year).trim() + defaultLabel.year }}
          </div>
          <div class="count">{{ posts.groupPostsByYear[year].length + defaultLabel.count }}</div>
        </div>

        <div :class="ns.e('timeline__m')">
          <template v-for="(p, month) in monthPosts" :key="month">
            <div :class="`${ns.em('timeline__m', 'month')} flx-justify-between`">
              <div class="month">
                {{ String(month) === "NaN" ? defaultLabel.notFound : month + defaultLabel.month }}
              </div>
              <div class="count">{{ p.length + defaultLabel.count }}</div>
            </div>

            <ul>
              <li v-for="item in p" :key="item.url">
                <a :href="item.url && withBase(item.url)" :aria-label="`${item.title}`">
                  <span class="date">{{ item.date?.slice(5, 10) }}</span>
                  <span>{{ item.title }}</span>
                </a>
              </li>
            </ul>
          </template>
        </div>
      </template>
    </div>

    <div class="vp-doc">
      <Content />
    </div>
  </div>
</template>
