<template>
  <header
    id="header"
    style="background-color: #fff"
    data-uk-sticky="show-on-up: true; animation: uk-animation-fade; media: @l"
  >
    <div class="uk-container">
      <nav id="navbar" data-uk-navbar="mode: click;">
        <div class="uk-navbar-left nav-overlay">
          <ul class="uk-navbar-nav">
            <li>
              <router-link tag="a" to="/" exact
                >My Nuxt Content Blog</router-link
              >
            </li>
          </ul>
        </div>
        <div class="uk-navbar-right nav-overlay">
          <a
            class="uk-navbar-toggle"
            data-uk-search-icon
            data-uk-toggle="target: .nav-overlay; animation: uk-animation-fade"
            href="#"
          ></a>
          <div class="uk-navbar-item">
            <a
              style="margin-right: 4px"
              href="#"
              data-uk-icon="twitter"
            ></a>
            <a
              style="margin-right: 4px"
              href="#"
              data-uk-icon="github"
            ></a>
            <a
              style="margin-right: 4px"
              href="#"
              data-uk-icon="youtube"
            ></a>
          </div>
        </div>
        <div class="nav-overlay uk-navbar-left uk-flex-1" hidden>
          <div class="uk-navbar-item uk-width-expand">
            <form
              class="uk-search uk-search-navbar uk-width-1-1"
              v-on:submit.prevent="search"
            >
              <input
                class="uk-search-input"
                type="search"
                v-model="searchInHeader"
                placeholder="Search..."
              />
            </form>
          </div>
          <a
            class="uk-navbar-toggle"
            data-uk-close
            data-uk-toggle="target: .nav-overlay; animation: uk-animation-fade"
            href="#"
          ></a>
        </div>
      </nav>
    </div>
  </header>
</template>

<style scoped>
#header.uk-sticky-below {
  box-shadow: 0 2px 14px 0 rgba(0, 0, 0, 0.07);
}
</style>

<script>
export default {
  data: function () {
    return {
      searchInHeader: '',
    }
  },
  methods: {
    search() {
      if (this.searchInHeader == '') {
        this.$router.push('/articles/')
      } else {
        this.$router.push('/articles/?s=' + this.searchInHeader.toLowerCase())
        this.searchInHeader = ''
      }
    },
  },
}
</script>
