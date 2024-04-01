import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Checkbox, Input, Link, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Divider, Spinner, Avatar } from "@nextui-org/react";
import { ArrowDownIcon } from "../../_components/svg_components";
import { Convert, Employee, EmployeeData } from "../../interface/response/dto";
import { LocationData, LocationDataConvert } from "../../interface/response/dashboard_data";
import { axiosInstance } from "../../service/axios_conf";
import { toFormData } from "axios";
import { toast, Bounce, ToastContainer } from "react-toastify";
import { RegisterRequest } from "../../interface/request/auth_request";
import { validateFields } from "../../urils/validation";


interface EditEmployerProfileProps {
    onClose?: () => void,
    isOpen: boolean,
}

export function EditEmployerProfile(props: EditEmployerProfileProps) {
    const { isOpen, onOpenChange } = useDisclosure({
        isOpen: props.isOpen,
        onClose: props.onClose,
    });

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [submitLoading, setSubmitLoading] = useState<boolean>(false);
    const [loadingMessage, setLoadingMessage] = useState<string>();
    const [selectedKeys, setSelectedKeys] = useState(new Set([]));
    const [employeeData, setEmployeeData] = useState<EmployeeData>();
    const [locationDataList, setLocationDataList] = useState<LocationData[]>([]);

    const [imageUrl, setImageUrl] = useState<string>();

    const [error, setError] = useState<RegisterRequest>({});
    const [registerData, setRegisterData] = useState<RegisterRequest>({});



    async function fetchLocationData() {
        setIsLoading(true)
        setLoadingMessage('Fetching ocations')
        await axiosInstance.get('company/location')
            .then((response) => {
                const data = response.data.data;
                const list: LocationData[] = [];
                data.forEach((element: any) => {
                    list.push(LocationDataConvert.toLocationData(JSON.stringify(element)))
                });
                console.log({ list });
                setLocationDataList(list);
            })
        setLoadingMessage('')
        setIsLoading(false)
    }


    async function fetchEmployerProfile() {
        setIsLoading(true)
        setLoadingMessage('Fetching Profile Details')
        await axiosInstance.get('company/profile')
            .then((response) => {
                if (response.data.status) {
                    const data = Convert.toEmployeeData(JSON.stringify(response.data.data));
                    setRegisterData({
                        company_name: data.company.company_name,
                        logo: data.company?.logo,
                        email: data.email,
                        name: data.name,
                        phone: data.phone,
                        surname: data.surname,
                        zipcode: data?.company?.zipcode,
                        contact_person: data?.company.contact_person,
                        location: data?.company.location,
                        legal_entity_id: data?.company.legal_entity_id.toString(),
                        state_id: data.company?.state_id.toString(),
                        street: data?.company?.street
                    });
                    console.log({imageUrl});
                }
            })
        setIsLoading(false)
        setLoadingMessage('')
    }

    async function fetchDropdownData (path: string) {
        setIsLoading(true)
        await axiosInstance.get(path)
            .then((response) => {
                if(path.includes('state')){
                    setLoadingMessage('Fetching States')
                    setStateList(response.data.data)
                }else {
                    setLoadingMessage('Fetching Legal form')
                    setFormList(response.data.data);
                }
            })
        setIsLoading(false)
        setLoadingMessage('')
    }


    useEffect(() => {
        fetchEmployerProfile()
        fetchLocationData()
        fetchDropdownData('legal-form-list');
        fetchDropdownData('state-list');
    }, [])



    const selectedValue = React.useMemo(
        () => {
            const key = (Array.from(selectedKeys).join(", ") as String).replaceAll("_", " ");
            console.log({ key });

            return locationDataList?.find((location) => location.id.toString() == key);
        },
        [selectedKeys]
    );

    
    const [stateList, setStateList] = useState<[{id:number, name:string}]>();
    const [formList, setFormList] = useState<[{id:number, name:string}]>();
    

    
    const [selectedStateKeys, setSelectedStateKeys] = React.useState(new Set([]));
    const selectedStateValue = React.useMemo(
      () => {
        const value = Array.from(stateList?.filter((state) => state.id == Array.from(selectedStateKeys)[0])?? [])[0];
        setRegisterData({
            ...registerData,
            legal_entity_id: `${value?.id}`
        })

        return value;
      },
      [selectedStateKeys]
    );

    
    const [selectedLegalFormKeys, setSelectedLegalFormKeys] = React.useState(new Set([]));
    const setSelectedLegalFormValue = React.useMemo(
        () => {
            const value = Array.from(formList?.filter((state) => state.id == Array.from(selectedLegalFormKeys)[0]) ?? [])[0];
            setRegisterData({
                ...registerData,
                state_id: `${value?.id}`
            })
            return value;
        },
        [selectedLegalFormKeys]
    );

    async function handleSubmit() {
        setSubmitLoading(true);
        await axiosInstance.post(`company/employee-update/${employeeData.id}`, toFormData({
            // id: employeeData.id,
            name: employeeData?.name,
            surname: employeeData?.surname,
            personal_number: employeeData?.employee?.personal_number,
            license: employeeData?.employee?.license,
            phone: employeeData.phone,
            address_id: selectedValue?.id ?? employeeData?.employee.address_id,
        }))
            .then((response) => {
                if (response.data.status) {
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
                else toast.error(response?.data?.message ?? 'Error occurred', {
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
                props.onClose();
            })

            setSubmitLoading(false);
    }

    function handleOnchange(type: string, value: string | File, label: string, key: string) {
        
        console.log({type});
        if(type == 'file'){
            
            setRegisterData({
                ...registerData,
                logo: value,
            })
            let f : File = value as File;
            setImageUrl(URL.createObjectURL( f ))
        }
        else {
            const valid = validateFields(type, value, label);
            
            if(valid !== true){
                error[key] = valid;
                setError({...error})
                return;
            }
            registerData[key] = value;
            setRegisterData({...registerData})
            error[key] = '';
            setError({...error})

        }
    }




    return (
        <>
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
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
                backdrop="blur"
                isDismissable={false}
                size="xl"
                scrollBehavior="inside"

            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-black text-center">
                                Profil bearbeiten
                            </ModalHeader>
                            <ModalBody>
                                {isLoading && <>
                                    <p className="text-black">
                                        {loadingMessage}
                                        <Spinner size="sm"/>
                                    </p>
                                </>}
                                    <Avatar 
                                        isBordered 
                                        radius="lg" 
                                        name={registerData?.company_name}
                                        className="w-[7em] h-[7em]"
                                        src={(imageUrl ? imageUrl : `${import.meta.env.VITE_COUNTEDT_TECH_COMPANY_IMAGE_URL}${registerData?.logo}`)} />
                                
                                <div className="sm:flex gap-8 mb-5">
                                    <Dropdown showArrow className="mb-5">

                                        <DropdownTrigger>

                                            <div className={`p-4 flex items-center gap-2 justify-between rounded-xl min-h-[3em] text-black shadow-md w-full text-left `}>
                                                {selectedStateValue?.name ? selectedStateValue?.name : stateList?.filter((e) => e.id.toString() == registerData.state_id)[0]?.name}
                                                <ArrowDownIcon width="20" height="20" className="self-center justify-self-end" />
                                            </div>

                                        </DropdownTrigger>
                                        <DropdownMenu
                                            aria-label="Single selection example"
                                            variant="flat"
                                            disallowEmptySelection
                                            selectionMode="single"
                                            selectedKeys={selectedStateKeys}
                                            //@ts-ignore
                                            onSelectionChange={!isLoading && setSelectedStateKeys}
                                        >
                                            {stateList?.map((e) =>
                                                <DropdownItem
                                                    key={e.id}
                                                    className="text-black">
                                                    {e.name}
                                                </DropdownItem>)}
                                        </DropdownMenu>
                                    </Dropdown>

                                    <Dropdown showArrow className="mb-5">
                                        <DropdownTrigger>

                                            <div className={`p-4 flex items-center gap-2 justify-between rounded-xl min-h-[3em] text-black shadow-md w-full text-left `}>
                                                {setSelectedLegalFormValue?.name ? setSelectedLegalFormValue?.name : formList?.filter((e) => e.id.toString() == registerData.legal_entity_id)[0]?.name}
                                                <ArrowDownIcon width="20" height="20" className="self-center justify-self-end" />
                                            </div>
                                        </DropdownTrigger>
                                        <DropdownMenu
                                            aria-label="Single selection example"
                                            variant="flat"
                                            disallowEmptySelection
                                            selectionMode="single"
                                            selectedKeys={selectedLegalFormKeys}
                                            //@ts-ignore
                                            onSelectionChange={!isLoading && setSelectedLegalFormKeys}
                                        >
                                            {formList?.map((e) =>
                                                <DropdownItem
                                                    key={e.id}
                                                    className="text-black">
                                                    {e.name}
                                                </DropdownItem>)}
                                        </DropdownMenu>
                                    </Dropdown>
                                </div>

                                <div className="sm:flex gap-8 mb-1">
                                    <div className="w-full">
                                        <Input
                                            size={'sm'}
                                            type="tel"
                                            label="Telefonnummer"
                                            isReadOnly={isLoading}
                                            value={registerData?.phone}
                                            classNames={{
                                                inputWrapper: `${error?.phone && 'border border-red-600'}`
                                            }}
                                            onChange={(e) => {
                                                handleOnchange(
                                                    'phone',
                                                    e.target.value,
                                                    'Telefonnummer',
                                                    'phone'
                                                )
                                            }}
                                            className="shadow-large rounded-3xl bg-[#FFFFFF]" />
                                        <small className="text-red-500 block mb-1 pl-3 text-left">
                                            {error?.phone}
                                        </small>
                                    </div>

                                    <div className="w-full">
                                        <Input
                                            size={'sm'}
                                            type="text"
                                            isReadOnly={isLoading}
                                            label="Vorname"
                                            value={registerData?.surname}
                                            classNames={{
                                                inputWrapper: `${error?.surname && 'border border-red-600'}`
                                            }}
                                            onChange={(e) => {
                                                handleOnchange(
                                                    'name',
                                                    e.target.value,
                                                    'Vorname',
                                                    'surname'
                                                )
                                            }}
                                            className="shadow-large rounded-3xl bg-[#FFFFFF]" />
                                        <small className="text-red-500 block mb-1 pl-3 text-left">
                                            {error?.surname}
                                        </small>
                                    </div>

                                </div>

                                <div className="sm:flex gap-8 mb-1">

                                    <div className="w-full">
                                        <Input
                                            size={'sm'}
                                            type="text"
                                            isReadOnly={isLoading}
                                            label="Nachname"
                                            value={registerData?.name}
                                            classNames={{
                                                inputWrapper: `${error?.name && 'border border-red-600'}`
                                            }}
                                            onChange={(e) => {
                                                handleOnchange(
                                                    'name',
                                                    e.target.value,
                                                    'Nachname',
                                                    'name'
                                                )
                                            }}
                                            className="shadow-large rounded-3xl bg-[#FFFFFF]" />
                                        <small className="text-red-500 block mb-1 pl-3 text-left">
                                            {error?.surname}
                                        </small>
                                    </div>

                                    <div className="w-full">
                                        <Input
                                            size={'sm'}
                                            type="email"
                                            isReadOnly={isLoading}
                                            label="E-Mail"
                                            value={registerData?.email}
                                            classNames={{
                                                inputWrapper: `${error?.email && 'border border-red-600'}`
                                            }}
                                            onChange={(e) => {
                                                handleOnchange(
                                                    'email',
                                                    e.target.value,
                                                    'E-Mail',
                                                    'email'
                                                )
                                            }}
                                            className="shadow-large text-black rounded-3xl bg-[#FFFFFF]" />
                                        <small className="text-red-500 block mb-1 pl-3 text-left">
                                            {error?.email}
                                        </small>
                                    </div>

                                </div>


                                <div className="sm:flex gap-8 mb-1">

                                    <div className="w-full">
                                        <Input
                                            size={'sm'}
                                            type="number"
                                            isReadOnly={isLoading}
                                            label="PLZ"
                                            value={registerData?.zipcode}
                                            classNames={{
                                                inputWrapper: `${error?.zipcode && 'border border-red-600'}`
                                            }}
                                            onChange={(e) => {
                                                handleOnchange(
                                                    'number',
                                                    e.target.value,
                                                    'PLZ',
                                                    'zipcode'
                                                )
                                            }}
                                            className="shadow-large rounded-3xl bg-[#FFFFFF]" />
                                        <small className="text-red-500 block mb-1 pl-3 text-left">
                                            {error?.zipcode}
                                        </small>
                                    </div>
                                    <div className="w-full">
                                        <Input
                                            size={'sm'}
                                            type="text"
                                            label="Ort"
                                            isReadOnly={isLoading}
                                            value={registerData?.location}
                                            classNames={{
                                                inputWrapper: `${error?.location && 'border border-red-600'}`
                                            }}
                                            onChange={(e) => {
                                                handleOnchange(
                                                    'text',
                                                    e.target.value,
                                                    'Ort',
                                                    'location'
                                                )
                                            }}
                                            className="shadow-large rounded-3xl bg-[#FFFFFF]" />
                                        <small className="text-red-500 block mb-1 pl-3 text-left">
                                            {error?.location}
                                        </small>
                                    </div>
                                </div>

                                <div className="sm:flex gap-8 mb-1">
                                    <div className="w-full">
                                        <Input
                                            size={'sm'}
                                            type="text"
                                            label="Street"
                                            isReadOnly={isLoading}
                                            value={registerData?.street}
                                            classNames={{
                                                inputWrapper: `${error?.street && 'border border-red-600'}`
                                            }}
                                            onChange={(e) => {
                                                handleOnchange(
                                                    'street',
                                                    e.target.value,
                                                    'Street',
                                                    'street'
                                                )
                                            }}
                                            className="shadow-large rounded-3xl bg-[#FFFFFF]" />
                                        <small className="text-red-500 block mb-1 pl-3 text-left">
                                            {error?.street}
                                        </small>
                                    </div>

                                    <div className="w-full">
                                        <Input
                                            size={'sm'}
                                            type="text"
                                            isReadOnly={isLoading}
                                            label="Ansprechpartner"
                                            value={registerData?.contact_person}
                                            classNames={{
                                                inputWrapper: `${error?.contact_person && 'border border-red-600'}`
                                            }}
                                            onChange={(e) => {
                                                handleOnchange(
                                                    '',
                                                    e.target.value,
                                                    'Ansprechpartner',
                                                    'contact_person'
                                                )
                                            }}
                                            className="shadow-large rounded-3xl bg-[#FFFFFF]" />
                                        <small className="text-red-500 block mb-1 pl-3 text-left">
                                            {error?.contact_person}
                                        </small>
                                    </div>
                                </div>

                                <div className="sm:flex gap-8 mb-1">
                                    <div className="w-full">
                                        <Input
                                            size={'sm'}
                                            type="text"
                                            label="Firmenname"
                                            value={registerData?.company_name}
                                            classNames={{
                                                inputWrapper: `${error?.company_name && 'border border-red-600'}`
                                            }}
                                            isReadOnly={isLoading}
                                            onChange={(e) => {
                                                handleOnchange(
                                                    '',
                                                    e.target.value,
                                                    'Firmenname',
                                                    'company_name'
                                                )
                                            }}
                                            className="shadow-large rounded-3xl bg-[#FFFFFF]" />
                                        <small className="text-red-500 block mb-1 pl-3 text-left">
                                            {error?.company_name}
                                        </small>
                                    </div>
                                    <div className="w-full">

                                        <Input
                                            size={'sm'}
                                            type="file"
                                            accept="image/*"
                                            label="Firmenlogo"
                                            classNames={{
                                                inputWrapper: `${error?.logo && 'border border-red-600'}`,
                                                label: 'pb-3'
                                            }}
                                            isReadOnly={isLoading}
                                            onChange={(e) => {

                                                console.log({ e });

                                                handleOnchange(
                                                    'file',
                                                    e.target?.files[0],
                                                    'Firmenlogo',
                                                    'logo'
                                                )
                                            }}
                                            className="shadow-large rounded-3xl bg-[#FFFFFF]" />
                                        <small className="text-red-500 block mb-1 pl-3 text-left">
                                            {error?.logo}
                                        </small>
                                    </div>

                                </div>

                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="primary"
                                    className="w-full h-[4em] bg-[#4269E1]"
                                    isLoading={submitLoading}
                                    onPress={handleSubmit}>
                                    bearbeiten
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
