import { defineCollection } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';
import { aiLabelSchema } from 'starlight-ai-label/schema';

export const collections = {
  docs: defineCollection({ loader: docsLoader(), schema: docsSchema({ extend: aiLabelSchema }) }),
};
