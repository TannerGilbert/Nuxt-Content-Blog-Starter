export default async () => {
  const { $content } = require('@nuxt/content')
  const files = await $content({ deep: true })
    .only(['path', 'updatedAt'])
    .fetch()
  return files.map((file) => {
    return {
      url: 'blog/' + file.path.replace('index', ''),
      lastmod: Date.parse(file.updatedAt),
    }
  })
}
