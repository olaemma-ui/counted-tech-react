import { Button, Divider, Input, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Spinner } from "@nextui-org/react";
import { CheckIcon, TrashIcon } from "../../_components/svg_components";
import {useAsyncList} from "@react-stately/data";


import '../style/dashboard.css'
import {useState, useMemo, useEffect} from "react";
import { axiosInstance } from "../../service/axios_conf";
import { LocalStorageService } from "../../service/local_storage";
import { LocalStoragekey } from "../../_constants/enums";
import { toFormData } from "axios";
import { toast, Bounce, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import ConfirmDialog from "../dashboard/dialogs/confirm_dialog";
import { Todo, TodoConvert } from "../../interface/request/materials";


export const TodoListPage = ()=>{

    const [allTodoListener, setAllTodoListener] = useState<string>('');

    
    const [isLoading, setIsLoading] = useState<boolean>(true);
    
    const [isLoadingCreateTodo, setIsLoadingCreateTodo] = useState<boolean>(false);
    const [isLoadingAllTodo, setIsLoadingAllTodo] = useState<boolean>(false);
    const [isLoadingDeleteTodo, setIsLoadingDeleteTodo] = useState<boolean>(false);

    const [deleteTodoDialogObject, setDeleteTodoDialogObject] = useState({
        isOpen: false,
        isYes: false,
        isNo : false,
        todoId: 0
    });
    
    
    const [todoName, setTodoName] = useState<string>();
    const [todos, setTodos] = useState<Todo[]>();

    async function handleCreateTodo (){
        setIsLoadingCreateTodo(true);
        const addressId = LocalStorageService.getItem(LocalStoragekey.ADDRESS_ID);
        await axiosInstance.post(`company/todos`, toFormData({
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
        await axiosInstance.delete(`company/todos/${deleteTodoDialogObject.todoId}`)
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
           <div className="flex flex-col md:flex-row gap-8 sm:my-0 my-5 sm:p-8 p-4 rounded-xl bg-white m-4 w-full sm:h-[95vh] h-full overflow-auto">
                <div className="content flex md:flex-col flex-row gap-5 sm:w-[30em] w-full sm:max-w-full max-w-[18em]">
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

                    <Divider className=" h-[0.15em] bg-[#4269E1]"/>
                    
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
                                        isReadOnly
                                        className="rounded-sm shadow-lg w-full"
                                    />                    
                                    <Button
                                        isIconOnly
                                        isLoading={isLoadingDeleteTodo}
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

                <div className="content w-full sm:m-0 my-5 pb-5 border-l border-[#4269E1]">
                    

                </div>
           </div>
        </div>

        { deleteTodoDialogObject.isOpen && <ConfirmDialog
            icon={<>
                <div className="bg-red-500 p-4 rounded-full w-fit mt-3">
                <TrashIcon width="30" height="30" />
                </div>
            </>}

            title="Delete Job Title ?"
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
