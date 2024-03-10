
import React from "react";
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Chip, Button} from "@nextui-org/react";
import { CalendarIcon, EyeIcon, SettingsIcon, SyncIcon, TodoListIcon } from "./svg_components";


interface DahboardCardProps{
    title?: string,
    value?: string,
    color?: string,
    
    multiValue?: string [],
    multiColor?: string [],

}

export const DashboardCard = (props: DahboardCardProps)=> {
    return (<>
        <div className="card p-4 rounded-md md:max-w-[16em] max-w-[10em] w-full bg-white text-black shadow-lg">
            <h3 className="title">
                {props.title}
            </h3>
            
            {props.value && 
                <div className={`mt-3 p-2 w-full rounded-lg ${props.color ? props.color : ''}`}>
                    {props.value}
                </div>
            }

            {props.multiValue && 
              <div className="flex gap-4">
                  {props.multiValue.map((e, i) => 
                    <div className={`mt-3 p-2 w-full rounded-lg ${props.multiColor ? props.multiColor[i] : ''}`}>
                        {props.multiValue ? props.multiValue[i] : ''}
                    </div>)}
              </div>
            }
        </div>
    </>);
}


interface DashboardAdressCardProps{
    onMaterialsClick?: ()=> void,
    onEyeClick?: ()=> void,
    onCalendarClick?: ()=> void,
    onSyncClick?: ()=> void,
    onPress?: ()=> void
}
export function DashboardAddressCard(props: DashboardAdressCardProps) {
  return (
    <Button className="h-full p-0" onPress={props.onPress}>
        <Card className="max-w-[400px]">
            <CardHeader className="flex gap-3">
                <div className="flex gap-3">
                    <Chip radius="sm" color="primary">2</Chip>
                    <Chip radius="sm" color="success">3</Chip>
                    <Chip radius="sm" color="warning">8</Chip>
                    <Chip radius="sm" color="danger">4</Chip>
                </div>

                <div className="flex bg-green-600 w-full rounded-md p-1 px-4">
                    <p className="text-md text-white">NextUI</p>
                </div>
            </CardHeader>
            <Divider/>
            
            <CardBody>
                <p>Address</p>
            </CardBody>

            <Divider/>
            <CardFooter className="flex flex-wrap gap-4">
                <Button onClick={props.onMaterialsClick} isIconOnly className="bg-[#4269E1]  rounded-md">
                    <TodoListIcon width="20" height="20"/>
                </Button>
                <Button isIconOnly onClick={props.onSyncClick} className="bg-[#4269E1]  rounded-md">
                    <SyncIcon width="20" height="20"/>
                </Button>
                <Button isIconOnly onClick={props.onCalendarClick} className="bg-[#4269E1]  rounded-md">
                    <CalendarIcon width="20" height="20"/>
                </Button>
                <Button isIconOnly onClick={props.onEyeClick} className="bg-[#4269E1] rounded-md">
                    <EyeIcon width="20" height="20"/>
                </Button>
            </CardFooter>
            
        </Card>
    </Button>
  );
}

