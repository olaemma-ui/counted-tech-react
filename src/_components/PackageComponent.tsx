import { Card, CardHeader, CardBody, CardFooter, Divider, Button, CheckboxIcon, Input, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { PackageProps } from "../interface/response/dto";
import { useMemo, useState } from "react";




export function PackageComponent(props: PackageProps) {
    const colors = ['', 'border-[#C0C0C0]', 'border-[#E3C520]'];

    const [selectedKeys, setSelectedKeys] = useState(new Set(["1 Month"]));

    const selectedValue = useMemo(
        () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
        [selectedKeys]
    );


    const [count, setCount] = useState<number>(1);

    return (<>
        <Card className={`max-w-[300px] border-4 w-full ${colors[props.id - 1]}`}>
            <CardHeader className="">
                <p className="text-2xl font-bold">{props.name ?? ''}</p>
            </CardHeader>
            <Divider />
            <CardBody>
                <div className="flex gap-4 mb-2">
                    <p className="w-full text-black font-semibold"> Zeiterfassung </p>
                    <CheckboxIcon isSelected className="text-green-500 w-[1em]" />
                </div>
                <div className="flex gap-4 mb-2">
                    <p className="w-full text-black font-semibold"> Chat </p>
                    {props.chat == 1
                        ? <CheckboxIcon isSelected className="text-green-500 w-[1em]" />
                        : <p className="text-red-500 text-md">X</p>}
                </div>
                <div className="flex gap-4 mb-2">
                    <p className="w-full text-black font-semibold"> Abwendheit </p>
                    {props.absent == 1
                        ? <CheckboxIcon isSelected className="text-green-500 w-[1em]" />
                        : <p className="text-red-500 text-md">X</p>}
                </div>
                <div className="flex gap-4 mb-2">
                    <p className="w-full text-black font-semibold"> Urlaub </p>
                    {props.vocation == 1
                        ? <CheckboxIcon isSelected className="text-green-500 w-[1em]" />
                        : <p className="text-red-500 text-md">X</p>}
                </div>
                <div className="flex gap-4 mb-2">
                    <p className="w-full text-black font-semibold"> Rollen </p>
                    {props.id != 1
                        ? <CheckboxIcon isSelected className="text-green-500 w-[1em]" />
                        : <p className="text-red-500 text-md">X</p>}
                </div>
                <div className="flex gap-4 mb-2">
                    <p className="w-full text-black font-semibold"> Materialien </p>
                    {props.material == 1
                        ? <CheckboxIcon isSelected className="text-green-500 w-[1em]" />
                        : <p className="text-red-500 text-md">X</p>}
                </div>
                <div className="flex gap-4 mb-2">
                    <p className="w-full text-black font-semibold"> To-Do </p>
                    {props.todo == 1
                        ? <CheckboxIcon isSelected className="text-green-500 w-[1em]" />
                        : <p className="text-red-500 text-md">X</p>}
                </div>
            </CardBody>
            <Divider />
            <CardFooter>
                <div className="flex gap-4">
                    <Input 
                        type="number"
                        size="sm"
                        value={`${count}`}
                        onChange={(e)=>{ setCount(Number.parseInt(e.target.value))}}
                        classNames={{
                            base: 'border-2 rounded-xl',
                            input: 'h-full',
                            inputWrapper: 'h-full'
                        }} />

                    <Dropdown>
                        <DropdownTrigger>
                            <Button
                                variant="bordered"
                                className="capitalize"
                            >
                                {selectedValue}
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            aria-label="Single selection example"
                            variant="flat"
                            disallowEmptySelection
                            selectionMode="single"
                            selectedKeys={selectedKeys}
                            //@ts-ignore
                            onSelectionChange={setSelectedKeys}>
                            <DropdownItem className="text-black" key="1 Month">1 Month</DropdownItem>
                            <DropdownItem className="text-black" key="3 Month">3 Month</DropdownItem>
                            <DropdownItem className="text-black" key="6 Month">6 Month</DropdownItem>
                            <DropdownItem className="text-black" key="12 Month">12 Month</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </CardFooter>

            <Divider />
            <CardFooter>
                <Button className="bg-blue-600 w-full text-white text-lg h-[3em]">
                    Price € {props.price}
                </Button>
            </CardFooter>
        </Card>
    </>);
}
