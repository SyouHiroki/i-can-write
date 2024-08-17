import { Orientation } from "@/hooks"

export const Drawer: React.FC<{
  children: JSX.Element | string
  isClose?: boolean
  contentHeight?: number
  orientation: Orientation
  toggleHandler?: () => void
}> = props => {

  return (
    <div className="absolute bottom-0 z-[9999] overflow-hidden">

      <div className="flex justify-end">
        <div
          className="bg-[#f9f9f9] w-[10vw] h-[8vw] flex justify-center items-center rounded-tl-md"
          style={props.orientation === 'portrait' ? {width: '10vw', height: '8vw'} : {width: '5vh', height: '4vh'}}
          onClick={props.toggleHandler}
        >
          <div
            className={`w-0 h-0 border-solid border-l-transparent border-r-transparent ${props.isClose ? 'border-b-[#7c7c7c]' : 'border-t-[#7c7c7c]'}`}
            style={(() => {
              if (props.isClose) {
                return props.orientation === 'portrait' ? {borderLeftWidth: '2vw', borderRightWidth: '2vw', borderBottomWidth: '2vw'} : {borderLeftWidth: '1vh', borderRightWidth: '1vh', borderBottomWidth: '1vh'}
              }else {
                return props.orientation === 'portrait' ? {borderLeftWidth: '2vw', borderRightWidth: '2vw', borderTopWidth: '2vw'} : {borderLeftWidth: '1vh', borderRightWidth: '1vh', borderTopWidth: '1vh'}
              }
            })()}
          >
            {/* css三角形 */}
          </div>
        </div>
      </div>

      <div
        className="duration-500"
        style={{height: props.isClose ? 0 : `${props.contentHeight}px`}}
      >
        {props.children}
      </div>

    </div>
  )
}

export default Drawer