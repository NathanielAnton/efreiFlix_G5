<script setup lang="ts">

import {onBeforeMount, ref, type Ref} from "vue";

const breadcrumb: Ref<string[]> = ref([]);

onBeforeMount(() => {
  const path = window.location.pathname;
  const pathArray = path.split("/");
  pathArray.shift();
  pathArray.forEach((path, index) => {
    const pathArray = path.split("-");
    pathArray.forEach((path, index) => {
      pathArray[index] = path.charAt(0).toUpperCase() + path.slice(1);
    });
    pathArray.join(" ");
    pathArray[index] = pathArray.join(" ");
  });
  breadcrumb.value = pathArray;
})
</script>

<template>
  <section class="breadcrumb">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb__list">
        <li class="breadcrumb__item">
          <a href="/">Netflix</a>
        </li>
        <li class="breadcrumb__item" v-for="(path, index) in breadcrumb" :key="index">
          <a v-if="path === ''" href="/">Home</a>
          <a v-else :href="path">{{ path }}</a>
        </li>
      </ol>
    </nav>
  </section>
</template>

<style>
.breadcrumb {
  display: flex;
  margin: 20px 4%;
}

.breadcrumb__list {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}

.breadcrumb__item {
  margin: 0 0.5rem;

  a {
    text-decoration: underline;
  }
}

.breadcrumb__item:first-child{
  margin-left: 0;
}

.breadcrumb__item:not(:last-child)::after {
  content: "»";
  margin-left: 1rem;
}
</style>