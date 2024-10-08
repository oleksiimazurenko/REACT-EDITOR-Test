'use client'

import { RootState } from '@/lib/store'
import { useAppSelector } from '@/lib/store/hooks'
import { Button } from '../ui/button'

export default function PreviewWidget() {
	const currentBlocks = useAppSelector(
		(state: RootState) => state.block.currentBlocks
	)

	return (
		<section className='relative flex flex-col flex-1 justify-start items-center max-w-[632px] md:max-h-[calc(100svh-110px)] w-full max-md:h-[50%] overflow-y-auto py-5'>
			{currentBlocks.length === 0 && (
				<div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center '>
					No blocks added yet
				</div>
			)}
			{currentBlocks.map(({ id, type, content }) => (
				<div key={id} className='p-5'>
					{type === 'headline' && (
						<h1 className='text-[#252A32] font-[700] text-[22px] max-w-[500px]'>
							{content}
						</h1>
					)}
					{type === 'paragraph' && (
						<p className='text-[#97AACD] font-[400] text-[14px] text-center text-balance max-w-[500px]'>
							{content}
						</p>
					)}
					{type === 'button' && (
						<Button className='bg-[#4368E0]'>{content}</Button>
					)}
					{/* eslint-disable-next-line */}
					{type === 'image' && <img src={content} alt='image' />}
				</div>
			))}
		</section>
	)
}
