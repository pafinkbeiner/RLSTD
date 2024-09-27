import { Link } from "react-router-dom"

const Item = ({ title, link }: { title: string, link: string }) => {
  return (
    <Link to={`${link}`} className="flex items-center justify-center w-full h-full transition transform hover:bg-muted cursor-pointer">
      <h1 className="text-3xl font-extrabold">
        {title}
      </h1>
    </Link>
  )
}

const NavigationPanel = ({ className }: { className?: string }) => {
  return (
    <div className={className ? className + " " + "w-full flex justify-around h-32" : "w-full flex justify-around h-24"}>
      <Item link="/" title="Dashboard" />
      <Item link="/Training" title="Training" />
      <Item link="/Settings" title="Settings" />
    </div>
  )
}

export default NavigationPanel