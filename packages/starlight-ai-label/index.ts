import type { StarlightPlugin } from '@astrojs/starlight/types';

export default function starlightAiLabel(): StarlightPlugin {
  return {
    name: 'starlight-ai-label',
    hooks: {
      'config:setup'({ config, updateConfig, logger }) {
        if (config.components?.PageTitle) {
          logger.warn('It looks like you already have a `PageTitle` component override in your Starlight configuration.');
          logger.warn(
            'To use `starlight-ai-label`, either remove your override or render the badge yourself by importing `AiLabelBadge` from `starlight-ai-label/components/AiLabelBadge.astro` in it, driven by the `aiLabel` frontmatter field.',
          );
          return;
        }

        updateConfig({
          components: {
            ...config.components,
            PageTitle: 'starlight-ai-label/overrides/PageTitle.astro',
          },
        });
      },
    },
  };
}
