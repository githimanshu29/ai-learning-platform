import { SidebarTrigger } from '@/components/ui/sidebar'
import { UserButton } from '@clerk/nextjs'
import React from 'react'

const AppHeader2 = ({hideSidebar=false}) => {
  return (
    <div className= 'py-4 px-6 flex justify-between  items-center shadow-sm bg-black '>
      {!hideSidebar &&  <SidebarTrigger />}
        <UserButton/>
      
    </div>
  )
}

export default AppHeader2
