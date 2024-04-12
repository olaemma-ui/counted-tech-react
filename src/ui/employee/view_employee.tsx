import { Avatar, Button, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Spinner, Checkbox, Switch } from "@nextui-org/react";
import { ArrowDownIcon, CheckIcon, DownloadIcon, EraserIcon, MapPinIcon, PencilIcon, SwapIcon, TrashIcon } from "../../_components/svg_components";
import {useAsyncList} from "@react-stately/data";


import '../style/dashboard.css'
import React, { useEffect, useState } from "react";
import { EditProfile } from "../dialogs/edit_profile";
import { Convert, DurationObject, EmployeeData } from "../../interface/response/dto";
import { axiosInstance } from "../../service/axios_conf";
import { LocalStorageService } from "../../service/local_storage";
import { LocalStoragekey } from "../../_constants/enums";
import { dateDiff } from "../../urils/utils";
import ConfirmDialog from "../dialogs/confirm_dialog";
import { useNavigate } from "react-router-dom";
import { DahsboardLayout } from "../dashboard/layout/dashboard_layout";


export const EmployeeDetails = ()=>{

    const navigate = useNavigate();

    
    const [isLoading, setIsLoading] = useState(true);
    const [isDownloading, setIsDownloading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [updatingMinimize, setUpdatingMinimize] = useState(false);
    const [updatingMap, setUpdatingMap] = useState(false);
    const [fetching, setFetching] = useState(false);
    const [listener, setListener] = useState<string>();
    
    const [viewEmployee, setViewEmployee] = useState(false);
    
    const [confirmDialog, setCofirmDialog] = useState({
        isOpen: false,
        isYes: false,
        isNo : false,
        employeeId: '',
    });


    

    const [date, setDate] = useState<string>();

    const [durationList, setDurationList] = useState<DurationObject[]>();

    const [employeeDetails, setEmployeeDetails] = useState<EmployeeData>();


    


    
    async function fetchEmployeeDetails () {
        setFetching(true);
        const employeeId = LocalStorageService.getItem(LocalStoragekey.CURRECNT_EMPLOYEE_ID);
        await axiosInstance.get(`company/employee-detail/${employeeId}`)
        .then((response) => {
            let data = response.data.data;
            data = Convert.toEmployeeData(JSON.stringify(data));
            setEmployeeDetails(data);
        }).catch((e) => e)
        setFetching(false);
    }

    async function deleteEmployee () {
        setIsDeleting(true);
        const employeeId = LocalStorageService.getItem(LocalStoragekey.CURRECNT_EMPLOYEE_ID);
        await axiosInstance.get(`company/delete-employee/${employeeId}`)
        .then((response) => {
            navigate('/dashboard');
        }).catch((e) => e)
        setIsDeleting(false);
    }
    
    const downloadPdf = (url : string) => {
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${employeeDetails?.name}-${date}-work-duration.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };

    async function fetchWorkDuration () {
        setIsLoading(true);
        console.log({date});
        
        const employeeId = LocalStorageService.getItem(LocalStoragekey.CURRECNT_EMPLOYEE_ID);
        await axiosInstance.get(`company/work-duration?start_time=${date}&user_id=${employeeId}`)
        .then((response) => {
            let list : DurationObject[] = [];
            let data = response.data;
            
            for (let key in data) {
                list.push(Convert.toDurationObject(JSON.stringify(data[key])));
            }

            setDurationList(list);
        }).catch((e) => e)
        setIsLoading(false);
    }

    async function downloadWorkDuration () {
        setIsDownloading(true);
        console.log({date});
        
        const employeeId = LocalStorageService.getItem(LocalStoragekey.CURRECNT_EMPLOYEE_ID);
        await axiosInstance.get(`company/all-work-duration?start_time=${date}&user_id=${employeeId}`)
        .then((response) => {
            console.log({response});
            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            downloadPdf(url);
        }).catch((e) => e)
        setIsDownloading(false);
    }

    useEffect(() => {
        fetchWorkDuration()
        fetchEmployeeDetails()
    }, [listener])
    

    async function handleAllowGps() {
        setUpdatingMap(true);

        await axiosInstance.get(`company/employee-gps/${employeeDetails?.employee?.id}`)
        .then((response) => {
            setListener(`gps-lissten ${999 + Math.random() * 1111}`);
        }).catch((e) => e)
        setUpdatingMap(false);
    }

    async function handleAllowMinimize() {
        setUpdatingMinimize(true);
        await axiosInstance.get(`company/employee-minimize/${employeeDetails?.employee?.id}`)
        .then((response) => {
            setListener(`minimize-lissten ${999 + Math.random() * 1111}`);
        }).catch((e) => e)
        setUpdatingMinimize(false);
    }

    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return (<>
        <DahsboardLayout>
            <div className="py-5  h-[100dvh] flex items-center justify-center">
                <div className="sm:flex gap-8 sm:my-0 my-5 sm:p-8 p-4 m-4 w-full sm:h-[80vh] h-full overflow-auto">
                        <div className="content min-w-[20em] overflow-y-auto h-full rounded-xl bg-white p-4">
                            <div className="left flex gap-2 w-full">               
                                {/* <Button
                                    isIconOnly
                                    className="rounded-md bg-[#273B4A]">
                                    <SwapIcon/>
                                </Button> */}

                                <Button
                                    isIconOnly
                                    onPress={()=>{
                                        setCofirmDialog({
                                        isNo: false,
                                        isYes: false,
                                        isOpen: true,
                                        employeeId: `${employeeDetails?.employee?.id}`,
                                        });
                                    }}
                                    className="rounded-md bg-[#AD0E0E]">
                                    <TrashIcon/>
                                </Button>
                            
                            <div className="w-full flex justify-end">
                                    <Button
                                        isIconOnly
                                        onPress={()=>{setViewEmployee(true)}}
                                        className="rounded-md bg-[#4269E1]">
                                        <PencilIcon/>
                                    </Button>
                                </div>
                            </div>
                            
                            <div className="left flex gap-2 my-5">
                                <Avatar 
                                    isBordered 
                                    radius="sm" 
                                    // name={employeeDetails?.name}
                                    className="w-[7em] h-[6em]"
                                    src={employeeDetails?.image && `${import.meta.env.VITE_COUNTEDT_TECH_COMPANY_IMAGE_URL}${employeeDetails.image}`} />

                                <div className="flex flex-col w-full justify-end items-end gap-4 ">    
                                    <Switch onChange={()=>{handleAllowMinimize()}} isSelected={employeeDetails?.employee?.allow_minimize == 1}>
                                        <div className="flex">
                                            <EraserIcon/> {updatingMinimize && <Spinner size="sm"/>}
                                        </div>
                                    </Switch>
                                    <Switch onChange={()=>{handleAllowGps()}} isSelected={employeeDetails?.employee?.allow_gps == 1}>
                                        <div className="flex">
                                            <MapPinIcon/> {updatingMap && <Spinner size="sm"/>}
                                        </div>
                                    </Switch>
                                </div>
                            </div>

                            {fetching && <>
                                <Spinner size="sm"/>
                                <p className="text-black inline"> Fetching Employee Details....</p>
                            </>}

                            <p className="text-sm text-black text-left">Vorname</p>
                            <p className="text-xl font-semibold text-black text-left mb-5">{employeeDetails?.name ?? ''}</p>

                            

                            <p className="text-sm text-black text-left">Nachname</p>
                            <p className="text-xl font-semibold text-black text-left mb-5">{employeeDetails?.surname ?? ''}</p>


                            <p className="text-sm text-black text-left">Telefonnummer</p>
                            <p className="text-xl font-semibold text-black text-left mb-5">{employeeDetails?.phone ?? ''}</p>


                            <p className="text-sm text-black text-left">Personalnummer</p>
                            <p className="text-xl font-semibold text-black text-left mb-5">{employeeDetails?.employee?.personal_number ?? ''}</p>


                            <p className="text-sm text-black text-left">Führerschein</p>
                            <p className="text-xl font-semibold text-black text-left mb-5">{(employeeDetails?.employee?.license ?? '') == '1' ? 'Yes' : 'No'}</p>


                            <p className="text-sm text-black text-left">Arbeitsort</p>
                            <p className="text-xl font-semibold text-black text-left mb-5">
                                {employeeDetails?.employee?.address?.address ?? ''}
                            </p>


                            {/* <p className="text-sm text-black text-left">Urlaub</p>
                            <p className="text-xl font-semibold text-black text-left mb-5">
                                Gesamt: 30
                                Übrig: 0
                            </p> */}


                        </div>

                        <div className="content w-full sm:m-0 my-5 p-4 rounded-xl bg-white">
                            <div className="left flex justify-between flex-row gap-2">
                                {/* <div className="w-full flex text-black">
                                    <div className="left flex flex-col gap-4 items-start justify-start">
                                        <h2 className="text-2xl">00:00:00 </h2>
                                        <h2 className="text-lg"> {selectedYearValue} </h2>
                                    </div>

                                    <div className="ml-5">
                                        <p className="text-[#84AD0E] text-left">
                                            S.U = Sonderurlaub
                                        </p>
                                        <p className="text-[#4AAD0E] text-left">
                                            F = Feiertag
                                        </p>
                                        <p className="text-[#AD8A0E] text-left">
                                            U = Urlaub
                                        </p>
                                        <p className="text-[#AA0EAD] text-left">
                                            K = Krank
                                        </p>
                                    </div>
                                </div> */}

                                {/* <Dropdown showArrow>
                                    <DropdownTrigger>

                                        <div className={`p-4 flex items-center gap-2 justify-between rounded-lg h-[3em] ${selectedYearValue? 'text-black': 'text-gray-500 text-sm font-normal'} w-fit text-left bg-[#EBE6E6]`}>
                                            {selectedMonthValue ? selectedMonthValue : 'Material'}
                                            <ArrowDownIcon width="20" height="20" className="self-end justify-self-end" />
                                        </div>
                                    </DropdownTrigger>
                                    <DropdownMenu 
                                        aria-label="Single selection example"
                                        variant="flat"
                                        disallowEmptySelection
                                        selectionMode="single"
                                        selectedKeys={selectedMonth}
                                        //@ts-ignore
                                        onSelectionChange={setSelectedMonth}
                                    >
                                        <DropdownItem key="text" className="text-black">Text</DropdownItem>
                                        <DropdownItem key="number" className="text-black">Number</DropdownItem>
                                        <DropdownItem key="date" className="text-black">Date</DropdownItem>
                                        <DropdownItem key="single_date" className="text-black">Single Date</DropdownItem>
                                        <DropdownItem key="iteration" className="text-black">Iteration</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>               
                                            

                                <Dropdown showArrow>
                                    <DropdownTrigger>

                                        <div className={`p-4 flex items-center gap-2 justify-between rounded-lg h-[3em] ${selectedYearValue? 'text-black': 'text-gray-500 text-sm font-normal'} w-fit text-left bg-[#EBE6E6]`}>
                                            {selectedYearValue ? selectedYearValue : 'Year'}
                                            <ArrowDownIcon width="20" height="20" className="self-end justify-self-end text-[#EBE6E6]" />
                                        </div>
                                    </DropdownTrigger>
                                    <DropdownMenu 
                                        aria-label="Single selection example"
                                        variant="flat"
                                        disallowEmptySelection
                                        selectionMode="single"
                                        selectedKeys={selectedYear}
                                        //@ts-ignore
                                        onSelectionChange={setSelectedYear}
                                        >

                                        <DropdownItem key="text" className="text-black">Text</DropdownItem>
                                        <DropdownItem key="number" className="text-black">Number</DropdownItem>
                                        <DropdownItem key="date" className="text-black">Date</DropdownItem>
                                        <DropdownItem key="single_date" className="text-black">Single Date</DropdownItem>
                                        <DropdownItem key="iteration" className="text-black">Iteration</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown> */}
                                <Button
                                    isIconOnly
                                    isLoading={isDownloading}
                                    onPress={downloadWorkDuration}
                                    className="rounded-md bg-[#4269E1]">
                                    <DownloadIcon/>
                                </Button>

                                <div className="flex gap-4">
                                    <Input type="date" size="md" onChange={(e)=>{
                                        setDate(e.target.value);
                                    }} />
                                    <Button
                                        isIconOnly
                                        isLoading={isLoading}
                                        onPress={fetchWorkDuration}
                                        className="rounded-md bg-[#4269E1]">
                                        <CheckIcon/>
                                    </Button>
                                </div> 
                            </div>


                            <div className="h-[40em] overflow-y-auto px-2">
                                <Table
                                    aria-label="Example table with client side sorting"
                                    // sortDescriptor={list.sortDescriptor}
                                    // onSortChange={list.sort}
                                    classNames={{
                                        table: "min-h-[400px] text-black",
                                        td: "border-r"
                                    }}
                                    className="mt-5 shadow-lg my-5"
                                    >
                                    <TableHeader>
                                        <TableColumn key="vorname" allowsSorting> 
                                            Tag
                                        </TableColumn>
                                        <TableColumn key="Name" allowsSorting>
                                            Bauvorhaben
                                        </TableColumn>
                                        <TableColumn key="Material" allowsSorting>
                                            Start
                                        </TableColumn>
                                        <TableColumn key="Art.-Nr" allowsSorting>
                                            Ende
                                        </TableColumn>
                                        <TableColumn key="Anzahl" allowsSorting>
                                            Aktiv
                                        </TableColumn>
                                        <TableColumn key="Einheit" allowsSorting>
                                            Inaktiv
                                        </TableColumn>
                                        <TableColumn key="Datum" allowsSorting>
                                            Überst.
                                        </TableColumn>
                                    </TableHeader>
                                    <TableBody 
                                        items={durationList} 
                                        isLoading={isLoading}
                                        loadingContent={<Spinner label="Loading..." />}
                                    >
                                        {
                                            durationList?.map((duration)=> {
                                                const sk = (dateDiff({
                                                    date1: `${duration.start_time}`, 
                                                    date2: `${duration.end_time}`,
                                                })?.diffHrs * 60) - duration.total_duration;
                                            
                                                return <TableRow key={999 * Math.random() + 111}>
                                                    <TableCell>
                                                        {daysOfWeek[new Date(duration?.day).getDay()]}
                                                        &nbsp;
                                                        {new Date(duration?.day).getDate()}
                                                    </TableCell>
                                                    <TableCell>
                                                        {duration.address}
                                                    </TableCell>
                                                    <TableCell>
                                                        {new Date(duration.start_time).toLocaleTimeString()}
                                                    </TableCell>
                                                    <TableCell>
                                                        {new Date(duration.end_time).toLocaleTimeString()}
                                                    </TableCell>
                                                    <TableCell>
                                                        {duration.total_duration}
                                                    </TableCell>
                                                    <TableCell>
                                                        {isNaN(sk) ? '' : sk}
                                                    </TableCell>
                                                    <TableCell>
                                                        {duration.address}
                                                    </TableCell>
                                                </TableRow>
                                            })
                                        }
                                        {/* {(item : any) => {
                                            console.log({item});
                                            
                                            return (<TableRow key={item.name}>
                                            {(columnKey) => 
                                                <TableCell>
                                                    {getKeyValue(item, columnKey)}
                                                </TableCell>}
                                        </TableRow>
                                        )}} */}
                                    </TableBody>
                                </Table>
                            </div>
                            
                            {viewEmployee && <EditProfile
                                employeeData={employeeDetails}
                                isOpen={viewEmployee} 
                                onClose={()=>{setViewEmployee(false)}}/>}

                            { confirmDialog.isOpen && <ConfirmDialog
                                icon={<>
                                <div className="bg-red-500 p-4 rounded-full w-fit mt-3">
                                    <TrashIcon width="30" height="30" />
                                </div>
                                </>}

                                title="Delete Employee record ?"
                                message={'Note that all the employee records will be permanently deleted...'}
                                onNo={()=>{
                                    setCofirmDialog({
                                        isYes: false,
                                        isNo: true,
                                        isOpen: false,
                                        employeeId: '',
                                    })
                                }}
                                isLoading={isDeleting}
                                onYes={()=>{
                                    deleteEmployee();
                                }}
                            />}
                        </div>
                </div>
            </div>
        </DahsboardLayout>
    </>);
}