import { z } from 'astro/zod';

export const aiLabelVariants = ['basic', 'generated', 'modified'] as const;

const aiLabelVariantSchema = z.enum(aiLabelVariants);

const aiLabelScopeItemSchema = z.object({
  /** Short name of the aspect that was touched, e.g. "Copy editing". */
  aspect: z.string(),
  /** Detail of how AI was involved, e.g. "Grammar pass with Claude". */
  detail: z.string(),
});

const aiLabelObjectSchema = z.object({
  /** Which badge to render. */
  variant: aiLabelVariantSchema,
  /** Short one-line summary of what was AI-touched. */
  note: z.string().optional(),
  /** Override the default badge text (e.g. "AI Generated"). */
  label: z.string().optional(),
  /** Detailed breakdown rendered as an expandable disclosure when the badge is clicked. */
  scope: z.array(aiLabelScopeItemSchema).optional(),
});

/**
 * Accepts either the variant name directly (`aiLabel: modified`) or an object
 * for the `note`/`label`/`scope` fields (`aiLabel: { variant: modified, note: '...' }`).
 */
export const aiLabelFrontmatterSchema = z.union([aiLabelVariantSchema, aiLabelObjectSchema]).optional();

export const aiLabelSchema = z.object({
  aiLabel: aiLabelFrontmatterSchema,
});

export type AiLabelVariant = z.infer<typeof aiLabelVariantSchema>;
export type AiLabelScopeItem = z.infer<typeof aiLabelScopeItemSchema>;
export type AiLabelFrontmatter = z.infer<typeof aiLabelFrontmatterSchema>;
