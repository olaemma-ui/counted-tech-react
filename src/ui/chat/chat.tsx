import { Avatar, Button, Spinner, Textarea } from "@nextui-org/react";
import { ArrowUpIcon, UploadImageIcon } from "../../_components/svg_components";


import '../style/dashboard.css'
import { useEffect, useRef, useState } from "react";
import { Convert, EmployeeData, MessageBody, MessageRequest } from "../../interface/response/dto";
import { axiosInstance } from "../../service/axios_conf";
import { toFormData } from "axios";
import { toast, Bounce, ToastContainer } from "react-toastify";
import { DahsboardLayout } from "../dashboard/layout/dashboard_layout";


export const Chat = ()=>{

    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingMessage, setIsLoadingMessage] = useState(true);
    const [chatList, setChatList] = useState<EmployeeData[]>();
    const [selectedChat, setSelectedChat] = useState<EmployeeData>();
    const [messageBody, setMessageBody] = useState<MessageBody[]>();
    const [messageListener, setMessageListener] = useState<string>();
    const [sendMessageLoading, setSendMessageLoading] = useState<boolean>();

    const [messageRequest, setMessageRequest] = useState<MessageRequest>();
    
    async function fetChatList () {
        setIsLoading(true)
        await axiosInstance.get('company/chat-list')
        .then((response) => {
            const data = response.data.data;
            const list : EmployeeData[] = [];

            console.log({data});
            

            data.forEach((element : any) => {
                list.push(Convert.toEmployeeData(JSON.stringify(element)))
            });
            setChatList(list);
        })
        setIsLoading(false)

    }

    
    const divRef = useRef(null);

    
    async function fetChatDetails (id: number) {
        setIsLoadingMessage(true)
        await axiosInstance.get(`company/chat/${id}`)
        .then((response) => {
            const data = response.data.data;
            const list : MessageBody[] = [];

            console.log({data});
            

            data.forEach((element : any) => {
                list.push(Convert.toMessageBody(JSON.stringify(element)))
            });
            setMessageBody(list);
        })
        setIsLoadingMessage(false)
    }
    
    async function handleSendMessage () {
        // setEmployeeId(id)
        // setEmployeeId(id)
        setSendMessageLoading(true)
        console.log({
            ...messageRequest,
            recipient_id: selectedChat.id,
        });
        
        await axiosInstance.post(`company/chat`, toFormData({
            ...messageRequest,
            recipient_id: selectedChat.id,
        }))
        .then((response) => {
            setMessageRequest({
                content: '',
                image: null,
                recipient_id: ''
            })
            setImage(null);
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
            setSendMessageLoading(false)
            fetChatDetails(selectedChat.id);
        })
        setSendMessageLoading(false)
    }

    const [image, setImage] = useState(null)

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
        }
    }

    useEffect(() => {
      fetChatList()
    }, [])
    


    return (<>
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
            theme="dark"/>

         <DahsboardLayout>
            <div className="py-5 rounded-xl sm:h-[80vh] flex items-center justify-center bg-[#F4F4F4]">
                <div className="sm:flex gap-8 sm:my-0 my-5 sm:p-8 p-4 m-4 w-full h-full overflow-auto">
                    <div className="w-full max-w-[18em] flex flex-col gap-2 mb-5">
                            {chatList?.length == 0 && !isLoading && <p className="text-black">
                                No Chat / Messages    
                            </p>}
                            {isLoading && <p className="text-black">
                                Loading Chat List <Spinner size='sm'/>
                            </p>}
                            {
                                chatList?.map((chat) =>{
                                    return <Button 
                                        onPress={(e)=>{
                                            setMessageBody([]);
                                            setSelectedChat(chat);
                                            fetChatDetails(chat.id);
                                        }}
                                        className="justify-start flex gap-6 items-center card rounded-xl bg-white p-4 shadow-lg h-fit">
                                        <Avatar 
                                            className="w-[3em] h-[3em] cursor-pointer" 
                                            color="danger" 
                                            isBordered  
                                            src={`${import.meta.env.VITE_COUNTEDT_TECH_COMPANY_IMAGE_URL}${chat.image}`} />
        
        
                                            <div className="left">
                                                <p className="text-black text-lg">
                                                    {chat.surname}
                                                    {chat.name}
                                                </p>
                                            </div>
                                            
                                    </Button>
                                })
                            }
                    </div>

                    <div className="w-full flex flex-col">
                        <div className="bg-white rounded-lg shadow-lg flex gap-4 items-center justify-center h-[4.7em]">
                            {selectedChat && <>
                                    <Avatar 
                                        className="w-[3em] h-[3em] cursor-pointer" 
                                        color="danger" 
                                        isBordered  
                                        src={`${import.meta.env.VITE_COUNTEDT_TECH_COMPANY_IMAGE_URL}${selectedChat.image}`} />


                                    <div className="left">
                                        <p className="text-black text-lg text-left">
                                            {selectedChat.surname} {selectedChat.name}
                                        </p>
                                    </div>
                            </>}
                        </div>

                        <div className="h-[68dvh]- h-full w-full  my-5 overflow-auto">
                        

                            {<div ref={divRef}>
                                {messageBody?.map((message) => <Message 
                                    date={message.created_at}
                                    image={message.image}
                                    message={message.content}
                                    isSender={message.sender_id != selectedChat?.id}/>
                                    )}
                                {isLoadingMessage && <Spinner size='sm'/>}
                            </div>}

                            <div id="bottom"/>
                        </div>

                        {image && <div className="p-2 rounded bg-white shadow-lg">
                            <img src={image} alt="" className="w-[10em] h-[10em] rounded" />
                        </div>}
                        <div className="text-box flex gap-4">
                            <Textarea
                                isRequired
                                placeholder="Nachricht..."
                                size="sm"
                                maxRows={2}
                                radius="lg"
                                className="w-full shadow-lg"
                                value={messageRequest?.content}
                                onChange={(e) => {
                                    setMessageRequest({
                                        ...messageRequest,
                                        content: e.target.value,
                                    })
                                }}/>

                                <Button 
                                    isIconOnly
                                    onPress={handleSendMessage}
                                    isLoading={sendMessageLoading}
                                    className="bg-[#4269E1] mt-3">
                                    <ArrowUpIcon/>
                                </Button>

                                <label htmlFor="image" className="w-fit h-fit bg-[#ADA70E] p-2 rounded-xl mt-3 cursor-pointer">
                                <input type="file" className="invisible hidden" id="image" 
                                    onChange={(e) => {
                                        setMessageRequest({
                                            ...messageRequest,
                                            image: e.target.files[0],
                                        })
                                        onImageChange(e);}} />
                                        <UploadImageIcon/>
                                </label>
                        </div>
                    </div>
                </div>
            </div>
         </DahsboardLayout>
    </>);
}


interface MessageProps {
    isSender?: boolean,
    message?: string,
    image?: string,
    date?: Date,
}

export const Message = (props: MessageProps)=>{
    return (<>
        <div className={`rounded-2xl text-[.8em] p-4 text-white ${props.isSender ? 'bg-[#7D7AFF] ml-auto' : 'bg-[#4269E1]'} my-5 text-left shadow-xl  min-h-[4em] h-fit w-full sm:max-w-[65%]`}>
            {props.image && <img 
                src={`${import.meta.env.VITE_COUNTEDT_TECH_COMPANY_IMAGE_URL}${props.image}`}
                className="w-full h-[full] mb-4 rounded-xl" 
                alt="" />}
            {props.message ?? ''}
            <p className="text-[.7em] text-gray-300 text-right mt-3">{new Date(props.date).toLocaleDateString()} {new Date(props.date).toLocaleTimeString()}</p>
        </div>
    </>);
}