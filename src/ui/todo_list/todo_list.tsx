import { Button, Input, Spinner, CardHeader, Card, CardBody } from "@nextui-org/react";
import { CheckIcon, TrashIcon } from "../../_components/svg_components";


import '../style/dashboard.css'
import {useState, useEffect} from "react";
import { axiosInstance } from "../../service/axios_conf";
import { LocalStorageService } from "../../service/local_storage";
import { LocalStoragekey } from "../../_constants/enums";
import { toFormData } from "axios";
import { toast, Bounce, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import ConfirmDialog from "../dashboard/dialogs/confirm_dialog";
import { Todo, TodoConvert, TodoImage } from "../../interface/request/materials";


export const TodoListPage = ()=>{

    const [allTodoListener, setAllTodoListener] = useState<string>('');

    
    const [isLoading, setIsLoading] = useState<boolean>(true);
    
    const [isLoadingCreateTodo, setIsLoadingCreateTodo] = useState<boolean>(false);
    const [isLoadingAllTodo, setIsLoadingAllTodo] = useState<boolean>(false);
    const [isLoadingAllTodoImage, setIsLoadingAllTodoImage] = useState<boolean>(false);
    const [isLoadingDeleteTodo, setIsLoadingDeleteTodo] = useState<boolean>(false);

    const [deleteTodoDialogObject, setDeleteTodoDialogObject] = useState({
        isOpen: false,
        isYes: false,
        isNo : false,
        todoId: 0
    });
    
    
    const [todoName, setTodoName] = useState<string>();
    const [todos, setTodos] = useState<Todo[]>();
    const [todoImage, setTodoImage] = useState<TodoImage[]>();

    async function handleCreateTodo (){
        setIsLoadingCreateTodo(true);
        const addressId = LocalStorageService.getItem(LocalStoragekey.ADDRESS_ID);
        await axiosInstance.post(`company/todo`, toFormData({
            address_id: addressId,
            name: todoName,
        }))
        .then((response) => {
            if (response.data.status) {
                setAllTodoListener(`create-listen ${Math.random() * 1000}`);
                setTodoName('');
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
              }
        }).catch((e) => e)
        setIsLoadingCreateTodo(false);
    }


    async function handleDeleteTodo (){
        setIsLoadingDeleteTodo(true)
        await axiosInstance.get(`company/todos/${deleteTodoDialogObject.todoId}`)
        .then((response) => {
            if (response.data.status) {
                setAllTodoListener(`delete ${deleteTodoDialogObject.todoId}`);
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
            }
        }).catch((e) => e)

        setDeleteTodoDialogObject({
            ...deleteTodoDialogObject,
            isYes: true,
            isNo: false,
            isOpen: false,
        })
        

        setIsLoadingDeleteTodo(false)    
    }

            
    async function fetchAllTodos () {
        setIsLoadingAllTodo(true);
        const addressId = LocalStorageService.getItem(LocalStoragekey.ADDRESS_ID);
        await axiosInstance.get(`company/todo-list/${addressId}`)
        .then((response) => {
            const data: Todo[] = [];
            response.data.data.forEach((element: any) => {
                data.push(TodoConvert.toTodo(JSON.stringify(element)))
            });
            setTodos(data)
        }).catch((e) => e)
        setIsLoadingAllTodo(false);
    }

            
    async function fetchTodoImage (id: number) {
        setIsLoadingAllTodoImage(true);
        console.log({id});
        
        await axiosInstance.get(`company/todo-image/${id}`)
        // await axiosInstance.get(`company/todo-image/11`)
        .then((response) => {
            console.log(response.data);
            const data: TodoImage[] = [];
            response.data.data.forEach((element: any) => {
                data.push(TodoConvert.toTodoImage(JSON.stringify(element)))
            });
            
            setTodoImage(data);
        }).catch((e) => e)
        setIsLoadingAllTodoImage(false);
    }
    
    useEffect(()=>{
        fetchAllTodos();
    }, [allTodoListener])
    



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
            theme="dark"
        />
        <div className="py-5 flex items-center justify-center">
           <div className="flex flex-col sm:flex-row gap-8 sm:my-0 my-5 sm:p-8 p-4 rounded-xl bg-white m-4 w-full sm:h-[95vh] h-full overflow-auto">
                <div className="content flex flex-col gap-5 sm:w-[30em] w-full  sm:max-w-[18em]">
                    <div className="left w-full flex gap-2">
                        <Input 
                            size="md"
                            radius="sm"
                            placeholder="Todo name"
                            value={todoName}
                            isReadOnly={isLoadingCreateTodo}
                            onChange={(e)=>{
                                setTodoName(e.target.value);
                            }}
                            className="rounded-sm shadow-md bg-white w-full"
                        />                    
                        <Button
                            isIconOnly
                            className="rounded-md bg-[#0EAD69]"
                            isLoading={isLoadingCreateTodo}
                            onPress={handleCreateTodo}
                        >
                            <CheckIcon/>
                        </Button>
                    </div>

                    {/* <Divider className=" h-[0.15em] bg-[#4269E1]"/> */}
                    
                    <div className="flex flex-col gap-4">
                        {isLoadingAllTodo && <>
                            <div className="flex gap-4 items-center">
                                <p className="text-black">Fetching Update</p>
                                <Spinner size="sm"/>
                            </div>
                        </>}
                        {
                            todos?.map((elem) => {
                                return <div className="left w-full flex gap-2">
                                    <Input 
                                        size="md"
                                        radius="sm"
                                        placeholder="Todo name"
                                        value={elem.name}
                                        onClick={()=>{
                                            fetchTodoImage(elem.id);
                                        }}
                                        isReadOnly
                                        classNames={{
                                            input: 'cursor-pointer'
                                        }}
                                        className="rounded-sm shadow-lg w-full cursor-pointer"
                                    />                    
                                    <Button
                                        isIconOnly
                                        onPress={()=>{
                                            setDeleteTodoDialogObject({
                                                isOpen: true,
                                                todoId: elem.id,
                                                isYes: false,
                                                isNo: false,
                                            })
                                        }}
                                        className="rounded-md bg-[#AD0E0E]"
                                    >
                                        <TrashIcon width="20" height="20"/>
                                    </Button>
                                </div>
        
                            })
                        }
                    </div>
                </div>

                <div className="content w-full sm:m-0 my-5 pb-5 border-l border-[#4269E1] px-4">
                    
                  {!isLoadingAllTodoImage &&  todoImage?.map((todoData) =>{
                    return <Card className="py-4 max-w-[40em]">
                                <CardHeader className="pb-0 pt-2 px-4 flex items-start justify-between">
                                    <p className="text-tiny uppercase font-bold">{todoData.user.name} {todoData.user.surname}</p>
                                    <p className="text-tiny uppercase font-bold">{new Date(todoData.created_at).toLocaleDateString()}</p>
                                </CardHeader>
                                <CardBody className="overflow-visible py-2">
                                    <img
                                        className="w-full max-w-[40em] rounded-lg" 
                                        src={todoData?.image ? `${todoData.image && import.meta.env.VITE_COUNTEDT_TECH_COMPANY_IMAGE_URL}${todoData?.image}`: ''}
                                        alt="" />
                                </CardBody>
                            </Card>
                  })}

                  {isLoadingAllTodoImage &&  <>
                    <p className="text-black">Loading Todo Image <Spinner size='sm' /></p>
                  </>}

                  {todoImage?.length == 0 && !isLoadingAllTodoImage &&  <>
                    <p className="text-black">No Todo Image Uploaded </p>
                  </>}

                </div>
           </div>
        </div>

        { deleteTodoDialogObject.isOpen && <ConfirmDialog
            icon={<>
                <div className="bg-red-500 p-4 rounded-full w-fit mt-3">
                <TrashIcon width="30" height="30" />
                </div>
            </>}

            title="Delete Todo ?"
            message={'Are you sure you want to delete this todo ?'}
            onNo={()=>{
                setDeleteTodoDialogObject({
                    ...deleteTodoDialogObject,
                    isYes: false,
                    isNo: true,
                    isOpen: false,
                })
            }}
            isLoading={isLoadingDeleteTodo}
            onYes={()=>{
                handleDeleteTodo()
            }}
        />}
    </>);
}
