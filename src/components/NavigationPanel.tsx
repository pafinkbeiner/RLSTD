const Item = ({title}: {title: string}) => {
  return (
    <div className="flex items-center justify-center w-full h-full transition transform hover:bg-muted cursor-pointer">
      <h1 className="text-4xl font-extrabold">
        {title}
      </h1>
    </div>
  )
}

const NavigationPanel = ({className}: {className?: string}) => {
  return (
    <div className={className ? className + " " + "w-full flex justify-around h-32" : "w-full flex justify-around h-32"}>
      <Item title="Dashboard" />
      <Item title="Training" />
      <Item title="Settings" />
    </div>
  )
}

export default NavigationPanel