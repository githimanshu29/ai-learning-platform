"use client";

import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  Book,
  Compass,
  LayoutDashboard,
  PencilRulerIcon,
  UserCheck2Icon,
  WalletCards,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import AddNewCourseDialog from "./AddNewCourseDialog";

const SideBarOptions = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/workspace",
  },

  {
    title: "My-Learning",
    icon: Book,
    path: "/workspace/my-courses",
  },
  {
    title: "Explore-Courses",
    icon: Compass,
    path: "/workspace/explore",
  },
  {
    title: "AI-Tools",
    icon: PencilRulerIcon,
    path: "/workspace/ai-tools",
  },
  {
    title: "Billing",
    icon: WalletCards,
    path: "/workspace/billing",
  },
  {
    title: "Profile",
    icon: UserCheck2Icon,
    path: "/workspace/profile",
  },
];

const AppSidebar = () => {
  const path = usePathname();
  return (
    <Sidebar>
      <SidebarHeader className={"p-4"}>
        <img src="logo.svg" alt="logo" width={110} height={95} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <AddNewCourseDialog >
          <Button className="bg-blue-500 text-white hover:bg-blue-600 px-6 py-3 rounded-lg shadow-md">
            Create New Course
          </Button>
          </AddNewCourseDialog>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {SideBarOptions.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild className={"p-5"}>
                    {/* The asChild prop is a special and very useful feature. It tells the SidebarMenuButton "Don't render your own <button> tag. Instead, merge your properties and styles into your direct child element." In this case, the child is the <Link> component. So, your link will look and behave like the button. */}
                    <Link
                      href={item.path}
                      className={`text-[17px] flex items-center gap-x-3 p-2 rounded-md ${
                        // Added flex for better alignment
                        path === item.path &&
                        "text-primary bg-purple-50 font-semibold" // Use exact match '==='
                      }`}
                    >
                      <item.icon className="h-7 w-7" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter />
    </Sidebar>
  );
};

export default AppSidebar;
