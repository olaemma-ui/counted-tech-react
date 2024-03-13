import { Avatar, Button, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Spinner, Checkbox, Textarea } from "@nextui-org/react";
import { ArrowDownIcon, ArrowUpIcon, CheckIcon, EraserIcon, MapPinIcon, PencilIcon, SwapIcon, TrashIcon, UploadImageIcon } from "../../_components/svg_components";
import {useAsyncList} from "@react-stately/data";


import '../style/dashboard.css'
import React from "react";
import { EditProfile } from "../dashboard/dialogs/edit_profile";


export const Chat = ()=>{

    
    const [isLoading, setIsLoading] = React.useState(true);
    

    return (<>
        <div className="py-5  h-[100dvh] flex items-center justify-center bg-[#F4F4F4]">
           <div className="sm:flex gap-8 sm:my-0 my-5 sm:p-8 p-4 m-4 w-full h-full overflow-auto">
              <div className="w-full max-w-[18em] flex flex-col gap-2 mb-5">
                    <Button className="justify-start flex gap-6 items-center card rounded-xl bg-white p-4 shadow-lg h-fit">
                        <Avatar 
                            className="w-[3em] h-[3em] cursor-pointer" 
                            color="danger" 
                            isBordered  
                            src="https://i.pravatar.cc/150?u=a04258114e29026702d" />


                            <div className="left">
                                <p className="text-black text-lg">
                                    David Kumar
                                </p>
                                <p className="text-gray-700 text-xs text-left">
                                    New Message from....
                                </p>
                            </div>
                            
                    </Button>
              </div>

              <div className="w-full">
                <div className="bg-white rounded-lg shadow-lg flex gap-4 items-center justify-center h-[4.7em]">
                    <Avatar 
                        className="w-[3em] h-[3em] cursor-pointer" 
                        color="danger" 
                        isBordered  
                        src="https://i.pravatar.cc/150?u=a04258114e29026702d" />


                        <div className="left">
                            <p className="text-black text-lg text-left">
                                David Kumar
                            </p>
                        </div>
                </div>

                <div className="h-[75dvh] w-full  my-5 overflow-auto">
                    <Message isSender={false}/>
                    <Message isSender={true}/>
                    <Message isSender={false}/>
                    <Message isSender={true}/>
                    <Message isSender={false}/>
                    <Message isSender={true}/>
                    <Message isSender={false}/>
                    <Message isSender={true}/>
                    <Message isSender={false}/>
                    <Message isSender={true}/>
                    <Message isSender={false}/>
                    <Message isSender={true}/>
                    <Message isSender={false}/>
                    <Message isSender={true}/>
                    <Message isSender={false}/>
                    <Message isSender={true}/>
                    <Message isSender={false}/>
                    <Message isSender={true}/>
                </div>

                <div className="text-box flex gap-4">
                <Textarea
                    isRequired
                    placeholder="Nachricht..."
                    size="sm"
                    maxRows={2}
                    radius="lg"
                    className="w-full shadow-lg"
                    />
                    <Button 
                        isIconOnly
                        className="bg-[#4269E1]">
                        <ArrowUpIcon/>
                    </Button>

                    <Button 
                        isIconOnly
                        className="bg-[#ADA70E]">
                        <UploadImageIcon/>
                    </Button>
                </div>
              </div>
           </div>
        </div>
    </>);
}


interface MessageProps {
    isSender: boolean
}

export const Message = (props: MessageProps)=>{
    return (<>
        <div className={`rounded-2xl text-[.8em] p-4 text-white ${props.isSender ? 'bg-[#7D7AFF] ml-auto' : 'bg-[#4269E1]'} my-5 text-left shadow-xl  min-h-[4em] h-fit w-full max-w-[65%]`}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Sunt doloremque amet provident esse excepturi deserunt pariatur harum, nulla, 
            repellat ducimus mollitia commodi officiis. Eaque obcaecati blanditiis facere excepturi nemo nam?

            <p className="text-[.7em] text-gray-300 text-right mt-3">04-08-2024</p>
        </div>
    </>);
}