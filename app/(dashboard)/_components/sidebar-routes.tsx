"use client"

import { BarChart, BookAudio, BookImage, BookType, Compass, Layout, List } from "lucide-react"
import { SidebarItem } from "./sidebar-item";
import { usePathname } from "next/navigation";

const guestRoutes = [
    {
        icon: Layout,
        label: "Dashboard",
        href: "/",
    },

    {
        icon: Compass,
        label: "Browse",
        href: "/search",
    },

    {
        icon: BookType,
        label: "Study Notes",
        href: "/notes",
    },

    {
        icon: BookAudio,
        label: "Audio Lectures",
        href: "/audio",
    },
    {
        icon: BookImage,
        label: "Video Lectures",
        href: "/video",
    }
];

const teacherRoutes = [
    {
        icon: List,
        label: "Courses",
        href: "/teacher/courses",
    },
    {
        icon: BarChart,
        label: "Analytics",
        href: "/teacher/analytics",
    }
];

export const SidebarRoutes = () =>{
    const pathname = usePathname();

    const isTeacherPage = pathname?.includes("/teacher");
    
    const routes = isTeacherPage ? teacherRoutes : guestRoutes;


    return(
        <div className="flex flex-col w-full">
            {routes.map((route)=>(
                <SidebarItem 
                    key={route.href}
                    icon={route.icon}
                    label={route.label}
                    href={route.href}  
                />
            ))}
        </div>
    )
}