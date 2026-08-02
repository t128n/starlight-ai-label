import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import starlight from '@astrojs/starlight';
import starlightAiLabel from 'starlight-ai-label';

export default defineConfig({
  site: 'https://t128n.github.io',
  base: '/starlight-ai-label',
  integrations: [
    starlight({
      title: 'Starlight AI Label Demo',
      plugins: [starlightAiLabel()],
      sidebar: [
        {
          label: 'Examples',
          items: [{ autogenerate: { directory: 'examples' } }],
        },
      ],
    }),
    mdx(),
  ],
});
