
import HeadlineIcon from 'BASE_URL/public/images/headline-icon.svg'
import ParagraphIcon from 'BASE_URL/public/images/paragraph-icon.svg'
import ButtonIcon from 'BASE_URL/public/images/button-icon.svg'
import ImageIcon from 'BASE_URL/public/images/image-icon.svg'
import { BlocksUnionTypes, ButtonBlockType, HeadlineBlockType, ImageBlockType, ParagraphBlockType } from '@/lib/model/types'
import { v4 as uuidv4 } from 'uuid';


export type ChooseBlockArray = {
	id: string;
	type: BlocksUnionTypes
	title: string;
	Icon: React.ReactNode;
}[]

export const chooseBlockArray: ChooseBlockArray = [
	{
		id: uuidv4(),
		type: 'headline',
		title: 'Headline',
		Icon: <HeadlineIcon />,
	},
	{
		id: uuidv4(),
		type: 'paragraph',
		title: 'Paragraph',
		Icon: <ParagraphIcon />,
	},
	{
		id: uuidv4(),
		type: 'button',
		title: 'Button',
		Icon: <ButtonIcon />,
	},
	{
		id: uuidv4(),
		type: 'image',
		title: 'Image',
		Icon: <ImageIcon />,
	},
	// {
	// 	id: uuidv4(),
	// 	title: 'Video',
	// }
]

export const initialHeadlineBlock: Omit<HeadlineBlockType, 'id' | 'position'>  = {
	type: 'headline',
	content: 'A legendary cap set that feels like new',
}

export const initialParagraphBlock: Omit<ParagraphBlockType, 'id' | 'position'> = {
	type: 'paragraph',
	content: 'Prompt your customer to revisit your store by showing them the products they left behind. Consider offering them a coupon code to close the deal.Using the "Insert" panel on the right, drag and drop the Abandoned Cart element onto the page below.',
}

export const initialButtonBlock: Omit<ButtonBlockType, 'id' | 'position'> = {
	type: 'button',
	content: 'Register now',
}

export const initialImageBlock: Omit<ImageBlockType, 'id' | 'position'> = {
	type: 'image',
	content: 'https://via.placeholder.com/150',
}