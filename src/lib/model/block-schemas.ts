import { z } from 'zod'

export const headlineBlockSchema = z.object({
	id: z.string(),
	type: z.literal('headline'),
	content: z.string(),
	position: z.string(),
});

export const paragraphBlockSchema = z.object({
	id: z.string(),
	type: z.literal('paragraph'),
	content: z.string(),
	position: z.string(),
});

export const buttonBlockSchema = z.object({
	id: z.string(),
	type: z.literal('button'),
	content: z.string(),
	position: z.string(),
})

export const imageBlockSchema = z.object({
	id: z.string(),
	type: z.literal('image'),
	content: z.string(),
	position: z.string(),
});