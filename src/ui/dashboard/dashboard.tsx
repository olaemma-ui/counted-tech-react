    import React, { useEffect, useState } from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, Button, Input} from "@nextui-org/react";

import appLogo from '../../assets/COUNTED Logo 1.svg';

import "../style/dashboard.css";
import { BookIcon, MapIcon, MessageIcon, SettingsIcon } from "../../_components/svg_components";
import { DashboardAddressCard, DashboardCard } from "../../_components/components";
import { AddLocation } from "./dialogs/add_location";
import { ViewLocation } from "./dialogs/view_location";
import { JobList } from "./dialogs/job_list";
import { useNavigate } from "react-router-dom";
import { ViewEmployees } from "./dialogs/view_user";
import { axiosInstance } from "../../service/axios_conf";
import { DashboardData, DashboardDataConvert, JobData, JobDataConvert, LocationData, LocationDataConvert } from "../../interface/response/dashboard_data";
import { LocalStorageService } from "../../service/local_storage";
import { LocalStoragekey } from "../../_constants/enums";

export const Dashboard = ()=> {
    const navigate = useNavigate();
    
    const [addressId, setAddressId] = useState<number>();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

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
            onclick: ()=>{handleMessagePress()}
        },
        {
            icon: <SettingsIcon width="20" height="20"/>,
            onclick: ()=>{}
        },
    ]
    
    async function fetchDashboardData () {
        await axiosInstance.get('company/dashboard-data')
        .then((response) => {
            const data = DashboardDataConvert.toDashboardData(JSON.stringify(response.data.data));
            setDashboardData(data)
        }).catch((e) => e)
    }

    async function handleViewEmployee(address_id:string) {
        
    }
    
    async function fetchLocationData () {
        await axiosInstance.get('company/location')
        .then((response) => {
            const data = response.data.data;
            const list : LocationData[] = [];

            console.log({data});
            

            data.forEach((element : any) => {
                list.push(LocationDataConvert.toLocationData(JSON.stringify(element)))
            });
            setLocationDataList(list);
        })
    }
    
    async function fetJobList () {
        await axiosInstance.get('company/job-title-list')
        .then((response) => {
            const data = response.data.data;
            const list : JobData[] = [];

            data.forEach((element : any) => {
                list.push(JobDataConvert.toJobData(JSON.stringify(element)))
            });

            setJobDataList(list);
        }).catch((e) => e)
    }

    useEffect(() => {
        fetchDashboardData();
        fetchLocationData();

        // if(jobDataList?.length == 0) 
        fetJobList();  
        // async function loadData (){
        //     setInterval(() => {

        //     }, 15000);
                
        // }
            
        // loadData()
    }, [])
    

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

                        {
                            menu.map((e) =>{
                                return  <NavbarItem>
                                    <Button isIconOnly onClick={e.onclick} className="bg-[#4269E1] rounded-md">
                                        {e.icon}
                                    </Button>
                                </NavbarItem>
                            })
                        }
                        
                        


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
                                    return <Button key={(100 + Math.random() + 999)} 
                                    isIconOnly 
                                    onClick={e.onclick} 
                                    className="bg-[#4269E1] h-[4em] w-[4em] rounded-md">
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
                   <DashboardCard title={'Alle'} value={`${dashboardData.total ?? 0}`} color="bg-[#4269E1]" />
                   <DashboardCard title={'Aktiv'} value={`${dashboardData.active ?? 0}`} color="bg-[#0EAD69]" />
                   <DashboardCard title={'Inaktiv'} value={`${dashboardData.inactive ?? 0}`} color="bg-[#AD0E0E]" />
                   <DashboardCard 
                    title={'Absendheit'} 
                    multiValue={[
                        `K: ${dashboardData.total_absent ?? 0}`, 
                        `U: ${dashboardData.total_vacation ?? 0}`, 
                    ]} 
                    multiColor={["bg-[#CB42E1]", "bg-[#E19842]" ]} />
                </div>
            </div>
            <div className="sm:flex gap-4 p-4 max-w-[80em] justify-betwee flex-wrap mx-auto">
                {
                    locationDataList.map((location)=> {
                        return <DashboardAddressCard 
                        key={1000 + Math.random() + 9999}
                        locationData={location}
                        onMaterialsClick={()=>{
                            handleMaterialPress(location.id)
                        }} 
                        onEyeClick={()=>{
                            setAddressId(location.id);
                            console.log({addressId});
                            
                            setViewEmployee(true);
                        }}
                        onPress={()=>{
                            setJobData(jobDataList.filter((job) => job.id == location.job_title_id)[0]);
                            setLocationData(location);
                            setIsViewLocationOpen(true);
                        }} />
                    })
                }
            </div>
        </div>

        {viewEmployee && <ViewEmployees addressId={addressId}  isOpen={viewEmployee} onClose={()=>{setViewEmployee(false)}}/>}
        
        
        {isAddLocationOpen && <AddLocation 
            isOpen={isAddLocationOpen} 
            jobList={jobDataList}  
            onClose={()=>{setIsAddLocationOpen(false)}} />}

        <ViewLocation 
            locationData={locationData} 
            isOpen={isViewLocationOpen}  
            jobTitle={jobData.name ?? ''}
            onClose={()=>{setIsViewLocationOpen(false)}} />
        {isViewJobList && <JobList 
            jobList={jobDataList} 
            isOpen={isViewJobList}  
            onClose={()=>{setIsViewJobList(false)}} />}
    </>);
}


