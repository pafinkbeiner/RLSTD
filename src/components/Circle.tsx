interface IProps {
  color?: string;
}

const Circle = ({color}: IProps) => {

  const style = {
    backgroundColor: color ?? "red",
  }

  return (
    <div className="h-3 w-3 bg-red-500 rounded-full" style={style}></div>
  )
}

export default Circle