

import {Card, CardHeader, CardBody, CardFooter, Divider, Chip, Button, Spinner} from "@nextui-org/react";
import { ArrowDownIcon, CalendarIcon, CheckIcon, EyeIcon, SyncIcon, TodoListIcon } from "./svg_components";
import { LocationData } from "../interface/response/dashboard_data";


interface DahboardCardProps{
    title?: string,
    value?: string,
    color?: string,
    
    multiValue?: string [],
    multiColor?: string [],

}

export const DashboardCard = (props: DahboardCardProps)=> {
    return (<>
        <div className="card p-4 rounded-xl md:max-w-[18em] max-w-[10em] w-full bg-white text-black shadow-lg">
            <h3 className="title">
                {props.title}
            </h3>
            
            {props.value && 
                <div className={`mt-3 p-2 w-full rounded-lg text-white ${props.color ? props.color : ''}`}>
                    {props.value}
                </div>
            }

            {props.multiValue && 
              <div className="flex gap-4">
                  {props.multiValue.map((e, i) => 
                    <div key={e} className={`mt-3 p-2 w-full rounded-lg text-white ${props.multiColor ? props.multiColor[i] : ''}`}>
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
    onPress?: ()=> void,
    locationData: LocationData,

}
export function DashboardAddressCard(props: DashboardAdressCardProps) {
    const total =  (((props?.locationData?.calculator?.quantity ?? 0) / 
    (props?.locationData?.calculator?.price ?? 0)) * 
    (props?.locationData?.calculator?.hours ?? 0)) - 
    (Number.parseInt(props.locationData.total_timer_count ?? '0') / 3600);
  return (
    <Button className="h-full max-w-[25em] sm:min-w-[20em]  p-0" onPress={props.onPress}>
        <Card className="w-full">
            <CardHeader className="flex  flex-wra gap-3">
                <div className="flex gap-3">
                    <Chip radius="sm" color="danger">{props.locationData?.inactive_employee_count ?? 0}</Chip>
                    <Chip radius="sm" className="bg-[#0EAD69] text-white">{props.locationData.active_employee_count}</Chip>
                    <Chip radius="sm" className="bg-[#E19842] text-white">{props.locationData.total_absent_employees}</Chip>
                    <Chip radius="sm" className="bg-[#CB42E1] text-white">{props.locationData.total_vacation_employees}</Chip>
                </div>

                <div className="flex bg-green-600 w-full rounded-md p-1 px-4">
                    <p className="text-md text-white">{Number.isNaN(total) ? '0' : total}</p>
                </div>
            </CardHeader>
            <Divider/>
            
            <CardBody>
                <p className="text-wrap" >{props.locationData.address ?? ''}</p>
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



