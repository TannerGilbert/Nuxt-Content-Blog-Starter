<template>
  <section class="tableofcontent">
    <h3>Table of Content</h3>
    <div id="toc">
      <ul>
        <li
          v-for="link of toc"
          :key="link.id"
          :class="{ toc2: link.depth === 2, toc3: link.depth === 3 }"
        >
          <NuxtLink :to="`#${link.id}`">{{ link.text }}</NuxtLink>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  props: ['toc'],
}
</script>

<style>
#toc li {
  font-size: 18px;
}
#toc li a {
  cursor: default;
  text-decoration: none;
}
#toc ul {
  margin-bottom: 5px;
}
.tableofcontent h3 {
  margin-top: 0px;
}
.tableofcontent {
  width: 80%;
  margin: 20px auto;
  padding: 20px;
  border-color: rgba(0, 0, 0, 0.125);
  border-radius: 4px;
  border-style: solid;
  border-width: 0.666667px;
}
</style>
