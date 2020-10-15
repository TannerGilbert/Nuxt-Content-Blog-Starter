<template>
  <article>
    <div class="uk-container">
      <div class="uk-section">
        <h1>{{ article.title }}</h1>
        <p>Published on: {{ formatDate(article.createdAt) }}</p>
        <img
          v-if="article.image"
          :src="
            require('~/content/' +
              article.path.split('/')[1] +
              '/images/' +
              article.image)
          "
          :alt="article.title"
          id="header-image"
        />
        <TableOfContent :toc="article.toc" />
        <nuxt-content :document="article" />
      </div>
    </div>

    <section class="uk-section">
      <div class="uk-container">
        <h2 class="uk-text-bold">More stories</h2>
        <div data-uk-slider="velocity: 5">
          <div class="uk-position-relative">
            <div class="uk-slider-container">
              <ul
                class="uk-slider-items uk-child-width-1-2@s uk-child-width-1-3@m uk-grid uk-grid-medium"
              >
                <li v-for="story in moreStories" :key="story.title">
                  <!-- card -->
                  <div>
                    <div
                      class="uk-card uk-card-default uk-card-small"
                      style="box-shadow: none"
                    >
                      <div class="uk-card-media-top">
                        <nuxt-link :to="'/blog/' + story.path.split('/')[1]">
                          <img
                            v-if="story.image"
                            :data-src="
                              require('~/content/' +
                                story.path.split('/')[1] +
                                '/images/' +
                                story.image)
                            "
                            width="620"
                            height="350"
                            style="width: 620px; height: 350px"
                            data-uk-img="target: !.uk-slideshow-items"
                            alt=""
                        /></nuxt-link>
                      </div>
                      <div class="uk-card-body">
                        <h4 class="uk-margin-small-bottom uk-text-bold">
                          {{ story.title }}
                        </h4>
                      </div>
                    </div>
                  </div>
                  <!-- /card -->
                </li>
              </ul>
            </div>
            <ul class="uk-slider-nav uk-dotnav uk-flex-center uk-margin"></ul>
            <div class="uk-hidden@m uk-light">
              <a
                class="uk-position-center-left uk-position-small"
                href="#"
                data-uk-slidenav-previous
                data-uk-slider-item="previous"
              ></a>
              <a
                class="uk-position-center-right uk-position-small"
                href="#"
                data-uk-slidenav-next
                data-uk-slider-item="next"
              ></a>
            </div>
            <div class="uk-visible@m">
              <a
                class="uk-position-center-left-out uk-position-small"
                href="#"
                data-uk-slidenav-previous
                data-uk-slider-item="previous"
              ></a>
              <a
                class="uk-position-center-right-out uk-position-small"
                href="#"
                data-uk-slidenav-next
                data-uk-slider-item="next"
              ></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </article>
</template>

<script>
import Prism from '~/plugins/prism'
import TableOfContent from '~/components/TableOfContent.vue'
export default {
  components: {
    TableOfContent,
  },
  async asyncData({ $content, params, error }) {
    try {
      const [article] = await $content({ deep: true })
        .where({ dir: `/${params.slug}` })
        .fetch()
      const moreStories = await $content({ deep: true })
        .only(['title', 'image', 'path'])
        .where({ title: { $ne: article.title } })
        .sortBy('createdAt', 'desc')
        .limit(3)
        .fetch()
      return { article, moreStories }
    } catch (err) {
      error({
        statusCode: 404,
        message: 'Page could not be found',
      })
    }
  },
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    },
  },
  mounted() {
    Prism.highlightAll()
  },
}
</script>

<style scoped>
.nuxt-content h2 {
  font-weight: bold;
  font-size: 28px;
}
.nuxt-content h3 {
  font-weight: bold;
  font-size: 22px;
}
.nuxt-content p {
  margin-bottom: 20px;
}
#header-image {
  width: 100%;
}
</style>