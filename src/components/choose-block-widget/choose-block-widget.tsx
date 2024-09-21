'use client'

import { BlocksUnionTypes } from '@/lib/model/types'
import { RootState } from '@/lib/store'
import { setBlocks } from '@/lib/store/block-slice'
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks'
import { v4 as uuidv4 } from 'uuid'
import ButtonPrimary from '../button-primary'
import {
	chooseBlockArray,
	initialButtonBlock,
	initialHeadlineBlock,
	initialImageBlock,
	initialParagraphBlock,
} from './model'


export default function ChooseBlockWidget() {
	const dispatch = useAppDispatch()

	const currentBlocks = useAppSelector(
		(state: RootState) => state.block.currentBlocks
	)

	const handleAddBlock = (type: BlocksUnionTypes) => {
		let newBlock
		switch (type) {
			case 'headline':
				newBlock = { ...initialHeadlineBlock, id: uuidv4(), position: `${currentBlocks.length - 1}` }
				break
			case 'paragraph':
				newBlock = { ...initialParagraphBlock, id: uuidv4(), position: `${currentBlocks.length - 1}` }
				break
			case 'button':
				newBlock = { ...initialButtonBlock, id: uuidv4(), position: `${currentBlocks.length - 1}` }
				break
			case 'image':
				newBlock = { ...initialImageBlock, id: uuidv4(), position: `${currentBlocks.length - 1}` }
				break
			default:
				break
		}

		if (newBlock) {
			dispatch(setBlocks([...currentBlocks, newBlock]))
		}
	}

	return (
		<section className='w-full md:max-w-[270px] grid justify-center items-center justify-items-center grid-cols-[repeat(4,minmax(100px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(100px,1fr))] grid-rows-auto p-5 gap-4'>
			{chooseBlockArray.map(({ id, type, title, Icon }) => (
				<ButtonPrimary key={id} onClick={() => handleAddBlock(type)}>
					{Icon}
					{title}
				</ButtonPrimary>
			))}
		</section>
	)
}
