import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE } from '../data/site';

export const GET: APIRoute = async () => {
  const tutorials = await getCollection('tutorials', ({ data }) => !data.draft);
  const sorted = tutorials.sort((a, b) => b.data.updatedAt.getTime() - a.data.updatedAt.getTime());
  const items = sorted
    .map(
      (t) => `  <item>
    <title><![CDATA[${t.data.title}]]></title>
    <link>${SITE.domain}${t.data.permalink}</link>
    <guid>${SITE.domain}${t.data.permalink}</guid>
    <pubDate>${t.data.publishedAt.toUTCString()}</pubDate>
    <description><![CDATA[${t.data.description}]]></description>
  </item>`
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Drawinging Tutorials</title>
    <link>${SITE.domain}/</link>
    <description>${SITE.description}</description>
    <language>en-us</language>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  });
};
