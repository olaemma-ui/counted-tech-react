'use client';

import React, { useEffect, useState } from "react";
import { Input, Button, Checkbox, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { AuthenticationLayout } from "./layout/layout";
import { Link, useNavigate } from "react-router-dom";
import { ArrowDownIcon } from "../../_components/svg_components";
import { toFormData } from "axios";
import { axiosInstance } from "../../service/axios_conf";
import { validateFields } from "../../urils/validation";
import { RegisterRequest } from "../../interface/request/auth_request";
import { RegisterResponseConvert } from "../../interface/response/register_response";


export const Signup = ()=>{

    const navigate = useNavigate();

    

    const [isSelected, setIsSelected] = React.useState(false);


    

    const [registerData, setRegisterData] = useState<RegisterRequest>({});
    
    const [error, setError] = useState<RegisterRequest>({});

    const [isLoading, setIsLoading] = useState<boolean>(false);

    
    const [errorMessage, setErrorMessage] = useState<string>('');



    const [stateList, setStateList] = useState<[{id:number, name:string}]>([]);
    const [formList, setFormList] = useState<[{id:number, name:string}]>([]);
    

    
    const [selectedStateKeys, setSelectedStateKeys] = React.useState(new Set([]));
    const selectedStateValue = React.useMemo(
      () => {
        const value = Array.from(stateList.filter((state) => state.id == Array.from(selectedStateKeys)[0]))[0];
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
            const value = Array.from(formList.filter((state) => state.id == Array.from(selectedLegalFormKeys)[0]))[0];
            setRegisterData({
                ...registerData,
                state_id: `${value?.id}`
            })
            return value;
        },
        [selectedLegalFormKeys]
    );


    async function fetchDropdownData (path: string) {
        await axiosInstance.get(path)
            .then((response) => {
                console.log({response});
                
                if(path.includes('state')){
                    setStateList(response.data.data)
                }else {
                    setFormList(response.data.data);
                }
            })
    }

    useEffect(() => {
        fetchDropdownData('legal-form-list');
        fetchDropdownData('state-list');
    }, [])
    




    function handleOnchange(type: string, value: string, label: string, key: string) {
        
        if(type == 'file'){
            setRegisterData({
                ...registerData,
                logo: value,
            })
        }
        else if(key == 'password_confirmation' && registerData.password != value){
            if(registerData.password != value){
                error[key] = 'Password missmatch';
                setError({...error})
            }
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

    function isValid(){
        let valid : boolean = true;
        Object.entries(error).forEach(([key, value]) => {
            if (value) valid = false;
        });

        return valid;
    }

    async function handleOnSubmit() {


        
        if(isValid()){
            
            setErrorMessage('');
            setIsLoading(true);

            await axiosInstance.post(
                '/register', toFormData(registerData),
            ).then((response) =>{
                
                console.log(response.data);
                
                if(typeof(response.data) === typeof('')){
                    setErrorMessage(response.data);
                    console.log('strng resp = ', response.data);
                    
                }

                else {
                    console.log('else = ', response.data);
                    
                    var resgisterResp = RegisterResponseConvert.toRegisterResponse(JSON.stringify(response.data));
                    if(resgisterResp.user) navigate('/');
                }

            })
            .catch((ex) => {
                console.log({ex});
                
                if(ex?.response?.data){

                    const err = JSON.parse(ex?.response?.data);

                    Object.entries(err).forEach(([key, value]) => {
                        error[key] = value[0];
                        setError({...error});
                    });

                }else setErrorMessage('Error occurred, try again')
            })

            setIsLoading(false);
        }
    }



    return (
        <>
            <AuthenticationLayout>
                <div className="mt-8">
                    {errorMessage && 
                        <div className="text-left text-red-500 mb-5 p-4 rounded-lg bg-red-200">
                            {errorMessage}
                        </div>
                    }
                   <div className="sm:flex gap-8 mb-5">

                        <Dropdown showArrow className="mb-5">
                            
                            <DropdownTrigger>
                                
                                <div className={`p-4 flex items-center gap-2 justify-between rounded-xl min-h-[3em] ${selectedStateValue? 'text-black': 'text-gray-500 text-sm font-normal'} shadow-md w-full text-left `}>
                                    {selectedStateValue?.name ? selectedStateValue?.name : 'Art der Arbeit'}
                                    <ArrowDownIcon width="20" height="20" className="self-center justify-self-end" />
                                </div>
                                    
                            </DropdownTrigger>
                            <DropdownMenu 
                                aria-label="Single selection example"
                                variant="flat"
                                disallowEmptySelection
                                selectionMode="single"
                                selectedKeys={selectedStateKeys}
                                onSelectionChange={!isLoading && setSelectedStateKeys}
                            >
                                {stateList.map((e)=> 
                                    <DropdownItem 
                                        key={e.id} 
                                        className="text-black">
                                            {e.name}
                                    </DropdownItem>)}
                            </DropdownMenu>
                        </Dropdown>
                        
                        <Dropdown showArrow className="mb-5">
                            <DropdownTrigger>

                                <div className={`p-4 flex items-center gap-2 justify-between rounded-xl min-h-[3em] ${setSelectedLegalFormValue? 'text-black': 'text-gray-500 text-sm font-normal'} shadow-md w-full text-left `}>
                                {setSelectedLegalFormValue?.name ? setSelectedLegalFormValue?.name : 'Art der Arbeit'}
                                <ArrowDownIcon width="20" height="20" className="self-center justify-self-end" />
                                </div>
                            </DropdownTrigger>
                            <DropdownMenu 
                                aria-label="Single selection example"
                                variant="flat"
                                disallowEmptySelection
                                selectionMode="single"
                                selectedKeys={selectedLegalFormKeys}
                                onSelectionChange={!isLoading && setSelectedLegalFormKeys}
                            >
                                {formList.map((e)=> 
                                    <DropdownItem 
                                        key={e.id} 
                                        className="text-black">
                                            {e.name}
                                    </DropdownItem>)}
                            </DropdownMenu>
                        </Dropdown>
                   </div>
                   
                   <div className="sm:flex gap-8 mb-3">
                       <div className="w-full">
                            <Input 
                                size={'sm'} 
                                type="tel" 
                                label="Telefonnummer" 
                                isReadOnly={isLoading}
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
                            isReadOnly={isLoading}
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
                                isReadOnly={isLoading}
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
                                isReadOnly={isLoading}
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
                                className="shadow-large text-black rounded-3xl bg-[#FFFFFF]" />
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
                                isReadOnly={isLoading}
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
                                isReadOnly={isLoading}
                                classNames={{
                                    inputWrapper: `${error.location && 'border border-red-600'}`
                                }}
                                onChange={(e)=>{
                                    handleOnchange(
                                        'text', 
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
                                isReadOnly={isLoading}
                                classNames={{
                                    inputWrapper: `${error.street && 'border border-red-600'}`
                                }}
                                onChange={(e)=>{
                                    handleOnchange(
                                        'street', 
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
                                isReadOnly={isLoading}
                                label="Ansprechpartner" 
                                classNames={{
                                    inputWrapper: `${error.contact_person && 'border border-red-600'}`
                                }}
                                onChange={(e)=>{
                                    handleOnchange(
                                        '', 
                                        e.target.value, 
                                        'Ansprechpartner', 
                                        'contact_person'
                                    )
                                }}
                                className="shadow-large rounded-3xl bg-[#FFFFFF]" />
                                <small className="text-red-500 block mb-3 pl-3 text-left">
                                    {error.contact_person}
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
                                    inputWrapper: `${error.company_name && 'border border-red-600'}`
                                }}
                                isReadOnly={isLoading}
                                onChange={(e)=>{
                                    handleOnchange(
                                        '', 
                                        e.target.value, 
                                        'Firmenname', 
                                        'company_name'
                                    )
                                }}
                                className="shadow-large rounded-3xl bg-[#FFFFFF]" />
                                <small className="text-red-500 block mb-3 pl-3 text-left">
                                    {error.company_name}
                                </small>
                        </div>
                        <div className="w-full">
                            
                            <Input 
                                size={'sm'} 
                                type="file"
                                accept="image/*"
                                label="Firmenlogo" 
                                classNames={{
                                    inputWrapper: `${error.logo && 'border border-red-600'}`,
                                    label: 'pb-3'
                                }}
                                isReadOnly={isLoading}
                                onChange={(e)=>{

                                    console.log({e});
                                    
                                    handleOnchange(
                                        '', 
                                        e.target?.files[0], 
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
                                isReadOnly={isLoading}
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
                                isReadOnly={isLoading}
                                label="Passwort wiederholen" 
                                classNames={{
                                    inputWrapper: `${error.password_confirmation && 'border border-red-600'}`
                                }}
                                onChange={(e)=>{
                                    handleOnchange(
                                        '', 
                                        e.target.value, 
                                        'Passwort wiederholen', 
                                        'password_confirmation'
                                    )
                                }}
                                className="shadow-large rounded-3xl bg-[#FFFFFF]" />
                                <small className="text-red-500 block mb-3 pl-3 text-left">
                                    {error.password_confirmation}
                                </small>
                        </div>
                   </div>
                    
                    <div className="my-5">
                        <Checkbox isSelected={isSelected} onValueChange={setIsSelected}>
                            Ich bestätige die &nbsp;
                            <Link to="" className="text-blac text-right w-full"> 
                                Ich bestätige die AGB und Datenschutzerklärung. 
                            </Link>
                        </Checkbox>
                    </div>

                    <Button  
                        onPress={handleOnSubmit}
                        isLoading={isLoading}
                        className="bg-black block w-full text-white h-[50px]"> 
                        registrieren
                    </Button>
                </div>
            </AuthenticationLayout>
        </>
    );
}