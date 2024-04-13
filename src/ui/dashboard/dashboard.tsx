    import { useEffect, useState } from "react";


import "../style/dashboard.css";
import { DashboardAddressCard, DashboardCard } from "../../_components/components";
import { ViewLocation } from "../dialogs/view_location";
import { useNavigate } from "react-router-dom";
import { ViewEmployees } from "../dialogs/view_user";
import { axiosInstance } from "../../service/axios_conf";
import { DashboardData, DashboardDataConvert, JobData, LocationData, LocationDataConvert } from "../../interface/response/dashboard_data";
import { LocalStorageService } from "../../service/local_storage";
import { LocalStoragekey } from "../../_constants/enums";
import { DahsboardLayout } from "./layout/dashboard_layout";
import { TodoListPage } from "../todo_list/todo_list";

export const Dashboard = ()=> {
    const navigate = useNavigate();
    
    const [addressId, setAddressId] = useState<number>();
    const [isViewLocationOpen, setIsViewLocationOpen] = useState(false);
    const [viewEmployee, setViewEmployee] = useState(false);
    const [viewTodo, setViewTodo] = useState({
        isOpen: false,
        addressId: ''
    });
    

    const [dashboardData, setDashboardData] = useState<DashboardData>({});
    const [locationDataList, setLocationDataList] = useState<LocationData[]>([]);
    const [locationData, setLocationData] = useState<LocationData>({});
    
    const [jobData, setJobData] = useState<JobData>({});

    function handleMaterialPress(id: any) {
        LocalStorageService.setItem(LocalStoragekey.ADDRESS_ID, id);
        navigate('/dashboard/materials');
    }

    function handleTodoPress(id: any) {
        setViewTodo({
            isOpen: true,
            addressId: id,
        });
        // LocalStorageService.setItem(LocalStoragekey.ADDRESS_ID, id);
        // navigate('/dashboard/todo');
    }

    
    async function fetchDashboardData () {
        await axiosInstance.get('company/dashboard-data')
        .then((response) => {
            const data = DashboardDataConvert.toDashboardData(JSON.stringify(response.data.data));
            setDashboardData(data)
        }).catch((e) => e)
    }

    async function fetchLocationData () {
        await axiosInstance.get('company/location')
        .then((response) => {
            console.log({response});
            
            const data = response.data.data;
            const list : LocationData[] = [];

            console.log({data});
            

            data.forEach((element : any) => {
                list.push(LocationDataConvert.toLocationData(JSON.stringify(element)))
            });
            setLocationDataList(list);
        })
    }
    
    useEffect(() => {
        fetchDashboardData();
        fetchLocationData();
    }, [])
    
9
    return (<>
        <DahsboardLayout>
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
                        onSyncClick={()=>{
                            handleTodoPress(location.id)
                        }}
                        onMaterialsClick={()=>{
                            handleMaterialPress(location.id)
                        }} 
                        onEyeClick={()=>{
                            setAddressId(location.id);
                            setViewEmployee(true);
                        }}
                        onPress={()=>{
                            // setJobData(jobDataList.filter((job) => job.id == location.job_title_id)[0]);
                            setLocationData(location);
                            setIsViewLocationOpen(true);
                        }} />
                    })
                }
            </div>

            {viewEmployee && <ViewEmployees addressId={addressId}  isOpen={viewEmployee} onClose={()=>{setViewEmployee(false)}}/>}
        

            <ViewLocation 
                locationData={locationData} 
                isOpen={isViewLocationOpen}  
                jobTitle={jobData.name ?? ''}
                onClose={()=>{setIsViewLocationOpen(false)}} />

            {viewTodo.isOpen && <TodoListPage 
                isOpen={viewTodo.isOpen}  
                addressId={viewTodo.addressId}
                onClose={()=>{setViewTodo({
                    isOpen: false,
                    addressId: ''
                })}} />}
        </DahsboardLayout>
    </>);
}


