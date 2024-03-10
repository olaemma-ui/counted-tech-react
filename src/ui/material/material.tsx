import { Button, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Spinner } from "@nextui-org/react";
import { ArrowDownIcon, CheckIcon, TrashIcon } from "../../_components/svg_components";
import {useAsyncList} from "@react-stately/data";


import '../style/dashboard.css'
import React from "react";


export const MaterialsPage = ()=>{

    
    const [isLoading, setIsLoading] = React.useState(true);

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

    
    const [selectedUnit, setSelectedUnit] = React.useState(new Set([]));

    const selectedUnitValue = React.useMemo(
        () => (Array.from(selectedUnit).join(", ") as String).replaceAll("_", " "),
        [selectedUnit]
    );

    
    const [selectedMaterial, setselectedMaterial] = React.useState(new Set([]));

    const selectedMaterialValue = React.useMemo(
        () => (Array.from(selectedMaterial).join(", ") as String).replaceAll("_", " "),
        [selectedMaterial]
    );

    return (<>
        <div className="py-5  h-[100dvh] flex items-center justify-center">
           <div className="sm:flex gap-8 sm:my-0 my-5 sm:p-8 p-4 rounded-xl bg-white m-4 w-full sm:h-[80vh] h-full overflow-auto">
                <div className="content w-full max-w-[18em]">
                    <div className="left flex gap-2">
                        <Input 
                            size="md"
                            radius="sm"
                            placeholder="Material name"
                            className="rounded-sm shadow-md bg-white w-full"
                        />                    
                        <Button
                            isIconOnly
                            className="rounded-md bg-[#0EAD69]"
                        >
                            <CheckIcon/>
                        </Button>
                    </div>

                    <Divider className=" h-[0.12em] bg-[#4269E1] my-5"/>
                    
                    <div className="left flex gap-2">
                        <Input 
                            size="md"
                            radius="sm"
                            placeholder="Material name"
                            className="rounded-sm shadow-lg w-full"
                        />                    
                        <Button
                            isIconOnly
                            className="rounded-md bg-[#AD0E0E]"
                        >
                            <TrashIcon width="20" height="20"/>
                        </Button>
                    </div>

                </div>

                <div className="content w-full sm:m-0 my-5 pb-5">
                    <div className="left flex sm:flex-row flex-col sm:gap-2 gap-4">
                        <Input 
                            isReadOnly
                            size="md"
                            radius="sm"
                            placeholder="Surename Name"
                            className="rounded-sm shadow-lg w-full"
                            />                    
                        <Input 
                            isReadOnly
                            size="md"
                            radius="sm"
                            placeholder="Material"
                            className="rounded-sm shadow-lg w-full"
                            />                    
                        <Input 
                            isReadOnly
                            size="md"
                            radius="sm"
                            placeholder="4 kg"
                            className="rounded-sm shadow-lg"
                        />                   
                        <div className="flex gap-4 sm:m-0 mt-3">
                            <Button
                                isIconOnly
                                className="rounded-md bg-[#0EAD69]">
                                <CheckIcon/>
                            </Button>
                            <Button
                                isIconOnly
                                className="rounded-md bg-[#AD0E0E]">
                                <TrashIcon/>
                            </Button>
                        </div> 
                    </div>

                    <Divider className=" h-[0.12em] bg-[#4269E1] my-5"/>
                    <div className="left flex sm:flex-row flex-col gap-2">
                        <Dropdown showArrow>
                            <DropdownTrigger>

                                <div className={`p-4 flex items-center gap-2 justify-between rounded-xl h-[3.1em] ${selectedMaterialValue? 'text-black': 'text-gray-500 text-sm font-normal'} shadow-md w-full text-left `}>
                                {selectedMaterialValue ? selectedMaterialValue : 'Material'}
                                <ArrowDownIcon width="20" height="20" className="self-end justify-self-end" />
                                </div>
                            </DropdownTrigger>
                            <DropdownMenu 
                                aria-label="Single selection example"
                                variant="flat"
                                disallowEmptySelection
                                selectionMode="single"
                                selectedKeys={selectedMaterial}
                                onSelectionChange={setselectedMaterial}
                            >
                                <DropdownItem key="text" className="text-black">Text</DropdownItem>
                                <DropdownItem key="number" className="text-black">Number</DropdownItem>
                                <DropdownItem key="date" className="text-black">Date</DropdownItem>
                                <DropdownItem key="single_date" className="text-black">Single Date</DropdownItem>
                                <DropdownItem key="iteration" className="text-black">Iteration</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>               
                        <Input 
                            // isReadOnly
                            size="lg"
                            radius="sm"
                            placeholder="Art.-Nr."
                            className="rounded-sm shadow-lg w-full"
                            />                    
                        <Input 
                            isReadOnly
                            size="lg"
                            radius="sm"
                            placeholder="#"
                            className="rounded-sm shadow-lg w-ful"
                        />                   

                        <Dropdown showArrow>
                            <DropdownTrigger>

                                <div className={`p-4 flex items-center gap-2 justify-between rounded-xl h-[3.1em] ${selectedUnitValue? 'text-black': 'text-gray-500 text-sm font-normal'} shadow-md w-full text-left `}>
                                {selectedUnitValue ? selectedUnitValue : 'Einheit'}
                                <ArrowDownIcon width="20" height="20" className="self-end justify-self-end" />
                                </div>
                            </DropdownTrigger>
                            <DropdownMenu 
                                aria-label="Single selection example"
                                variant="flat"
                                disallowEmptySelection
                                selectionMode="single"
                                selectedKeys={selectedUnit}
                                onSelectionChange={setSelectedUnit}
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
                                className="rounded-md bg-[#0EAD69]">
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
                    
                    

                </div>
           </div>
        </div>
    </>);
}