import { z } from 'zod'
import { headlineBlockSchema, paragraphBlockSchema, buttonBlockSchema, imageBlockSchema } from './block-schemas'

export type BlocksType = HeadlineBlockType | ParagraphBlockType | ButtonBlockType | ImageBlockType;

export type BlocksUnionTypes = 'headline' | 'paragraph' | 'button' | 'image'

export type HeadlineBlockType = z.infer<typeof headlineBlockSchema>
export type ParagraphBlockType = z.infer<typeof paragraphBlockSchema>
export type ButtonBlockType = z.infer<typeof buttonBlockSchema>
export type ImageBlockType = z.infer<typeof imageBlockSchema>