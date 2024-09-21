'use client'

import { RootState } from '@/lib/store'
import { useAppSelector } from '@/lib/store/hooks'
import { Button } from '../ui/button'

export default function PreviewWidget() {
	const currentBlocks = useAppSelector(
		(state: RootState) => state.block.currentBlocks
	)

	return (
		<section className='flex flex-col flex-1 justify-start items-center max-w-[632px] md:max-h-[calc(100svh-40px)] w-full h-[50%] overflow-y-auto pb-20'>
			{currentBlocks.map(({ id, type, content }) => (
				<div key={id} className='p-5'>
					{type === 'headline' && <h1 className='text-[#252A32] font-[700] text-[22px] max-w-[500px]'>{content}</h1>}
					{type === 'paragraph' && <p className='text-[#97AACD] font-[400] text-[14px] text-center text-balance max-w-[500px]'>{content}</p>}
					{type === 'button' && <Button className='bg-[#4368E0]'>{content}</Button>}
					{/* eslint-disable-next-line */}
					{type === 'image' && <img src={content} alt='image' />}
				</div>
			))}
		</section>
	)
}
