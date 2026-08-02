import { describe, expect, test } from 'vitest';
import { aiLabelSchema } from '../schema';

describe('aiLabelSchema', () => {
  test('accepts the shorthand variant string', () => {
    const result = aiLabelSchema.safeParse({ aiLabel: 'modified' });
    expect(result.success).toBe(true);
    expect(result.success && result.data.aiLabel).toBe('modified');
  });

  test('accepts a full object with note, label and scope', () => {
    const result = aiLabelSchema.safeParse({
      aiLabel: {
        variant: 'generated',
        note: 'Human-written, AI-edited.',
        label: 'Custom label',
        scope: [{ aspect: 'Copy editing', detail: 'Grammar pass with Claude' }],
      },
    });
    expect(result.success).toBe(true);
  });

  test('allows aiLabel to be omitted entirely', () => {
    const result = aiLabelSchema.safeParse({});
    expect(result.success).toBe(true);
    expect(result.success && result.data.aiLabel).toBeUndefined();
  });

  test.each(['basic', 'generated', 'modified'])('accepts the %s variant', (variant) => {
    const result = aiLabelSchema.safeParse({ aiLabel: variant });
    expect(result.success).toBe(true);
  });

  test('rejects an invalid variant string', () => {
    const result = aiLabelSchema.safeParse({ aiLabel: 'not-a-variant' });
    expect(result.success).toBe(false);
  });

  test('rejects an object missing "variant"', () => {
    const result = aiLabelSchema.safeParse({ aiLabel: { note: 'missing variant' } });
    expect(result.success).toBe(false);
  });

  test('rejects a scope item missing "detail"', () => {
    const result = aiLabelSchema.safeParse({
      aiLabel: { variant: 'modified', scope: [{ aspect: 'Copy editing' }] },
    });
    expect(result.success).toBe(false);
  });
});
