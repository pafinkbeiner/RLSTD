import { Separator } from "@radix-ui/react-separator"
import { AppSidebar } from "./components/app-sidebar"
import NavigationPanel from "./components/NavigationPanel"
import { ThemeProvider } from "./components/theme-provider"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "./components/ui/sidebar"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "./components/ui/breadcrumb"

const BaseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <div className="bg-background text-primary min-h-lvh flex flex-col overflow-auto">
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                {/* <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href="#">
                        Building Your Application
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb> */}
              </div>
            </header>
            <div className="flex flex-col items-center gap-3 w-full p-5">
              {children}
            </div>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </ThemeProvider>
  )
}

export default BaseLayout

{/* <SidebarProvider>
<AppSidebar />
<main className="w-full">
  <SidebarTrigger />

</main>
</SidebarProvider> */}