import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export function Hub({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <div className="flex w-screen">
          <SidebarTrigger />
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}