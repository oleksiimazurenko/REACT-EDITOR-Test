'use client'

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { BlocksUnionTypes } from '@/lib/model/types'
import { RootState } from '@/lib/store'
import { setActiveBlockId, setBlocks } from '@/lib/store/block-slice'
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks'
import { cn } from '@/lib/utils'
import { ArrowDown, ArrowUp, Copy, Trash2 } from 'lucide-react'
import { useRef } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { chooseBlockArray } from '../choose-block-widget/model'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

function capitalizeFirstLetter(str: string): string {
	if (!str) return ''
	return str.charAt(0).toUpperCase() + str.slice(1)
}

export default function ToolsWidget() {
	const dispatch = useAppDispatch()
	const currentBlocks = useAppSelector(
		(state: RootState) => state.block.currentBlocks
	)
	const activeBlockId = useAppSelector(
		(state: RootState) => state.block.activeBlockId
	)

	console.log(activeBlockId)

	return (
		<section className='w-full max-w-[538px] flex flex-col justify-start items-center h-[50%] flex-1 overflow-y-auto md:max-h-[calc(100svh-110px)] py-5'>
			<Accordion
				type='single'
				collapsible
				className='w-full'
				value={activeBlockId ? activeBlockId : ''}
				onValueChange={v => dispatch(setActiveBlockId(v === '' ? null : v))}
			>
				{currentBlocks.map(({ id, type }) => (
					<ToolContentBlock
						key={id}
						id={id}
						type={type}
						activeBlockId={activeBlockId}
					/>
				))}
			</Accordion>
		</section>
	)
}

type ToolContentBlockProps = {
	id: string
	type: BlocksUnionTypes
	activeBlockId?: string | null
}

const ToolContentBlock = ({
	id,
	type,
	activeBlockId,
}: ToolContentBlockProps) => {
	const dispatch = useAppDispatch()

	const currentBlocks = useAppSelector(
		(state: RootState) => state.block.currentBlocks
	)

	const accordionTriggerRef = useRef<HTMLButtonElement>(null)
	return (
		<AccordionItem
			value={id}
			className={cn(
				'[&>div]:mx-auto border-b-0 relative transition-all',
				id === activeBlockId && 'bg-[#D9E7FF] rounded-lg'
			)}
		>
			{id === activeBlockId && (
				<aside className='absolute -top-3 right-4 w-auto h-auto flex justify-center items-center gap-[2px]'>
					<div className='bg-[#449CF4] flex justify-center items-center overflow-hidden rounded-t-sm'>
						<Button
							className='bg-transparent w-[20px] h-[20px] p-1 shadow-none rounded-none hover:bg-[#4B97B8]'
							onClick={() => {
								const currentIndex = currentBlocks.findIndex(
									block => block.id === id
								)
								if (currentIndex === 0) return

								const newBlocks = [...currentBlocks]

								const updatedBlock1 = {
									...newBlocks[currentIndex],
									position: `${parseInt(newBlocks[currentIndex].position) - 1}`,
								}
								const updatedBlock2 = {
									...newBlocks[currentIndex - 1],
									position: `${
										parseInt(newBlocks[currentIndex - 1].position) + 1
									}`,
								}

								newBlocks[currentIndex] = updatedBlock2
								newBlocks[currentIndex - 1] = updatedBlock1

								dispatch(setBlocks(newBlocks))
							}}
						>
							<ArrowUp />
						</Button>

						<Button
							className='bg-transparent w-[20px] h-[20px] p-1 shadow-none rounded-none hover:bg-[#4B97B8]'
							onClick={() => {
								const currentIndex = currentBlocks.findIndex(
									block => block.id === id
								)
								if (currentIndex === currentBlocks.length - 1) return

								const newBlocks = [...currentBlocks]

								const updatedBlock1 = {
									...newBlocks[currentIndex],
									position: `${parseInt(newBlocks[currentIndex].position) + 1}`,
								}
								const updatedBlock2 = {
									...newBlocks[currentIndex + 1],
									position: `${
										parseInt(newBlocks[currentIndex + 1].position) - 1
									}`,
								}

								newBlocks[currentIndex] = updatedBlock2
								newBlocks[currentIndex + 1] = updatedBlock1

								dispatch(setBlocks(newBlocks))
							}}
						>
							<ArrowDown />
						</Button>
					</div>
					<div className='bg-[#68C2E9] flex justify-center items-center overflow-hidden rounded-t-sm'>
						<Button
							className='bg-transparent w-[20px] h-[20px] p-1 shadow-none rounded-none hover:bg-[#4B97B8]'
							onClick={() => {
								const blockToCopy = currentBlocks.find(block => block.id === id)

								if (blockToCopy) {
									const copyBlock = {
										...blockToCopy,
										id: uuidv4(), // Создаем новый уникальный идентификатор
										position: `${currentBlocks.length}`, // Обновляем позицию
									}

									// Добавляем новый блок в конец списка
									dispatch(setBlocks([...currentBlocks, copyBlock]))
								} else {
									console.log('Error copying block')
								}
							}}
						>
							<Copy />
						</Button>
						<Button
							className='bg-transparent w-[20px] h-[20px] p-1 shadow-none rounded-none hover:bg-[#4B97B8]'
							onClick={() => {
								const newBlocks = currentBlocks
									.filter(block => block.id !== id)
									.sort((a, b) => parseInt(a.position) - parseInt(b.position))
								dispatch(setBlocks(newBlocks))
							}}
						>
							<Trash2 />
						</Button>
					</div>
				</aside>
			)}
			<AccordionTrigger
				ref={accordionTriggerRef}
				className={cn(
					'bg-gray-200 p-3 m-2 rounded-md flex flex-col justify-center items-center gap-3 text-black !no-underline',
					id === activeBlockId && 'bg-white'
				)}
				onClick={() => {
					dispatch(setActiveBlockId(id))
				}}
			>
				<div>{chooseBlockArray.find(block => block.type === type)?.Icon}</div>
				{capitalizeFirstLetter(type)}
			</AccordionTrigger>
			<AccordionContent
				className={cn('flex justify-center items-center ')}
				style={{ width: accordionTriggerRef.current?.offsetWidth }}
			>
				<Input
					className={cn(
						'bg-gray-200 text-black p-3 m-2',
						id === activeBlockId && 'bg-white'
					)}
					type='text'
					placeholder='Edit text'
					value={currentBlocks.find(block => block.id === id)?.content}
					onChange={e => {
						const updatedBlocks = currentBlocks.map(block => {
							if (block.id === id) {
								return {
									...block,
									content: e.target.value,
								}
							}
							return block
						})
						dispatch(setBlocks(updatedBlocks))
					}}
				/>
			</AccordionContent>
		</AccordionItem>
	)
}
