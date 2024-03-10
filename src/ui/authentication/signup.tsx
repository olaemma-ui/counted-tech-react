'use client';

import React from "react";
import { Input, Button, Checkbox, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { AuthenticationLayout } from "./layout/layout";
import { Link } from "react-router-dom";


export const Signup = ()=>{
    const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));

    const selectedValue = React.useMemo(
      () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
      [selectedKeys]
    );

    const [isSelected, setIsSelected] = React.useState(false);


    return (
        <>
            <AuthenticationLayout>
                <form className="mt-8">
                   <div className="md:flex gap-8 mb-3">

                        <Dropdown showArrow>
                            
                            <DropdownTrigger>
                                <Input
                                    isReadOnly
                                    type="text"
                                    size={'sm'} 
                                    label="Bundesland"
                                    variant="flat"
                                    defaultValue={selectedValue}
                                    value={selectedValue}
                                    // className="max-w-xs"
                                    className="max-w-xs shadow-large p-0 rounded-3xl mb-3 text-black cursor-pointer bg-[#FFFFFF]" />
                                    
                            </DropdownTrigger>
                            <DropdownMenu 
                                aria-label="Single selection example"
                                variant="flat"
                                disallowEmptySelection
                                selectionMode="single"
                                selectedKeys={selectedKeys}
                                onSelectionChange={setSelectedKeys}
                            >
                                <DropdownItem key="text" className="text-black">Text</DropdownItem>
                                <DropdownItem key="number" className="text-black">Number</DropdownItem>
                                <DropdownItem key="date" className="text-black">Date</DropdownItem>
                                <DropdownItem key="single_date" className="text-black">Single Date</DropdownItem>
                                <DropdownItem key="iteration" className="text-black">Iteration</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    
                        <Input 
                            size={'sm'} 
                            type="text" 
                            label="Telefonnummer" 
                            className="shadow-large rounded-3xl mb-3 bg-[#FFFFFF]" />
                   </div>
                   
                   <div className="md:flex gap-8 mb-3">
                        <Input 
                            size={'sm'} 
                            type="text" 
                            label="Vorname" 
                            className="shadow-large rounded-3xl mb-3 bg-[#FFFFFF]" />
                        <Input 
                        size={'sm'} 
                            type="text" 
                            label="Nachname" 
                            className="shadow-large rounded-3xl mb-3 bg-[#FFFFFF]" />
                   </div>
                   
                   <div className="md:flex gap-8 mb-3">
                        <Input 
                            size={'sm'} 
                            type="text" 
                            label="Firmenname" 
                            className="shadow-large rounded-3xl mb-3 bg-[#FFFFFF]" />
                        <Input 
                        size={'sm'} 
                            type="text" 
                            label="E-Mail" 
                            className="shadow-large rounded-3xl mb-3 bg-[#FFFFFF]" />
                   </div>

                   <div className="md:flex gap-8 mb-3">
                        <Input 
                            size={'sm'} 
                            type="password" 
                            label="Passwort" 
                            className="shadow-large rounded-3xl mb-3 bg-[#FFFFFF]" />
                        <Input 
                            size={'sm'} 
                            type="password" 
                            label="Passwort wiederholen" 
                            className="shadow-large rounded-3xl mb-3 bg-[#FFFFFF]" />
                   </div>
                   
                        <Input 
                            size={'sm'} 
                            type="text" 
                            label="Firmenlogo" 
                            className="shadow-large rounded-3xl mb-3 bg-[#FFFFFF] w-full" />

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