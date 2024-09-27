import { ThemeProvider } from "./components/theme-provider"

const BaseLayout = ({children}: any) => {
  return (
    <ThemeProvider>
      <div className="bg-background text-primary h-lvh">
        {children}
      </div>
    </ThemeProvider>
  )
}

export default BaseLayout