
import { ReactNode, useState } from "react"
import { useNavigate } from "react-router-dom";
import { MapIcon, BookIcon, MessageIcon, SettingsIcon } from "../../../_components/svg_components";
import { LocalStoragekey } from "../../../_constants/enums";
import { DashboardData, LocationData, JobData } from "../../../interface/response/dashboard_data";
import { LocalStorageService } from "../../../service/local_storage";
import { Navbar, NavbarContent, NavbarMenuToggle, NavbarBrand, NavbarItem, Button, Input, NavbarMenu } from "@nextui-org/react";

import appLogo from '../../../assets/COUNTED Logo 1.svg';


interface DashboardLayoutProps {
    children: ReactNode,
}

export const DahsboardLayout =  (props: DashboardLayoutProps)=>{
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const [isAddLocationOpen, setIsAddLocationOpen] = useState(false);
    const [isViewLocationOpen, setIsViewLocationOpen] = useState(false);
    const [isViewJobList, setIsViewJobList] = useState(false);
    const [viewEmployee, setViewEmployee] = useState(false);
    

    const [dashboardData, setDashboardData] = useState<DashboardData>({});
    const [locationDataList, setLocationDataList] = useState<LocationData[]>([]);
    const [locationData, setLocationData] = useState<LocationData>({});
    const [jobDataList, setJobDataList] = useState<JobData[]>([]);
    
    const [jobData, setJobData] = useState<JobData>({});

    function handleMaterialPress(id: any) {
        LocalStorageService.setItem(LocalStoragekey.ADDRESS_ID, id);
        navigate('/dashboard/materials');
    }

    function handleMessagePress() {
        navigate('/dashboard/chat');
    }

    const menu = [
        {
            icon: <MapIcon width="20" height="20"/>,
            text: 'Vorhaben hinzufügen',
            onclick: ()=>{
                setIsMenuOpen(false);
                setIsAddLocationOpen(true);
            }
        },
        {
            icon: <BookIcon width="20" height="20"/>,
            text: 'Berufsbezeichnung',
            onclick: ()=>{
                setIsMenuOpen(false);
                setIsViewJobList(true);
            }
        },
        {
            icon: <MessageIcon width="20" height="20"/>,
            text: 'Nachrichten',
            onclick: ()=>{handleMessagePress()}
        },
        {
            icon: <SettingsIcon width="20" height="20"/>,
            text: 'Einstellungen',
            onclick: ()=>{}
        },
    ]

    return (<>
        <div className="sidebar sm:flex gap-4">

           <div className="left">
            <div className="left sm:visible invisible sm:fixed sm:h-full w-[18em] sm:p-3 sm:border-r-1 sm:border-gray-300">
                    <img src={appLogo} alt="" className="w-[10em] sm:max-w-full max-w-[4em]" />
                    <div className="navs pt-5">
                        {
                            menu.map((e) =>{
                                return <Button 
                                    size="lg"
                                    onClick={e.onclick} 
                                    className="w-full flex gap-6 rounded-sm justify-start bg-transparent my-5 p-0">
                                        <Button 
                                            isIconOnly 
                                            size="md"
                                            onClick={e.onclick} 
                                            className="bg-[#4269E1] rounded-md">
                                            {e.icon}
                                        </Button>
                                    <p className="text-white text-lg">
                                        {e.text}
                                    </p>
                                </Button>;
                            })
                        }
                    </div>
                    
                    
                </div>
                <Navbar onMenuOpenChange={setIsMenuOpen} className="w-full bg-transparent md:h-[7em] sm:gap-4 sm:hidden">
                    <NavbarContent>
                        <NavbarMenuToggle
                            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                            className="sm:hidden"
                            />
                        <NavbarBrand>
                            <img src={appLogo} alt="" className="md:w-[16em] md:max-w-full max-w-[5em]" />
                        </NavbarBrand>
                    </NavbarContent>

                    
                    <NavbarMenu className="bg-[#212529]">
                        <NavbarItem className="flex gap-6 flex-wrap items-start justify-start">
                            <div className="navs pt-5">
                                {
                                    menu.map((e) =>{
                                        return <Button 
                                            size="lg"
                                            onClick={e.onclick} 
                                            className="w-full flex gap-6 rounded-sm justify-start bg-transparent my-5 p-0">
                                                <Button 
                                                    isIconOnly 
                                                    size="md"
                                                    onClick={e.onclick} 
                                                    className="bg-[#4269E1] rounded-md">
                                                    {e.icon}
                                                </Button>
                                            <p className="text-white text-lg">
                                                {e.text}
                                            </p>
                                        </Button>;
                                    })
                                }
                            </div>
                        </NavbarItem>
                    </NavbarMenu>
                </Navbar>
           </div>

            {props.children}
        </div>
    </>);
}