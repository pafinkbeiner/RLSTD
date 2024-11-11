import { Link } from "react-router-dom"

const Item = ({ title, link }: { title: string, link: string }) => {
  return (
    <Link to={`${link}`} className="flex items-center justify-center flex-1 h-full transition transform hover:bg-input cursor-pointer">
      <h1 className="text-2xl font-extrabold">
        {title}
      </h1>
    </Link>
  )
}

const NavigationPanel = ({ className }: { className?: string }) => {
  return (
    <>
      <div style={{borderTop: "1px solid white"}}></div>
      <div className={className ? className + " " + "w-full flex justify-around h-20 flex-wrap" : "w-full flex justify-around h-20 flex-wrap"}>
        <Item link="/" title="Dashboard" />
        <Item link="/Training/" title="Training" />
        <Item link="/History/"  title="History" />
        <Item link="/Settings/" title="Settings" />
      </div>
    </>
  )
}

export default NavigationPanel