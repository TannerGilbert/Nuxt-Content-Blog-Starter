<template>
  <section id="articles" class="uk-container uk-section">
    <h1 v-if="!searchQuery">Articles</h1>
    <h1 v-if="searchQuery">Search results for: {{ searchQuery }}</h1>
    <div class="uk-margin">
      <form class="uk-search uk-search-default">
        <span class="uk-search-icon-flip" uk-search-icon></span>
        <nuxt-link class="nav-link" :to="execSearch()"
          ><button
            class="uk-search-icon-flip"
            uk-search-icon
            aria-label="Search"
          ></button
        ></nuxt-link>
        <input
          class="uk-search-input"
          type="search"
          placeholder="Search Articles"
          v-model="search"
          aria-label="Search Input"
        />
      </form>
    </div>
    <div class="uk-child-width-expand@s uk-text-center uk-grid" uk-grid>
      <section v-for="post in posts" :key="post.title" class="uk-width-1-3@m">
        <nuxt-link class="nav-link" :to="'/blog/' + post.path.split('/')[1]">
          <div class="uk-card uk-card-default uk-card-hover">
            <div>
              <div class="uk-card uk-card-default" style="min-height: 450px">
                <div class="uk-card-media-top">
                  <img
                    v-if="post.image"
                    :src="
                      require('~/content/' +
                        post.path.split('/')[1] +
                        '/images/' +
                        post.image)
                    "
                    :alt="post.title"
                    style="width: 100%; height: 250px"
                  />
                </div>
                <div class="uk-card-body">
                  <h3 class="uk-card-title" style="margin-top: 0px">
                    {{ post.title }}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </nuxt-link>
      </section>
    </div>
    <button
      class="uk-button uk-button-default"
      @click="getMorePosts"
      style="margin-top: 30px"
      v-if="!searchQuery"
    >
      See more articles
    </button>
  </section>
</template>

<script>
export default {
  watchQuery: ['s'],
  key: (to) => to.fullPath,
  data: function () {
    return {
      page: 1,
      search: '',
    }
  },
  methods: {
    async getMorePosts() {
      const blogPosts = await this.$content({ deep: true })
        .only(['title', 'description', 'image', 'path'])
        .sortBy('createdAt', 'desc')
        .skip(9 * this.page)
        .limit(9)
        .fetch()
      blogPosts.forEach((post) => {
        this.posts.push(post)
      })
      this.page++
    },
    execSearch() {
      if (this.search == '') return '/articles/'
      return '/articles/?s=' + this.search.toLowerCase()
    },
  },
  async asyncData({ $content, route }) {
    const searchQuery = route.query['s']

    let posts
    if (!searchQuery) {
      posts = await $content({ deep: true })
        .only(['title', 'description', 'image', 'path'])
        .sortBy('createdAt', 'desc')
        .limit(9)
        .fetch()
    } else {
      posts = await $content({ deep: true })
        .only(['title', 'description', 'image', 'path'])
        .sortBy('createdAt', 'desc')
        .search('title', searchQuery)
        .fetch()
    }

    return {
      posts: posts,
      searchQuery: searchQuery,
    }
  },
}
</script>

<style>
@media (max-width: 960px) {
  .uk-card {
    min-height: 0px !important;
  }
}

#articles a {
  text-decoration: none;
}
</style>
