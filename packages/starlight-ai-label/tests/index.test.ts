import { describe, expect, test, vi } from 'vitest';
import starlightAiLabel from '../index';

// Minimal stand-in for the `config:setup` hook context. We only exercise the
// handful of fields the plugin actually reads/calls.
function createContext(components: Record<string, string> = {}) {
  return {
    config: { components } as never,
    updateConfig: vi.fn(),
    logger: { warn: vi.fn() } as never,
  };
}

describe('starlightAiLabel', () => {
  test('returns a plugin with the expected name and hooks', () => {
    const plugin = starlightAiLabel();
    expect(plugin.name).toBe('starlight-ai-label');
    expect(typeof plugin.hooks['config:setup']).toBe('function');
  });

  test('overrides the PageTitle component when none is configured', () => {
    const plugin = starlightAiLabel();
    const ctx = createContext();

    plugin.hooks['config:setup']!(ctx as never);

    expect(ctx.updateConfig).toHaveBeenCalledWith({
      components: { PageTitle: 'starlight-ai-label/overrides/PageTitle.astro' },
    });
    expect(ctx.logger.warn).not.toHaveBeenCalled();
  });

  test('preserves other component overrides already set by the user', () => {
    const plugin = starlightAiLabel();
    const ctx = createContext({ Footer: './src/components/Footer.astro' });

    plugin.hooks['config:setup']!(ctx as never);

    expect(ctx.updateConfig).toHaveBeenCalledWith({
      components: {
        Footer: './src/components/Footer.astro',
        PageTitle: 'starlight-ai-label/overrides/PageTitle.astro',
      },
    });
  });

  test('warns and does not touch config when PageTitle is already overridden', () => {
    const plugin = starlightAiLabel();
    const ctx = createContext({ PageTitle: './src/components/Title.astro' });

    plugin.hooks['config:setup']!(ctx as never);

    expect(ctx.updateConfig).not.toHaveBeenCalled();
    expect(ctx.logger.warn).toHaveBeenCalled();
  });
});
