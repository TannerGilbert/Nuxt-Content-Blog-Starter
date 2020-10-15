<template>
  <div>
    <Header />
    <Nuxt />
    <Footer />
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";

export default {
  components: {
    Header,
    Footer
  }
}
</script>

<style>
p,
em {
  font-weight: 400;
  font-size: 20px;
  line-height: 33.1833px;
  letter-spacing: -0.063px;
  color: #0a0a23;
  margin-bottom: 26px;
  font-family: Lato, sans-serif;
  font-style: normal;
  overflow-wrap: break-word;
}
li {
  font-weight: 400;
  font-style: normal;
  font-size: 20px;
  line-height: 33.1833px;
  letter-spacing: -0.063px;
  font-family: Lato, sans-serif;
  color: #0a0a23;
  word-break: break-word;
}
ul {
  margin-bottom: 30px;
}
a {
  color: #1e87f0;
  text-decoration: none !important;
}
a:hover {
  color: #1e87f0;
}
</style>
