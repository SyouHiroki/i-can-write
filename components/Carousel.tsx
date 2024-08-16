import 'bear-react-carousel/dist/index.css'
import BearCarousel, {TBearSlideItemDataList, BearSlideCard, ICarouselState, Controller} from 'bear-react-carousel'
import { useEffect, useState } from 'react';

export const Carousel: React.FC<{
  data: {id: number, render: JSX.Element}[]
  current?: number
}> = props => {
  const [controller, setController] = useState<Controller>()
  const [carouselState, setCarouselState] = useState<ICarouselState>()

  const bearSlideItemData: TBearSlideItemDataList = props.data.map(item => (
    <BearSlideCard key={item.id}>
        {item.render}
    </BearSlideCard>
  ))

  useEffect(() => {
    if (props.current !== undefined) {
      if (carouselState?.source.activeIndex !== props.current) {
        controller?.slideToPage(props.current + 1)
      }
    }
    
  }, [props, carouselState, controller])

  return (
    <div>
      <BearCarousel
        data={bearSlideItemData} 
        height="100vh"
        onSlideChange={setCarouselState}
        setController={setController}
        // isDebug
      />

    </div>
  )
}

export default Carousel
