import React, { useEffect, useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Checkbox, Input, Link, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Divider, Switch, Spinner} from "@nextui-org/react";
import { ArrowDownIcon } from "../../../_components/svg_components";
import { CreateLocationRequest, CreateLocationRequestBreak, CreateLocationRequestConvert, CreateLocationRequestTimetable, JobData } from "../../../interface/response/dashboard_data";
import { JobList } from "./job_list";
import { validateFields } from "../../../urils/validation";
import { convertDateFormat } from "../../../urils/utils";
import { toFormData } from "axios";
import { axiosInstance } from "../../../service/axios_conf";
import { Bounce, ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';



import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';



interface AddLocationProps{
    onClose: () => void,
    isOpen: boolean,
    jobList: JobData[]
}

export function AddLocation(props: AddLocationProps) {
  const {isOpen, onOpenChange} = useDisclosure({
    isOpen: props.isOpen,
    onClose: props.onClose,
  });


  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [timeTable, setTimeTable] = useState<CreateLocationRequestTimetable[]>([{
    day: '',
    end: '',
    start: '',
    status: false,
  }]);
  const [breakTime, setBreakTime] = useState<CreateLocationRequestBreak[]>([{
    day: '',
    end: '',
    start: ''
  }]);


  const [createLocationRequestData, setCreateLocationRequestData] = useState<CreateLocationRequest>();
  const [createLocationRequestDataError, setCreateLocationRequestDataError] = useState<CreateLocationRequest>();


  function handleAddTimeTable() {
    setTimeTable([...timeTable, {
      day: '',
      end: '',
      start: '',
      status: false,
    }]);
  }
  
  function handleRemoveTimeTable(index: number, val: boolean) {
    if(val === false){
      let t : CreateLocationRequestTimetable[] = timeTable;
      t[index].status = !t[index].status;
      setTimeTable([...t]);
    }
  }
  

  function handleAddBreak() {
    setBreakTime([...breakTime, {
      day: '',
      end: '',
      start: ''
    }]);
  }
  
  function handleRemoveBreak(index: number, val: boolean) {
    if(val === false){
      let t : CreateLocationRequestBreak[] = breakTime;
      t.splice(index, 1);
      setBreakTime([...t]);
    }
  }
  

  function handleOnchange(type: string, value: string, label: string, key: string) {
        
 
    const valid = validateFields(type, value, label);
    const err = createLocationRequestDataError;
    
    if(valid !== true){
      err[key] = valid;
      setCreateLocationRequestDataError({...err})
      return;
    }
    createLocationRequestData[key] = value;
    setCreateLocationRequestData({...createLocationRequestData})
    createLocationRequestDataError[key] = '';
    setCreateLocationRequestDataError({...createLocationRequestDataError})
  }

  // function isValid(){
  //     let valid : boolean = true;
  //     Object.entries(createLocationRequestDataError).forEach(([key, value]) => {
  //       console.log({key});
          
  //       if (value) valid = false;
  //     });
  //     // return valid && timeTable.length > 0 && breakTime.length > 0;
  //     return true;
  // }


  
  const [address, setAddress] = useState('');

  //Handle address selcted
  const handleSelect = async (selectedAddress : any) => {
    setAddress(selectedAddress);
    try {
      const results = await geocodeByAddress(selectedAddress);
      const latLng = await getLatLng(results[0]);
      setCreateLocationRequestData({
        ...createLocationRequestData,
        latitude: latLng.lat,
        longitude: latLng.lng,
        address: selectedAddress,
      });
      // Use latLng to trigger Google search
    } catch (error) {
      console.error('Error fetching geolocation:', error);
    }
  };


  async function handleSubmit() {
    const payload : object = {
      ...createLocationRequestData,
      breaks: JSON.stringify(breakTime),
      timetable: JSON.stringify(timeTable)
    };

    console.log({payload});
    

    // if(isValid()){
            
      setErrorMessage('');
      setIsLoading(true);

      await axiosInstance.post(
          'company/location', toFormData(payload),
      ).then((response : any) =>{
        console.log(response.data);
          if(typeof(response.data) === typeof('')){
            setErrorMessage(response.data);
          }
          else {
            
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
              props.onClose();
            }
          }

      })
      .catch((ex) => {
          console.log({ex});
          
          if(ex?.response?.data){

              const err = JSON.parse(ex?.response?.data);

              Object.entries(err).forEach(([key, value]) => {
                  createLocationRequestDataError[key] = value[0];
                  setCreateLocationRequestDataError({... createLocationRequestDataError});
              });

          }else setErrorMessage('Error occurred, try again')
      })

      setIsLoading(false);
      // }
    }

  

  
    
    const [selectedKeys, setSelectedKeys] = useState(new Set([]));
    const selectedValue = React.useMemo(
      () => {
        const value = Array.from(props.jobList.filter((job) => job.id == Array.from(selectedKeys)[0]))[0];
        setCreateLocationRequestData({
          ...createLocationRequestData,
          job_title_id: value?.id
        })
      return value;
    },
    [selectedKeys]
  );




  useEffect(() => {
    setIsLoading(false)
  }, [])
  

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
      {/* <Button onPress={onOpen} color="primary">Open Modal</Button> */}
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="top-center"
        backdrop="blur"
        isDismissable={false}
        size="2xl"
        scrollBehavior="inside"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1"></ModalHeader>
            <ModalBody>
                <PlacesAutocomplete
                  value={address}
                  onChange={setAddress}
                  onSelect={handleSelect}
                >
                  {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>
                      <Input
                        label="Location"
                        variant="flat"
                        isReadOnly={isLoading}
                        classNames={{
                            inputWrapper: `${createLocationRequestDataError.address && 'border border-red-600'}`
                        }}
                        
                        {...getInputProps({ placeholder: 'Enter location' })}
                        className="shadow-md m-0 rounded-3xl bg-[#FFFFFF]" />
                      
                      {address &&
                        <div className="border p-3 rounded-xl">
                          {loading ? <div><Spinner/></div> : null}
                          {suggestions.map((suggestion) => {
                            const style = {
                              backgroundColor: suggestion.active ? '#fafafa' : '#fff'
                            };
                            return (
                              <div className="text-black cursor-pointer p-1" {...getSuggestionItemProps(suggestion, { style })}>
                                {suggestion.description}
                              </div>
                            );
                          })}
                        </div>
                      }
                    </div>
                  )}
                </PlacesAutocomplete>
                
                    <small className="text-red-500 block mb-3 pl-3 text-left">
                        {createLocationRequestDataError.address}
                    </small>

                <div className="sm:flex gap-4">
                  <div className="w-full">
                    <Input
                      label="Radius"
                      variant="flat"
                      type="number"
                      isReadOnly={isLoading}
                      classNames={{
                          inputWrapper: `${createLocationRequestDataError.radius && 'border border-red-600'}`
                      }}
                      onChange={(e)=>{
                          handleOnchange(
                              '', 
                              e.target.value, 
                              'Radius', 
                              'radius'
                          )
                      }}
                      className="shadow-md rounded-3xl bg-[#FFFFFF]" />
                      <small className="text-red-500 block mb-3 pl-3 text-left">
                          {createLocationRequestDataError.radius}
                      </small>
                  </div>
                   <div className="w-full">
                    <Dropdown showArrow>
                        <DropdownTrigger >

                          <div className={`p-4 flex items-center gap-2 justify-between rounded-xl h-[3.1em] ${selectedValue? 'text-black': 'text-gray-500 text-sm font-normal'} ${createLocationRequestDataError.job_title_id && `border border-red-500 h-[4em]`} shadow-md w-full text-left `}>
                            {selectedValue ? selectedValue.name : 'Art der Arbeit'}
                            <ArrowDownIcon width="20" height="20" className="self-end justify-self-end" />
                          </div>
                        </DropdownTrigger>
                        <DropdownMenu 
                          aria-label="Single selection example"
                          variant="flat"
                          disallowEmptySelection
                          selectionMode="single"
                          selectedKeys={selectedKeys}
                          //@ts-ignore
                          onSelectionChange={setSelectedKeys}
                        >
                        {props.jobList.map((e)=> 
                              <DropdownItem 
                                  key={e.id} 
                                  className="text-black">
                                      {e.name}
                              </DropdownItem>)}
                        </DropdownMenu>
                      </Dropdown>
                      <small className="text-red-500 block mb-3 pl-3 text-left">
                          {createLocationRequestDataError.job_title_id}
                      </small>
                  </div>
                </div>

                <Divider className="my-2 h-[0.12em] bg-[#4269E1]"/>

                <p className="text-black"> Datum </p>
                <div className="sm:flex gap-4 ">
                 
                <div className="w-full">
                  <Input
                    label="Startdatum"
                    variant="flat"
                    type="date"
                    isReadOnly={isLoading}
                    classNames={{
                        inputWrapper: `${createLocationRequestDataError.start_date && 'border border-red-600'}`
                    }}
                    onChange={(e)=>{
                        handleOnchange(
                            '', 
                            e.target.value, 
                            'Enddatum', 
                            'start_date'
                        )
                    }}
                    className="shadow-md rounded-3xl bg-[#FFFFFF]" />
                    <small className="text-red-500 block mb-3 pl-3 text-left">
                        {createLocationRequestDataError.start_date?.toString()}
                    </small>
                  </div>
                 
                <div className="w-full">
                  <Input
                    label="Enddatum"
                    variant="flat"
                    type="date"
                    isReadOnly={isLoading}
                    classNames={{
                        inputWrapper: `${createLocationRequestDataError.end_date && 'border border-red-600'}`
                    }}
                    onChange={(e)=>{
                        handleOnchange(
                            '', 
                            e.target.value, 
                            'Enddatum', 
                            'end_date'
                        )
                    }}
                    className="shadow-md rounded-3xl bg-[#FFFFFF]" />
                    <small className="text-red-500 block mb-3 pl-3 text-left">
                        {createLocationRequestDataError.end_date?.toString()}
                    </small>
                  </div>
                  <div className="w-full">
                    <Input
                        label="Erinnerung"
                        variant="flat"
                        type="date"
                        isReadOnly={isLoading}
                        classNames={{
                            inputWrapper: `${createLocationRequestDataError.memory && 'border border-red-600'}`
                        }}
                        onChange={(e)=>{
                            handleOnchange(
                                '', 
                                e.target.value, 
                                'Erinnerung', 
                                'memory'
                            )
                        }}
                        className="shadow-md rounded-3xl bg-[#FFFFFF]" />
                        <small className="text-red-500 block mb-3 pl-3 text-left">
                            {createLocationRequestDataError.memory?.toString()}
                        </small>
                  </div>
                </div>
              
                <Divider className="my-2 h-[0.12em] bg-[#4269E1]"/>
                
                <div className="flex gap-4 justify-evenly">
                  <p className="text-black w-full text-left"> Startzeit </p>
                  <p className="text-black w-full text-left"> Endzeit </p>
                  <p className="text-black w-ful text-left mr-12"> Wochentag </p>
                </div>

                {timeTable.map((v) => <TimeTable 
                    key={1111 * Math.random() + 999}
                    timeTable={v}
                    onRemove={(val)=>{
                      handleRemoveTimeTable(timeTable.indexOf(v), val)
                    }}
                  />
                )}

                <Button 
                  size="sm" 
                  onPress={handleAddTimeTable} 
                  isIconOnly 
                  className="text-3xl h-[40px] p-5  pt-4 text-white bg-[#4269E1]">
                  +
                </Button>
                <Divider className="my-2 h-[0.12em] bg-[#4269E1]"/>
                
                <div className="flex gap-16 justify-between max-w-[22em]">
                  <p className="text-black w-full"> Pausenstart </p>
                  <p className="text-black w-ful"> Pausenende </p>
                </div>


                {breakTime.map((v) => <BreakTable 
                    key={1111 * Math.random() + 999}
                    breakTable={v}
                    onRemove={(val)=>{
                      handleRemoveBreak(breakTime.indexOf(v), val)
                    }}
                  />
                )}
               
                <Button 
                  size="sm" 
                  onPress={handleAddBreak} 
                  isIconOnly 
                  className="text-3xl h-[40px] p-5  pt-4 text-white bg-[#4269E1]">
                  +
                </Button>
                <Divider className="my-2 h-[0.12em] bg-[#4269E1]"/>


                <Switch
                    isSelected={active}
                    classNames={{
                      label: "text-small",
                    }}
                    onChange={() => {
                      setActive(!active)
                    }}
                  >
                    Baustellenberechnung
                </Switch>
                    
                {active && <div className="py-2 px-1">
                    <p className="text-black text-right"> Stunden: 6936 </p>

                  <div className="flex items-center gap-2">
                  <Input
                      label="Einheit [Menge]"
                      variant="flat"
                      type="number"
                      isReadOnly={isLoading}
                      classNames={{
                          inputWrapper: `${createLocationRequestDataError.quantity && active && 'border border-red-600'}`
                      }}
                      onChange={(e)=>{
                          handleOnchange(
                              '', 
                              e.target.value, 
                              'Enddatum', 
                              'quantity'
                          )
                      }}/>
                      <p className="text-black text-3xl">/</p>
                  <Input
                      label="Preis pro"
                      variant="flat"
                      type="number"
                      isReadOnly={isLoading}
                      classNames={{
                          inputWrapper: `${createLocationRequestDataError.price && active && 'border border-red-600'}`
                      }}
                      onChange={(e)=>{
                          handleOnchange(
                              '', 
                              e.target.value, 
                              'Preis pro', 
                              'price'
                          )
                      }}/>
                    <p className="text-black text-3xl">*</p>
                  <Input
                      label="€ pro Stunde"
                      variant="flat"
                      type="number"
                      isReadOnly={isLoading}
                      classNames={{
                          inputWrapper: `${createLocationRequestDataError.hours && active && 'border border-red-600'}`
                      }}
                      onChange={(e)=>{
                          handleOnchange(
                              '', 
                              e.target.value, 
                              '€ pro Stunde', 
                              'hours'
                          )
                      }}/>
                  </div>
                </div>}
              </ModalBody>
              <ModalFooter>
                <Button 
                  color="primary" 
                  isLoading={isLoading} 
                  className="w-full bg-[#4269E1]" 
                  onPress={handleSubmit}>
                  erstellen
                </Button>
              </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}


const TimeTable = (props : {onRemove: (value: boolean)=> void, timeTable: CreateLocationRequestTimetable})=> {

  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));

  const selectedValue = React.useMemo(
    () => {
      const v = Array.from(selectedKeys).join(", ").replaceAll("_", " ")
      props.timeTable.day = v;
      return v;
    },
    [selectedKeys]
  );

  const [tbl, setTbl] = useState(props.timeTable);

  return (<div className="flex gap-4 items-center">
  <Input
      label="Startdatum"
      variant="flat"
      type="date"
      size="sm"
      value={tbl.start ? tbl.start : ''}
      onChange={(v)=>{
        setTbl({
          ...tbl,
          start: v.target.value
        })
        props.timeTable.start = convertDateFormat(v.target.value);
      }}
      className="shadow-md rounded-xl mb-3"
      />
  <Input
      label="Enddatum"
      variant="flat"
      type="date"
      size="sm"
      value={tbl.end ? tbl.end : ''}
      onChange={(v)=>{
        setTbl({
          ...tbl,
          end: v.target.value
        })
        props.timeTable.end = convertDateFormat(v.target.value);
      }}
      className="shadow-md rounded-xl mb-3"
      />
 
    <Dropdown>
      <DropdownTrigger>
        <Button 
          variant="bordered" 
          className="capitalize text-black shadow-md w-[8em]"
        >
          {selectedValue ? selectedValue: props.timeTable.day}
        </Button>
      </DropdownTrigger>
      <DropdownMenu 
        aria-label="Single selection example"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selectedKeys}
        //@ts-ignore
        onSelectionChange={setSelectedKeys}
      >
        <DropdownItem className="text-black"  key="week">Week</DropdownItem>
        <DropdownItem  className="text-black" key="saturday">Saturday</DropdownItem>
        <DropdownItem className="text-black"  key="sunday">Sunday</DropdownItem>
      </DropdownMenu>
    </Dropdown>
    <Checkbox size="lg" onChange={(e) => {
      props.onRemove(e.target.checked);
    }}/>

</div>);
}

const BreakTable = (props : {onRemove: (value: boolean)=> void, breakTable: CreateLocationRequestBreak})=> {

  const [selectedKeys, setSelectedKeys] = React.useState(new Set(['week']));

  const selectedValue = React.useMemo(
    () => {
      
      const v = Array.from(selectedKeys).join(", ").replaceAll("_", " ")
      props.breakTable.day = v;
      return v;
    },
    [selectedKeys]
  );

  const [brkTbls, setBrkTbl] = useState<CreateLocationRequestBreak>(props.breakTable);


  return (<div className="flex gap-4 items-center">
  <Input
      label="Pausenstart"
      variant="flat"
      type="time"
      size="sm"
      value={brkTbls.start ? brkTbls.start : ''}
      onChange={(v)=>{
        setBrkTbl({
          ...brkTbls,
          start: v.target.value
        })
        props.breakTable.start = v.target.value;
      }}
      className="shadow-md rounded-xl mb-3"
      />
  <Input
      label="Pausenende"
      variant="flat"
      type="time"
      size="sm"
      value={brkTbls.end ? brkTbls.end : ''}
      onChange={(v)=>{
        setBrkTbl({
          ...brkTbls,
          end: v.target.value
        })
        props.breakTable.end = v.target.value;
      }}
      className="shadow-md rounded-xl mb-3"
      />

    <Dropdown>
      <DropdownTrigger>
        <Button 
          variant="bordered" 
          className="capitalize text-black shadow-md"
        >
          {selectedValue ? selectedValue: props.breakTable.day}
        </Button>
      </DropdownTrigger>
      <DropdownMenu 
        aria-label="Single selection example"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selectedKeys}
        //@ts-ignore
        onSelectionChange={setSelectedKeys}
      >
        <DropdownItem className="text-black"  key="week">Week</DropdownItem>
        <DropdownItem  className="text-black" key="saturday">Saturday</DropdownItem>
        <DropdownItem className="text-black"  key="sunday">Sunday</DropdownItem>
      </DropdownMenu>
    </Dropdown>
    {/* <Checkbox defaultSelected size="lg" onChange={(e) => {
      props.onRemove(e.target.checked);
    }}/> */}

</div>);
}