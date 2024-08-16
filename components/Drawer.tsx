export const Drawer: React.FC<{
  children: JSX.Element | string
  isClose?: boolean
  contentHeight?: number
  toggleHandler?: () => void
}> = props => {

  return (
    <div className="absolute bottom-0 z-[9999]">
      <div
        className="relative duration-500"
        style={{height: props.isClose ? 0 : `${props.contentHeight}px`}}
        onClick={props.toggleHandler}
      >
        {props.children}
        <div className="absolute top-0 right-0 -translate-y-full bg-[#f9f9f9] w-[10vw] h-[8vw] flex justify-center items-center rounded-tl-md">
          <div className="w-0 h-0 border-l-[2vw] border-solid border-r-[2vw] border-t-[2vw] border-t-[#7c7c7c] border-l-transparent border-r-transparent">{/* css倒三角 */}</div>
        </div>
      </div>
    </div>
  )
}

export default Drawer