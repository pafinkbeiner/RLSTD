import { AppSidebar } from "./components/app-sidebar"
import NavigationPanel from "./components/NavigationPanel"
import { ThemeProvider } from "./components/theme-provider"
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar"

const BaseLayout = ({ children }:  { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <div className="bg-background text-primary min-h-lvh flex flex-col overflow-auto">
        <SidebarProvider>
          <AppSidebar />
          <main className="w-full">
            <SidebarTrigger />
            <div className="flex flex-col items-center gap-3 w-full p-5">
              {children}
            </div>
          </main>
        </SidebarProvider>
      </div>
    </ThemeProvider>
  )
}

export default BaseLayout