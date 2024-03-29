import { Avatar, Button, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Spinner, Checkbox } from "@nextui-org/react";
import { ArrowDownIcon, CheckIcon, EraserIcon, MapPinIcon, PencilIcon, SwapIcon, TrashIcon } from "../../_components/svg_components";
import {useAsyncList} from "@react-stately/data";


import '../style/dashboard.css'
import React from "react";
import { EditProfile } from "../dashboard/dialogs/edit_profile";


export const EmployeeDetails = ()=>{

    
    const [isLoading, setIsLoading] = React.useState(true);
    
    const [viewEmployee, setViewEmployee] = React.useState(false);

    let list = useAsyncList({
        async load({signal}) {
        let res = await fetch('https://swapi.py4e.com/api/people/?search', {
            signal,
        });
        let json = await res.json();
        setIsLoading(false);

        return {
            items: json.results,
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

    
    const [selectedYear, setSelectedYear] = React.useState(new Set([]));

    const selectedYearValue = React.useMemo(
        () => (Array.from(selectedYear).join(", ") as String).replaceAll("_", " "),
        [selectedYear]
    );

    
    const [selectedMonth, setSelectedMonth] = React.useState(new Set([]));

    const selectedMonthValue = React.useMemo(
        () => (Array.from(selectedMonth).join(", ") as String).replaceAll("_", " "),
        [selectedMonth]
    );

    return (<>
        <div className="py-5  h-[100dvh] flex items-center justify-center">
           <div className="sm:flex gap-8 sm:my-0 my-5 sm:p-8 p-4 m-4 w-full sm:h-[80vh] h-full overflow-auto">
                <div className="content w-full max-w-[18em] h-full rounded-xl bg-white p-4">
                    <div className="left flex gap-2 w-full">               
                        <Button
                            isIconOnly
                            className="rounded-md bg-[#273B4A]">
                            <SwapIcon/>
                        </Button>

                        <Button
                            isIconOnly
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
                            name="Ola Emma"
                            className="max-w-[6em] h-max-[6em] w-full h-full"
                            src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />

                      <div className="flex flex-col w-full justify-end items-end gap-4 ">
                            
                           <Checkbox>
                            <EraserIcon/>
                           </Checkbox>
                            
                           <Checkbox>
                            <MapPinIcon/>
                           </Checkbox>
                      </div>
                    </div>

                    <p className="text-sm text-black text-left">Vorname</p>
                    <p className="text-xl font-semibold text-black text-left mb-5">David</p>

                    

                    <p className="text-sm text-black text-left">Nachname</p>
                    <p className="text-xl font-semibold text-black text-left mb-5">David</p>


                    <p className="text-sm text-black text-left">Telefonnummer</p>
                    <p className="text-xl font-semibold text-black text-left mb-5">David</p>


                    <p className="text-sm text-black text-left">Personalnummer</p>
                    <p className="text-xl font-semibold text-black text-left mb-5">David</p>


                    <p className="text-sm text-black text-left">Führerschein</p>
                    <p className="text-xl font-semibold text-black text-left mb-5">Ja</p>


                    <p className="text-sm text-black text-left">Arbeitsort</p>
                    <p className="text-xl font-semibold text-black text-left mb-5">
                        Bruchhausenerstraße 3659759 Arnsberg
                    </p>


                    <p className="text-sm text-black text-left">Urlaub</p>
                    <p className="text-xl font-semibold text-black text-left mb-5">
                        Gesamt: 30
                        Übrig: 0
                    </p>


                </div>

                <div className="content w-full sm:m-0 my-5 p-4 rounded-xl bg-white">
                    <div className="left flex sm:flex-row flex-col gap-2">
                        <div className="w-full flex text-black">
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
                        </div>

                        <Dropdown showArrow>
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
                        </Dropdown>

                        <div className="flex gap-4">
                            <Button
                                isIconOnly
                                className="rounded-md bg-[#4269E1]">
                                <CheckIcon/>
                            </Button>
                        </div> 
                    </div>


                    <Table
                        aria-label="Example table with client side sorting"
                        sortDescriptor={list.sortDescriptor}
                        onSortChange={list.sort}
                        classNames={{
                            table: "min-h-[400px] text-black",
                            td: "border-r"
                        }}
                        className="mt-5 shadow-lg my-5"
                        >
                        <TableHeader>
                            <TableColumn key="vorname" allowsSorting> 
                                Vorname 
                            </TableColumn>
                            <TableColumn key="Name" allowsSorting>
                            Name
                            </TableColumn>
                            <TableColumn key="Material" allowsSorting>
                            Material
                            </TableColumn>
                            <TableColumn key="Art.-Nr" allowsSorting>
                            Art.-Nr
                            </TableColumn>
                            <TableColumn key="Anzahl" allowsSorting>
                            Anzahl
                            </TableColumn>
                            <TableColumn key="Einheit" allowsSorting>
                            Einheit
                            </TableColumn>
                            <TableColumn key="Datum" allowsSorting>
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
                                {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                            </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    
                    <EditProfile isOpen={viewEmployee} onClose={()=>{setViewEmployee(false)}}/>

                </div>
           </div>
        </div>
    </>);
}