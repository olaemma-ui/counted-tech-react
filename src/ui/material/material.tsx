import { Button, Divider, Input, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Spinner } from "@nextui-org/react";
import { CheckIcon, TrashIcon } from "../../_components/svg_components";
import {useAsyncList} from "@react-stately/data";


import '../style/dashboard.css'
import {useState, useMemo, useEffect} from "react";
import { axiosInstance } from "../../service/axios_conf";
import { LocalStorageService } from "../../service/local_storage";
import { LocalStoragekey } from "../../_constants/enums";
import { toFormData } from "axios";
import { Material, MaterialConvert, MaterialRequest, MaterialRequestConvert } from "../../interface/request/materials";
import { toast, Bounce, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import ConfirmDialog from "../dashboard/dialogs/confirm_dialog";


export const MaterialsPage = ()=>{

    const [allMaterialListener, setAllMaterialListener] = useState<string>('');

    
    const [isLoading, setIsLoading] = useState<boolean>(true);
    
    const [isLoadingCreateMaterial, setIsLoadingCreateMaterial] = useState<boolean>(false);
    const [isLoadingAllMaterial, setIsLoadingAllMaterial] = useState<boolean>(false);
    const [isLoadingDeleteMaterial, setIsLoadingDeleteMaterial] = useState<boolean>(false);

    const [deleteMaterialDialogObject, setDeleteMaterialDialogObject] = useState({
        isOpen: false,
        isYes: false,
        isNo : false,
        materialId: 0
    });
    
    // const [deleteDialogMessage, setDeleteDialogMessage] = useState<string>('');
    // const [deleteMaterialDialogObject, setDeleteMaterialDialogObject] = useState<boolean>(false);
    
    // const [deleteDialogMessage, setDeleteDialogMessage] = useState<string>('');
    // const [deleteMaterialDialogObject, setDeleteMaterialDialogObject] = useState<boolean>(false);
    
    // const [deleteDialogMessage, setDeleteDialogMessage] = useState<string>('');
    // const [deleteMaterialDialogObject, setDeleteMaterialDialogObject] = useState<boolean>(false);
    
    const [materialName, setMaterialName] = useState<string>();
    const [materials, setMaterials] = useState<Material[]>();
    const [materialRequests, setMaterialRequest] = useState<MaterialRequest[]>();


    async function handleCreateMaterial (){
        setIsLoadingCreateMaterial(true);
        const addressId = LocalStorageService.getItem(LocalStoragekey.ADDRESS_ID);
        await axiosInstance.post(`company/material`, toFormData({
            address_id: addressId,
            name: materialName,
        }))
        .then((response) => {
            if (response.data.status) {
                setAllMaterialListener(`create-listen ${Math.random() * 1000}`);
                setMaterialName('');
                toast.success(response.data.message, {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                  transition: Bounce,
                });
              }
        }).catch((e) => e)
        setIsLoadingCreateMaterial(false);
    }


    async function handleDeleteMaterial (){
        setIsLoadingDeleteMaterial(true)
        await axiosInstance.delete(`company/material/${deleteMaterialDialogObject.materialId}`)
        .then((response) => {
            if (response.data.status) {
                setAllMaterialListener(`delete ${deleteMaterialDialogObject.materialId}`);
                toast.success(response.data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                });
            }
        }).catch((e) => e)

        setDeleteMaterialDialogObject({
            ...deleteMaterialDialogObject,
            isYes: true,
            isNo: false,
            isOpen: false,
        })
        

        setIsLoadingDeleteMaterial(false)    
    }



    async function handleMaterialRequest (materialId: number, status: string){
        
        await axiosInstance.post(`company/material/update-material-request/${materialId}`, {
            status
        })
        .then((response) => {
            // const data = MaterialConvert.toMaterial(JSON.stringify(response.data.data));
            // setMaterialRequest(data)
        }).catch((e) => e)
    }

            
    async function fetchAllMaterials () {
        setIsLoadingAllMaterial(true);
        const addressId = LocalStorageService.getItem(LocalStoragekey.ADDRESS_ID);
        await axiosInstance.get(`company/material-list/${addressId}`)
        .then((response) => {
            const data: Material[] = [];
            response.data.data.forEach((element: any) => {
                data.push(MaterialConvert.toMaterial(JSON.stringify(element)))
            });
            setMaterials(data)
        }).catch((e) => e)
        setIsLoadingAllMaterial(false);
    }
    

    async function fetchAllMaterialRequest () {
        const addressId = LocalStorageService.getItem(LocalStoragekey.ADDRESS_ID);
        await axiosInstance.get(`company/material-request/${addressId}`)
        .then((response) => {
            const data: MaterialRequest[] = [];
            response.data.data.forEach((element: any) => {
                data.push(MaterialRequestConvert.toMaterialRequest(JSON.stringify(element)))
            });
            setMaterialRequest(data)
        }).catch((e) => e)
    }


    useEffect(()=>{
        fetchAllMaterials();
        fetchAllMaterialRequest();
    }, [allMaterialListener])
    


    let list = useAsyncList({
        async load({signal}) {
            const addressId = LocalStorageService.getItem(LocalStoragekey.ADDRESS_ID);

            let response = await axiosInstance.get(`company/material-request-list/${addressId ?? 17}`,{
                signal
            });
            let json = await response?.data?.data;
            setIsLoading(false);

            return {
                items: json,
            };
        },
        async sort({items, sortDescriptor}) {
            return {
                items: items.sort((a: any, b: any) => {
                    let second = b[sortDescriptor?.column ?? 0];
                    let first = a[sortDescriptor?.column ?? 0];
                let cmp = (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;

                if (sortDescriptor.direction === "descending") {
                    cmp *= -1;
                }

                    return cmp;
                }),
            };
        },
    });

    
    // const [selectedUnit, setSelectedUnit] = useState(new Set([]));

    // const selectedUnitValue = useMemo(
    //     () => (Array.from(selectedUnit).join(", ") as String).replaceAll("_", " "),
    //     [selectedUnit]
    // );

    
    // const [selectedMaterial, setselectedMaterial] = useState(new Set([]));

    // const selectedMaterialValue = useMemo(
    //     () => (Array.from(selectedMaterial).join(", ") as String).replaceAll("_", " "),
    //     [selectedMaterial]
    // );

    return (<>
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
        />
        <div className="py-5 flex items-center justify-center">
           <div className="flex flex-col md:flex-row gap-8 sm:my-0 my-5 sm:p-8 p-4 rounded-xl bg-white m-4 w-full sm:h-[95vh] h-full overflow-auto">
                <div className="content flex md:flex-col flex-row gap-5 sm:w-[30em] w-full sm:max-w-full max-w-[18em]">
                    <div className="left w-full flex gap-2">
                        <Input 
                            size="md"
                            radius="sm"
                            placeholder="Material name"
                            value={materialName}
                            isReadOnly={isLoadingCreateMaterial}
                            onChange={(e)=>{
                                setMaterialName(e.target.value);
                            }}
                            className="rounded-sm shadow-md bg-white w-full"
                        />                    
                        <Button
                            isIconOnly
                            className="rounded-md bg-[#0EAD69]"
                            isLoading={isLoadingCreateMaterial}
                            onPress={handleCreateMaterial}
                        >
                            <CheckIcon/>
                        </Button>
                    </div>

                    <Divider className=" h-[0.15em] bg-[#4269E1]"/>
                    
                    <div className="flex flex-col gap-4">
                        {isLoadingAllMaterial && <>
                            <div className="flex gap-4 items-center">
                                <p className="text-black">Fetching Update</p>
                                <Spinner size="sm"/>
                            </div>
                        </>}
                        {
                            materials?.map((elem) => {
                                return <div className="left w-full flex gap-2">
                                    <Input 
                                        size="md"
                                        radius="sm"
                                        placeholder="Material name"
                                        value={elem.name}
                                        isReadOnly
                                        className="rounded-sm shadow-lg w-full"
                                    />                    
                                    <Button
                                        isIconOnly
                                        isLoading={isLoadingDeleteMaterial}
                                        onPress={()=>{
                                            setDeleteMaterialDialogObject({
                                                isOpen: true,
                                                materialId: elem.id,
                                                isYes: false,
                                                isNo: false,
                                            })
                                        }}
                                        className="rounded-md bg-[#AD0E0E]"
                                    >
                                        <TrashIcon width="20" height="20"/>
                                    </Button>
                                </div>
        
                            })
                        }
                    </div>
                </div>

                <Divider className=" h-[0.12em] bg-[#4269E1] sm:hidden block"/>

                <div className="content w-full sm:m-0 my-5 pb-5">
                    
                    <div className="max-h-[20em] w-full">
                        {materialRequests?.map((element) => {
                            return <div className="left flex sm:flex-row flex-col sm:gap-2 gap-4">
                                <Input 
                                    isReadOnly
                                    size="md"
                                    radius="sm"
                                    placeholder="Surename Name"
                                    value={element.user.surname}
                                    className="rounded-sm shadow-lg w-full"
                                    />                    
                                <Input 
                                    isReadOnly
                                    size="md"
                                    radius="sm"
                                    placeholder="Material"
                                    value={element.material.name}
                                    className="rounded-sm shadow-lg w-full"
                                    />                    
                                <Input 
                                    isReadOnly
                                    size="md"
                                    radius="sm"
                                    placeholder="4 kg"
                                    value={element.unit.name}
                                    className="rounded-sm shadow-lg"
                                />                   
                                <div className="flex gap-4 sm:m-0 mt-3">
                                    <Button
                                        isIconOnly
                                        onPress={()=>{
                                            handleMaterialRequest(element.material_id, 'approved')
                                        }}
                                        className="rounded-md bg-[#0EAD69]">
                                        <CheckIcon/>
                                    </Button>
                                    <Button
                                        isIconOnly
                                        onPress={()=>{
                                            handleMaterialRequest(element.material_id, 'delined')
                                        }}
                                        className="rounded-md bg-[#AD0E0E]">
                                        <TrashIcon/>
                                    </Button>
                                </div> 
                            </div>
                        })}
                    </div>


                    <Table
                        aria-label="Example table with client side sorting"
                        sortDescriptor={list.sortDescriptor}
                        onSortChange={list.sort}
                        classNames={{
                            table: "min-h-[400px] text-black",
                            td: "border-r"
                        }}
                        className=" max-h-[100%]  shadow-lg"
                        >
                        <TableHeader>
                            <TableColumn key="surname"> 
                                Surname 
                            </TableColumn>
                            <TableColumn key="name">
                            Name
                            </TableColumn>
                            <TableColumn key="material" allowsSorting>
                            Material
                            </TableColumn>
                            <TableColumn key="Art.-Nr" allowsSorting>
                            Art.-Nr
                            </TableColumn>
                            <TableColumn key="number">
                            Anzahl
                            </TableColumn>
                            <TableColumn key="unit" allowsSorting>
                            Einheit
                            </TableColumn>
                            <TableColumn key="datum" allowsSorting>
                            Datum
                            </TableColumn>
                        </TableHeader>
                        <TableBody 
                            items={list.items} 
                            isLoading={isLoading}
                            loadingContent={<Spinner label="Loading..." />}
                        >
                            {(item : any) => (
                            <TableRow key={item.name}>
                                {(columnKey) => {
                                    
                                    let date = getKeyValue(item, 'created_at');

                                    return <TableCell>
                                        {columnKey == 'name' || columnKey == 'surname' ? getKeyValue(item.user, columnKey) : ''}
                                        {columnKey == 'unit' ? getKeyValue(item.unit, 'name') : ''}
                                        {columnKey == 'material' ? getKeyValue(item.material, 'name') : ''}
                                        {columnKey == 'number' ? getKeyValue(item, columnKey) : ''}
                                        {columnKey == 'datum' ? `${date.split('T')[0]}` : ''}
                                    </TableCell>
                                }}
                            </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    
                    

                </div>
           </div>
        </div>

        { deleteMaterialDialogObject.isOpen && <ConfirmDialog
            icon={<>
                <div className="bg-red-500 p-4 rounded-full w-fit mt-3">
                <TrashIcon width="30" height="30" />
                </div>
            </>}

            title="Delete Job Title ?"
            message={'Are you sure you want to delete this material ?'}
            onNo={()=>{
                setDeleteMaterialDialogObject({
                    ...deleteMaterialDialogObject,
                    isYes: false,
                    isNo: true,
                    isOpen: false,
                })
            }}
            isLoading={isLoadingDeleteMaterial}
            onYes={()=>{
                handleDeleteMaterial()
            }}
        />}
    </>);
}
