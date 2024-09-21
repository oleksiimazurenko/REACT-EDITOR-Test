import ChooseBlockWidget from '@/components/choose-block-widget/choose-block-widget'
import PreviewWidget from '@/components/preview-widget/preview-widget'
import ToolsWidget from '@/components/tools-widget/tools-widget'

export default function Home() {
	return (
		<div className='flex justify-between items-center md:items-start w-full h-[calc(100svh-110px)] bg-white rounded-lg overflow-hidden flex-col md:flex-row'>
			<ChooseBlockWidget />
			<div className='w-full flex justify-between items-center md:items-start flex-1 flex-col md:flex-row max-h-[calc(100svh-125px)]'>
				<ToolsWidget />
				<PreviewWidget />
			</div>
		</div>
	)
}
