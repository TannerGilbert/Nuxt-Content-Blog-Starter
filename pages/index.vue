<template>
  <div>
    <section class="uk-section uk-section-small">
      <div class="uk-container">
        <div class="uk-height-large uk-cover-container uk-border-rounded">
          <img
            src="https://picsum.photos/1300/500/?random"
            alt="Alt img"
            data-uk-cover
          />
          <div
            class="uk-overlay uk-overlay-primary uk-position-cover uk-flex uk-flex-center uk-flex-middle uk-light uk-text-center"
          >
            <div data-uk-scrollspy="cls: uk-animation-slide-bottom-small">
              <span style="letter-spacing: 0.2em; font-size: 0.725rem"
                >FEATURED ARTICLE</span
              >
              <h1
                class="uk-margin-top uk-margin-small-bottom uk-margin-remove-adjacent"
              >
                {{ featured.title }}
              </h1>
              <nuxt-link
                :to="'/blog/' + featured.path.split('/')[1]"
                class="uk-button uk-button-default uk-margin-top"
                >GO TO ARTICLE</nuxt-link
              >
            </div>
          </div>
        </div>
      </div>
    </section>

    <!--CONTENT-->
    <div class="uk-section uk-section-default">
      <div class="uk-container">
        <h4 class="uk-heading-line uk-text-bold">
          <span>Latest Articles</span>
        </h4>
        <div class="uk-child-width-expand@s uk-text-center uk-grid" uk-grid>
          <section
            v-for="post in articles"
            :key="post.title"
            class="uk-width-1-3@m"
          >
            <nuxt-link class="nav-link" :to="'/blog/' + post.path.split('/')[1]">
              <div class="uk-card uk-card-default uk-card-hover">
                <div>
                  <div
                    class="uk-card uk-card-default"
                    style="min-height: 450px"
                  >
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
          >
            See more articles
          </button>
      </div>
    </div>
    <!--/CONTENT-->
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      page: 1,
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
        this.articles.push(post)
      })
      this.page++
    },
    lowerCase(s) {
      return s.toLowerCase()
    },
  },
  async asyncData({ $content, params }) {
    try {
      const articles = await $content({ deep: true })
        .only(['title', 'description', 'image', 'path'])
        .sortBy('createdAt', 'desc')
        .limit(9)
        .fetch()
      const [featured] = await $content({ deep: true })
        .where({ dir: `/my-first-blog-post` })
        .only(['title', 'description', 'image', 'path'])
        .fetch()
      return { articles, featured }
    } catch (err) {
      error({
        statusCode: 404,
        message: 'Page could not be found',
      })
    }
  },
}
</script>

<style scoped>
h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: 700;
}
</style>