<script lang="ts" setup>
import { TkMessage } from "vitepress-theme-teek";
import { h } from "vue";

const openDefault = () => {
  TkMessage({
    message: "This is a message.",
    customClass: "antd",
  });
};

const openPrimary = () => {
  TkMessage.primary({
    message: "Oops, this is a primary message.",
    customClass: "antd",
  });
};

const openSuccess = () => {
  TkMessage({
    message: "Congrats, this is a success message.",
    type: "success",
    customClass: "antd",
  });
};
const openWarning = () => {
  TkMessage({
    message: "Warning, this is a warning message.",
    type: "warning",
    customClass: "antd",
  });
};
const openError = () => {
  TkMessage.error({
    message: "Oops, this is a error message.",
    customClass: "antd",
  });
};

const openVn = () => {
  TkMessage({
    message: h("p", { style: "line-height: 1; font-size: 14px" }, [
      h("span", null, "Message can be "),
      h("i", { style: "color: teal" }, "VNode"),
    ]),
    customClass: "antd",
  });
};

const openPlain = () => {
  TkMessage({ message: "Congrats, this is a success message.", type: "success", plain: true, customClass: "antd" });
};
</script>

<template>
  <div class="message-container">
    <button class="hover-color" @click="openPrimary">Primary</button>
    <button class="hover-color" @click="openSuccess">Success</button>
    <button class="hover-color" @click="openWarning">Warning</button>
    <button class="hover-color" @click="openDefault">Message</button>
    <button class="hover-color" @click="openError">Error</button>
    <button class="hover-color" @click="openVn">VNode</button>

    <button @click="openPlain">Plain Success</button>
  </div>
</template>

<style scoped>
.message-container {
  display: flex;
  gap: 20px;
}
</style>
