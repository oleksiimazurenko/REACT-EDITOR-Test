import { cn } from '@/lib/utils'
import React, { ComponentProps } from 'react'
import { Button } from './ui/button'

type ButtonPrimaryProps = ComponentProps<typeof Button> & {
	children: React.ReactNode
	className?: string
}

export default function ButtonPrimary({
	className,
	children,
	...ButtonProps
}: ButtonPrimaryProps) {
	return (
		<Button
			className={cn(
				'flex justify-center items-center flex-col w-[100px] h-[83px] bg-[#F6F9FE] text-[#252A32] gap-1 font-[400] text-[12px] hover:bg-[#F6F9FE]/50',
				className
			)}
			{...ButtonProps}
		>
			{children}
		</Button>
	)
}
