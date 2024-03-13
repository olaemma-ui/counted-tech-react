'use client';

import React, { useState } from "react";
import { Input, Button, Checkbox, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { AuthenticationLayout } from "./layout/layout";
import { Link, useNavigate } from "react-router-dom";
import { ArrowDownIcon } from "../../_components/svg_components";
import { toFormData } from "axios";
import { LocalStoragekey } from "../../_constants/enums";
import { axiosInstance } from "../../service/axios_conf";
import { LocalStorageService } from "../../service/local_storage";
import { validateFields } from "../../urils/validation";
import { RegisterRequest } from "../../interface/request/auth_request";
import { RegisterResponseConvert } from "../../interface/response/register_response";


export const Signup = ()=>{

    const navigate = useNavigate();

    
    const [selectedStateKeys, setSelectedStateKeys] = React.useState(new Set([]));
    const selectedStateValue = React.useMemo(
      () => Array.from(selectedStateKeys).join(", ").replaceAll("_", " "),
      [selectedStateKeys]
    );

    
    const [selectedLegalFormKeys, setSelectedLegalFormKeys] = React.useState(new Set([]));
    const setSelectedLegalFormValue = React.useMemo(
        () => Array.from(selectedLegalFormKeys).join(", ").replaceAll("_", " "),
        [selectedLegalFormKeys]
    );


    const [isSelected, setIsSelected] = React.useState(false);


    

    const [registerData, setRegisterData] = useState<RegisterRequest>({});
    
    const [error, setError] = useState<RegisterRequest>({});

    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    const [active, setActive] = useState<boolean>(false);
    
    const [errorMessage, setErrorMessage] = useState<string>('');




    function handleOnchange(type: string, value: string, label: string, key: string) {
        
        const valid = validateFields(type, value, label);
        if(valid !== true){
            error[key] = valid;
            setError({...error})
            console.log({...error});
            return;
        }
        registerData[key] = value;
        setRegisterData({...registerData})
        error[key] = '';
        setError({...error})
    }

    async function handleOnSubmit() {
        
        if(registerData.email && registerData.password){
            setErrorMessage('');
            setIsLoading(true);
            await axiosInstance.post(
                '/company/register', toFormData(registerData),
            ).then((response) =>{
                console.log(response.data);
                
                if(typeof(response.data) === typeof('')) setErrorMessage(response.data);
                else {
                    var resgisterResp = RegisterResponseConvert.toRegisterResponse(response.data);

                    if(resgisterResp.user) navigate('/');
                }

            })
            .catch((error) => {
                setErrorMessage('Error occurred, try again')
            })

            setIsLoading(false);
        }
    }



    return (
        <>
            <AuthenticationLayout>
                <form className="mt-8">
                   <div className="sm:flex gap-8 mb-5">

                        <Dropdown showArrow className="mb-5">
                            
                            <DropdownTrigger>
                                
                                <div className={`p-4 flex items-center gap-2 justify-between rounded-xl h-[3em] ${selectedStateValue? 'text-black': 'text-gray-500 text-sm font-normal'} shadow-md w-full text-left `}>
                                    {selectedStateValue ? selectedStateValue : 'Art der Arbeit'}
                                    <ArrowDownIcon width="20" height="20" className="self-end justify-self-end" />
                                </div>
                                    
                            </DropdownTrigger>
                            <DropdownMenu 
                                aria-label="Single selection example"
                                variant="flat"
                                disallowEmptySelection
                                selectionMode="single"
                                selectedKeys={selectedStateKeys}
                                onSelectionChange={setSelectedStateKeys}
                            >
                                <DropdownItem key="text" className="text-black">Text</DropdownItem>
                                <DropdownItem key="number" className="text-black">Number</DropdownItem>
                                <DropdownItem key="date" className="text-black">Date</DropdownItem>
                                <DropdownItem key="single_date" className="text-black">Single Date</DropdownItem>
                                <DropdownItem key="iteration" className="text-black">Iteration</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        
                        <Dropdown showArrow className="mb-5">
                            <DropdownTrigger>

                                <div className={`p-4 flex items-center gap-2 justify-between rounded-xl h-[3em] ${setSelectedLegalFormValue? 'text-black': 'text-gray-500 text-sm font-normal'} shadow-md w-full text-left `}>
                                {setSelectedLegalFormValue ? setSelectedLegalFormValue : 'Art der Arbeit'}
                                <ArrowDownIcon width="20" height="20" className="self-end justify-self-end" />
                                </div>
                            </DropdownTrigger>
                            <DropdownMenu 
                                aria-label="Single selection example"
                                variant="flat"
                                disallowEmptySelection
                                selectionMode="single"
                                selectedKeys={selectedLegalFormKeys}
                                onSelectionChange={setSelectedLegalFormKeys}
                            >
                                <DropdownItem key="text" className="text-black">Text</DropdownItem>
                                <DropdownItem key="number" className="text-black">Number</DropdownItem>
                                <DropdownItem key="date" className="text-black">Date</DropdownItem>
                                <DropdownItem key="single_date" className="text-black">Single Date</DropdownItem>
                                <DropdownItem key="iteration" className="text-black">Iteration</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                   </div>
                   
                   <div className="sm:flex gap-8 mb-3">
                       <div className="w-full">
                            <Input 
                                size={'sm'} 
                                type="text" 
                                label="Telefonnummer" 
                                classNames={{
                                    inputWrapper: `${error.phone && 'border border-red-600'}`
                                }}
                                onChange={(e)=>{
                                    handleOnchange(
                                        'phone', 
                                        e.target.value, 
                                        'Telefonnummer', 
                                        'phone'
                                    )
                                }}
                                className="shadow-large rounded-3xl bg-[#FFFFFF]" />
                                <small className="text-red-500 block mb-3 pl-3 text-left">
                                    {error.phone}
                                </small>
                       </div>

                     <div className="w-full">
                        <Input 
                            size={'sm'} 
                            type="text" 
                            label="Vorname" 
                            classNames={{
                                inputWrapper: `${error.surname && 'border border-red-600'}`
                            }}
                            onChange={(e)=>{
                                handleOnchange(
                                    'name', 
                                    e.target.value, 
                                    'Vorname', 
                                    'surname'
                                )
                            }}
                            className="shadow-large rounded-3xl bg-[#FFFFFF]" />
                            <small className="text-red-500 block mb-3 pl-3 text-left">
                                {error.surname}
                            </small>
                     </div>

                   </div>
                   
                   <div className="sm:flex gap-8 mb-3">

                        <div className="w-full">
                            <Input 
                                size={'sm'} 
                                type="text" 
                                label="Nachname" 
                                classNames={{
                                    inputWrapper: `${error.name && 'border border-red-600'}`
                                }}
                                onChange={(e)=>{
                                    handleOnchange(
                                        'name', 
                                        e.target.value, 
                                        'Nachname', 
                                        'name'
                                    )
                                }}
                                className="shadow-large rounded-3xl bg-[#FFFFFF]" />
                                <small className="text-red-500 block mb-3 pl-3 text-left">
                                    {error.name}
                                </small>
                        </div>

                        <div className="w-full">
                            <Input 
                                size={'sm'} 
                                type="email" 
                                label="E-Mail" 
                                classNames={{
                                    inputWrapper: `${error.email && 'border border-red-600'}`
                                }}
                                onChange={(e)=>{
                                    handleOnchange(
                                        'email', 
                                        e.target.value, 
                                        'E-Mail', 
                                        'email'
                                    )
                                }}
                                className="shadow-large rounded-3xl bg-[#FFFFFF]" />
                                <small className="text-red-500 block mb-3 pl-3 text-left">
                                    {error.email}
                                </small>
                        </div>

                   </div>
                   

                   <div className="sm:flex gap-8 mb-3">

                        <div className="w-full">
                            <Input 
                                size={'sm'} 
                                type="number" 
                                label="PLZ" 
                                classNames={{
                                    inputWrapper: `${error.zipcode && 'border border-red-600'}`
                                }}
                                onChange={(e)=>{
                                    handleOnchange(
                                        'number', 
                                        e.target.value, 
                                        'PLZ', 
                                        'zipcode'
                                    )
                                }}
                                className="shadow-large rounded-3xl bg-[#FFFFFF]" />
                                <small className="text-red-500 block mb-3 pl-3 text-left">
                                    {error.zipcode}
                                </small>
                        </div>
                        <div className="w-full">
                            <Input 
                                size={'sm'} 
                                type="text" 
                                label="Ort" 
                                classNames={{
                                    inputWrapper: `${error.location && 'border border-red-600'}`
                                }}
                                onChange={(e)=>{
                                    handleOnchange(
                                        'number', 
                                        e.target.value, 
                                        'Ort', 
                                        'location'
                                    )
                                }}
                                className="shadow-large rounded-3xl bg-[#FFFFFF]" />
                                <small className="text-red-500 block mb-3 pl-3 text-left">
                                    {error.location}
                                </small>
                        </div>
                   </div>

                   <div className="sm:flex gap-8 mb-3">
                        <div className="w-full">
                            <Input 
                                size={'sm'} 
                                type="text" 
                                label="Street" 
                                classNames={{
                                    inputWrapper: `${error.street && 'border border-red-600'}`
                                }}
                                onChange={(e)=>{
                                    handleOnchange(
                                        'text', 
                                        e.target.value, 
                                        'Street', 
                                        'street'
                                    )
                                }}
                                className="shadow-large rounded-3xl bg-[#FFFFFF]" />
                                <small className="text-red-500 block mb-3 pl-3 text-left">
                                    {error.street}
                                </small>
                        </div>
                        
                        <div className="w-full">
                            <Input 
                                size={'sm'} 
                                type="text" 
                                label="Ansprechpartner" 
                                classNames={{
                                    inputWrapper: `${error.contactPerson && 'border border-red-600'}`
                                }}
                                onChange={(e)=>{
                                    handleOnchange(
                                        'email', 
                                        e.target.value, 
                                        'Ansprechpartner', 
                                        'contactPerson'
                                    )
                                }}
                                className="shadow-large rounded-3xl bg-[#FFFFFF]" />
                                <small className="text-red-500 block mb-3 pl-3 text-left">
                                    {error.contactPerson}
                                </small>
                        </div>
                   </div>

                   <div className="sm:flex gap-8 mb-3">
                        <div className="w-full">
                            <Input 
                                size={'sm'} 
                                type="text" 
                                label="Firmenname" 
                                classNames={{
                                    inputWrapper: `${error.companyName && 'border border-red-600'}`
                                }}
                                onChange={(e)=>{
                                    handleOnchange(
                                        'text', 
                                        e.target.value, 
                                        'Firmenname', 
                                        'companyName'
                                    )
                                }}
                                className="shadow-large rounded-3xl bg-[#FFFFFF]" />
                                <small className="text-red-500 block mb-3 pl-3 text-left">
                                    {error.companyName}
                                </small>
                        </div>
                        <div className="w-full">
                            <Input 
                                size={'sm'} 
                                type="image"
                                label="Firmenlogo" 
                                classNames={{
                                    inputWrapper: `${error.logo && 'border border-red-600'}`
                                }}
                                onChange={(e)=>{
                                    handleOnchange(
                                        'text', 
                                        e.target.value, 
                                        'Firmenlogo', 
                                        'logo'
                                    )
                                }}
                                className="shadow-large rounded-3xl bg-[#FFFFFF]" />
                                <small className="text-red-500 block mb-3 pl-3 text-left">
                                    {error.logo}
                                </small>
                        </div>

                    </div>


                   <div className="sm:flex gap-8 mb-3">
                        <div className="w-full">
                            <Input 
                                size={'sm'} 
                                type="password" 
                                label="Passwort" 
                                classNames={{
                                    inputWrapper: `${error.password && 'border border-red-600'}`
                                }}
                                onChange={(e)=>{
                                    handleOnchange(
                                        'password', 
                                        e.target.value, 
                                        'Passwort', 
                                        'password'
                                    )
                                }}
                                className="shadow-large rounded-3xl bg-[#FFFFFF]" />
                                <small className="text-red-500 block mb-3 pl-3 text-left">
                                    {error.password}
                                </small>
                        </div>
                        <div className="w-full">
                            <Input 
                                size={'sm'} 
                                type="password" 
                                label="Passwort wiederholen" 
                                classNames={{
                                    inputWrapper: `${error.passwordConfirmation && 'border border-red-600'}`
                                }}
                                onChange={(e)=>{
                                    handleOnchange(
                                        'password', 
                                        e.target.value, 
                                        'Passwort wiederholen', 
                                        'password'
                                    )
                                }}
                                className="shadow-large rounded-3xl bg-[#FFFFFF]" />
                                <small className="text-red-500 block mb-3 pl-3 text-left">
                                    {error.passwordConfirmation}
                                </small>
                        </div>
                   </div>
                    
                    <div className="my-5">
                        <Checkbox isSelected={isSelected} onValueChange={setIsSelected}>
                            Ich bestätige die &nbsp;
                            <Link to="" className="text-blac text-right"> 
                                Ich bestätige die AGB und Datenschutzerklärung. 
                            </Link>
                        </Checkbox>
                    </div>

                    <Button  className="bg-black block w-full text-white h-[50px]"> registrieren </Button>
                </form>
            </AuthenticationLayout>
        </>
    );
}