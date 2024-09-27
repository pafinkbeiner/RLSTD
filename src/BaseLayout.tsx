import NavigationPanel from "./components/NavigationPanel"
import { ThemeProvider } from "./components/theme-provider"

const BaseLayout = ({children}: any) => {
  return (
    <ThemeProvider>
      <div className="bg-background text-primary min-h-lvh flex flex-col overflow-auto">
        <div className='flex flex-col items-center justify-start h-full p-8 gap-5 flex-1'>
          {children}
        </div>
        <NavigationPanel className='justify-self-end' />
      </div>
    </ThemeProvider>
  )
}

export default BaseLayout