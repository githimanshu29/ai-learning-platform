// app/workspace/_components/AppSidebar.jsx

"use client";
import Image from 'next/image';
import logo from "../../../public/logo.svg";
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
    useSidebar
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
    const { state } = useSidebar();
    const sidebarWidth = state === 'expanded' ? 'w-[16rem]' : 'w-[3rem]';

    return (
        <Sidebar className={`${sidebarWidth} h-screen !bg-transparent bg-slate-900/50 backdrop-blur-lg border-r border-slate-700/80 flex flex-col transition-all duration-300 ease-in-out`}>
            <SidebarHeader className={"p-4"}>
                <Link href={'/workspace'} className='cursor-pointer'>
                    <Image src={logo} alt="logo" width={170} height={155} />
                </Link>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <AddNewCourseDialog >
                        <Button className="w-full bg-slate-800/80 border border-slate-700 text-slate-300 hover:bg-slate-700/80 hover:border-teal-400 hover:text-white transition-all duration-200 px-6 py-6 rounded-lg shadow-md text-base font-semibold">
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
                                        <Link
                                            href={item.path}
                                            className={`text-[17px] flex items-center gap-x-3 p-3 rounded-md text-slate-400 hover:bg-slate-700/50 hover:text-white transition-colors duration-200 ${
                                                path === item.path &&
                                                "bg-slate-700/50 text-teal-300 font-semibold border-l-2 border-teal-400"
                                            }`}
                                        >
                                            <item.icon className="h-6 w-6" />
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