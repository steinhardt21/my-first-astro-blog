import rss from '@astrojs/rss'
import type { AstroConfig } from 'astro'
import { getCollection } from 'astro:content'
import sanitize from 'sanitize-html'
import MarkdownIt from 'markdown-it'

const parser = new MarkdownIt() // transform markdown to html

export async function get(context: AstroConfig) {
  const blog = await getCollection('blog')

  return rss({
    title: 'The morning news',
    description: 'All news',
    site: context.site ?? '',
    items: blog.map((post) => {
      return {
        title: post.data.title,
        pubDate: post.data.date,
        description: post.data.description,
        link: `/blog/${post.slug}`,
        content: sanitize(parser.render(post.body))
      }
    })
  })
}