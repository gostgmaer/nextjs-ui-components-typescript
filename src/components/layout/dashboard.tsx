'use client'

// import { useNotifications } from '@/hooks/useAppContext'
// import { ThemeToggle } from '@/components/ThemeToggle'
// import { UserStatus } from '@/components/UserStatus'
// import { NotificationCenter } from '@/components/NotificationCenter'
import { Button } from '@/components/ui/button'
import { Search, Bell, Menu, Users } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Sidebar } from './sidebar'
import { ThemeSwitch } from '../elements/theme-switch'
import { UserStatus } from '../elements/userpopover'
// import { Sidebar } from '@/components/Sidebar'
interface DashboardProps {
  children: React.ReactNode;
}
export default function Dashboard({ children }: DashboardProps) {
//   const { addNotification } = useNotifications()

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <header className="border-b">
          <div className=" py-3 px-4">
            <div className="flex items-center justify-between gap-4">
              {/* Left section */}
              {/* <div className="flex items-center gap-6">
                <h1 className="text-xl font-semibold">Dashboard</h1>
              </div> */}

              {/* Center section - Search */}
              <div className="hidden md:flex flex-1 max-w-md mx-4">
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search..."
                    className="w-full pl-9"
                  />
                </div>
              </div>

              {/* Right section */}
              <div className="flex items-center gap-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      <Bell className="h-5 w-5" />
                      <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80">
                    <div className="flex items-center justify-between px-4 py-2 border-b">
                      <span className="font-semibold">Notifications</span>
                      <Button variant="ghost" size="sm">Mark all as read</Button>
                    </div>
                    <div className="py-2">
                      <DropdownMenuItem>
                        <div className="flex flex-col gap-1">
                          <span className="font-medium">New team member added</span>
                          <span className="text-sm text-muted-foreground">2 hours ago</span>
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <div className="flex flex-col gap-1">
                          <span className="font-medium">Project update available</span>
                          <span className="text-sm text-muted-foreground">5 hours ago</span>
                        </div>
                      </DropdownMenuItem>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <Separator orientation="vertical" className="h-6" />
                <ThemeSwitch />
                <UserStatus />
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">
         {children}
        </main>
      </div>
      
      {/* <NotificationCenter /> */}
    </div>
  )
}