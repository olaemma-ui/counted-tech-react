
import { ReactNode, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { MapIcon, BookIcon, MessageIcon, SettingsIcon } from "../../../_components/svg_components";
import { DashboardData, LocationData, JobData } from "../../../interface/response/dashboard_data";
import { Navbar, NavbarContent, NavbarMenuToggle, NavbarBrand, NavbarItem, Button, Input, NavbarMenu } from "@nextui-org/react";

import appLogo from '../../../assets/COUNTED Logo 1.svg';
import { AddLocation } from "../../dialogs/add_location";
import { JobList } from "../../dialogs/job_list";


interface DashboardLayoutProps {
    children: ReactNode,
}

export const DahsboardLayout =  (props: DashboardLayoutProps)=>{
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAddLocationOpen, setIsAddLocationOpen] = useState(false);
    const [isViewJobList, setIsViewJobList] = useState(false);
    
    
    const menu = [
        {
            icon: <MapIcon width="20" height="20"/>,
            onclick: ()=>{
                setIsMenuOpen(false);
                setIsAddLocationOpen(true);
            }
        },
        {
            icon: <BookIcon width="20" height="20"/>,
            onclick: ()=>{
                setIsMenuOpen(false);
                setIsViewJobList(true);
            }
        },
        {
            icon: <MessageIcon width="20" height="20"/>,
            onclick: ()=>{
                setIsMenuOpen(false);
                navigate('/dashboard/chat');
            }
        },
        {
            icon: <SettingsIcon width="20" height="20"/>,
            onclick: ()=>{
                setIsMenuOpen(false);
                navigate('/dashboard/settings');
            }
        },
    ]

    return (<>
        <div className="w-full h-[100vh]">
    
            <Navbar onMenuOpenChange={setIsMenuOpen} className="w-full bg-transparent md:h-[7em] sm:gap-4">
                <NavbarContent>
                    <NavbarMenuToggle
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        className="sm:hidden"
                        />
                    <NavbarBrand>
                        <Link to='/dashboard'> 
                            <img src={appLogo} alt="" className="md:w-[16em] md:max-w-full max-w-[5em]" />
                        </Link>
                    </NavbarBrand>
                </NavbarContent>

                <NavbarContent className="hidden sm:flex gap-4" justify="start">

                    {menu.map((e) =>{
                        return  <NavbarItem>
                            <Button isIconOnly onClick={e.onclick} className="bg-[#4269E1] rounded-md">
                                {e.icon}
                            </Button>
                        </NavbarItem>
                    })}
                    <NavbarItem>
                        <Input
                            isReadOnly
                            value="Mitarbeiter / Bauvorhaben suchen"
                            size="md"
                            className="text-black"
                        />
                    </NavbarItem>
                    
                </NavbarContent>
                
                <NavbarMenu>
                    <NavbarItem className="flex gap-6 flex-wrap items-start justify-start">
                    {menu.map((e) =>{
                            return <Button key={(100 + Math.random() + 999)} 
                            isIconOnly 
                            onClick={e.onclick} 
                            className="bg-[#4269E1] h-[4em] w-[4em] rounded-md">
                                {e.icon}
                            </Button>
                    })}
                    </NavbarItem>

                    <NavbarItem className="mt-5">
                        <Input
                            isReadOnly
                            value="Mitarbeiter / Bauvorhaben suchen"
                            size="lg"
                            className="text-black"
                        />
                    </NavbarItem>
                </NavbarMenu>
            </Navbar>
            <div className="my-8 max-w-[80em] mx-auto">
                {props.children}
            </div>
        </div>

        {isAddLocationOpen && <AddLocation 
            isOpen={isAddLocationOpen} 
            onClose={()=>{setIsAddLocationOpen(false)}} />}
        {isViewJobList && <JobList 
            isOpen={isViewJobList}  
            onClose={()=>{setIsViewJobList(false)}} />}
    </>);
}