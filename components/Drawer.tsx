export const Drawer: React.FC<{
  children: JSX.Element | string
  isClose?: boolean
  contentHeight?: number
  toggleHandler?: () => void
}> = props => {

  return (
    <div className="absolute bottom-0 z-[9999] overflow-hidden">

      <div className="flex justify-end">
        <div className="bg-[#f9f9f9] w-[10vw] h-[8vw] flex justify-center items-center rounded-tl-md" onClick={props.toggleHandler}>
          <div
            className={`w-0 h-0 border-solid border-l-[2vw] border-r-[2vw] border-l-transparent border-r-transparent ${props.isClose ?
              'border-b-[2vw] border-b-[#7c7c7c]' :
              'border-t-[2vw] border-t-[#7c7c7c]'
            }`}
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