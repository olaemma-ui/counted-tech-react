import React, { useState } from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button, Input, useDisclosure} from "@nextui-org/react";

import appLogo from '../../assets/COUNTED Logo 1.svg';

import "../style/dashboard.css";
import { BookIcon, MapIcon, MessageIcon, SettingsIcon } from "../../_components/svg_components";
import { DashboardAddressCard, DashboardCard } from "../../_components/components";
import { AddLocation } from "./dialogs/add_location";
import { ViewLocation } from "./dialogs/view_location";
import { JobList } from "./dialogs/job_list";
import { useNavigate } from "react-router-dom";
import { ViewEmployees } from "./dialogs/view_user";

export const Dashboard = ()=> {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const [isAddLocationOpen, setIsAddLocationOpen] = useState(false);
    const [isViewLocationOpen, setIsViewLocationOpen] = useState(false);
    const [isViewJobList, setIsViewJobList] = useState(false);
    const [viewEmployee, setViewEmployee] = useState(false);

    function handleMaterialPress() {
        navigate('/dashboard/materials');
    }

    function handleMessagePress() {
        console.log('called');
        
        navigate('/dashboard/chat');
    }

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
            onclick: ()=>{}
        },
        {
            icon: <MessageIcon width="20" height="20"/>,
            onclick: ()=>{handleMessagePress()}
        },
        {
            icon: <SettingsIcon width="20" height="20"/>,
            onclick: ()=>{}
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
                            <img src={appLogo} alt="" className="md:w-[16em] md:max-w-full max-w-[5em]" />
                        </NavbarBrand>
                    </NavbarContent>

                    <NavbarContent className="hidden sm:flex gap-4" justify="start">
                        
                        <NavbarItem>
                            <Button isIconOnly onClick={()=>{setIsAddLocationOpen(true)}} className="bg-[#4269E1] rounded-md">
                                <MapIcon width="20" height="20"/>
                            </Button>
                        </NavbarItem>
                        
                        <NavbarItem>
                            <Button isIconOnly className="bg-[#4269E1] rounded-md">
                                <BookIcon width="20" height="20"/>
                            </Button>
                        </NavbarItem>

                        <NavbarItem>
                            <Button isIconOnly onPress={handleMessagePress} className="bg-[#4269E1] rounded-md">
                                <MessageIcon width="20" height="20"/>
                            </Button>
                        </NavbarItem>

                        <NavbarItem>
                            <Button isIconOnly className="bg-[#4269E1] rounded-md">
                                <SettingsIcon width="20" height="20"/>
                            </Button>
                        </NavbarItem>


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
                        {
                            menu.map((e) =>{
                                    return <Button isIconOnly onClick={e.onclick} className="bg-[#4269E1] h-[4em] w-[4em] rounded-md">
                                        {e.icon}
                                    </Button>
                            })
                        }
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
                <div className="flex flex-wrap gap-8 p-4 items-center justify-center">
                   <DashboardCard title={'Alle'} value={'4'} color="bg-[#4269E1]" />
                   <DashboardCard title={'Aktiv'} value={'4'} color="bg-[#0EAD69]" />
                   <DashboardCard title={'Inaktiv'} value={'4'} color="bg-[#AD0E0E]" />
                   <DashboardCard 
                    title={'Absendheit'} 
                    multiValue={['4', '8' ]} 
                    multiColor={["bg-[#4269E1]", "bg-[#4269E1]" ]} />
                </div>
            </div>
            <div className="flex md:flex-row flex-col gap-8 p-4 max-w-[71.5em] mx-auto">
                <DashboardAddressCard 
                    onMaterialsClick={handleMaterialPress} 
                    onEyeClick={()=>{setViewEmployee(true)}}
                    onPress={()=>{setIsViewLocationOpen(true)}} />
            </div>
        </div>

        <ViewEmployees isOpen={viewEmployee} onClose={()=>{setViewEmployee(false)}}/>
        <AddLocation isOpen={isAddLocationOpen}  onClose={()=>{setIsAddLocationOpen(false)}} />
        <ViewLocation isOpen={isViewLocationOpen}  onClose={()=>{setIsViewLocationOpen(false)}} />
        <JobList isOpen={isViewJobList}  onClose={()=>{setIsViewJobList(false)}} />
    </>);
}


