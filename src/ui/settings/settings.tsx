import { Button } from "@nextui-org/react";
import { DahsboardLayout } from "../dashboard/layout/dashboard_layout";
import { useState } from "react";
import { TrashIcon } from "../../_components/svg_components";
import ConfirmDialog from "../dialogs/confirm_dialog";
import { useNavigate } from "react-router-dom";
import { EmployerDetails } from "../dialogs/employer_details";
import { EditEmployerProfile } from "../dialogs/edit_employer_profile";
import ChangePassword from "../dialogs/change_password";
import ImpersumDialog from "../dialogs/impersum";
import AllgemeineuDialog from "../dialogs/allgemeine_dialog";
import DateenschuDialog from "../dialogs/dateenschu_dialog";
import { axiosInstance } from "../../service/axios_conf";
import { LocalStorageService } from "../../service/local_storage";


function SettingsPage() {

    const [confirmLogoutDialog, setCofirmLogoutDialog] = useState({
        isOpen: false,
        isYes: false,
        isNo : false,
        isLoading: false,
        // jobId: '',
    });
    
    const [confirmDeleteAccountDialog, setCofirmDeleteAccountDialog] = useState({
        isOpen: false,
        isYes: false,
        isNo : false,
        isLoading: false,
        // jobId: '',
    });
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [viewProfile, setIsViewProfile] = useState<boolean>(false);
    const [changePassword, setChangePassword] = useState<boolean>(false);
    const [editProfile, setEditProfile] = useState<boolean>(false);
    
    const [impressumDialog, setImpressumDialog] = useState<boolean>(false);
    const [allgemeine, setAllgemeine] = useState<boolean>(false);
    const [dateenschu, setDateenschu] = useState<boolean>(false);


    
    const navigate = useNavigate();

      
    async function onLogOut () {
        setCofirmLogoutDialog({
            ...confirmLogoutDialog,
            isLoading: true,
        });
        await axiosInstance.get('auth/logout')
        .then((response) => {
            if(response.data.status){
                LocalStorageService.clear();
            }
        })
        setCofirmLogoutDialog({
            ...confirmLogoutDialog,
            isLoading: true,
        });
    }


    function handlePackageClick() {
        navigate('/dashboard/packages')
    }



    return ( <>
        <DahsboardLayout>
            <div className="w-full h-[100vh] p-4">
                <p className="text-xl text-white my-5">
                    Uber mich
                </p>
                <div className="flex sm:flex-row flex-col gap-8 my-5">
                    <Button onPress={()=>{
                        setIsViewProfile(true);
                    }} className="bg-white h-[4em] w-full">
                        Profildetails        
                    </Button>    

                    <Button onPress={()=>{
                        setEditProfile(true);
                    }} className="bg-white h-[4em] w-full">
                        Profile bearbieten
                    </Button>    
                </div>
                <Button onPress={handlePackageClick} className="bg-white h-[4em] w-full">
                    Packet
                </Button>    
            
                <p className="text-xl text-white my-5">
                    Einstellungen
                </p>
                
                <div className="flex sm:flex-row flex-col gap-8 my-5">
                    <Button onPress={()=> {setChangePassword(true)}} className="bg-white h-[4em] w-full">
                        Passwort andern
                    </Button>    

                    <Button onPress={()=>{
                        setCofirmDeleteAccountDialog({
                            isNo: false,
                            isYes: false,
                            isOpen: true,
                            isLoading: false,
                        })
                    }} className="bg-white h-[4em] w-full">
                        Account loschen
                    </Button>    
                </div>
                <div className="flex sm:flex-row flex-col gap-8 my-5">
                    <Button onPress={()=>{
                        setAllgemeine(true);
                    }} className="bg-white h-[4em] w-full">
                        Allgemeine Geschaftsbedingung      
                    </Button>    

                    <Button onPress={()=>{
                        setDateenschu(true);
                    }} className="bg-white h-[4em] w-full">
                        Datenschutzerklarung
                    </Button>    
                </div>
                <div className="flex sm:flex-row flex-col gap-8 my-5">
                    <Button onPress={()=>{
                        setImpressumDialog(true);
                    }} className="bg-white h-[4em] w-full">
                        Impressum 
                    </Button>    

                    <Button onPress={()=>{
                          setCofirmLogoutDialog({
                            isNo: false,
                            isYes: false,
                            isOpen: true,
                            isLoading: false,
                        })
                    }} className="bg-white h-[4em] w-full text-red-500">
                        Abmeiden
                    </Button>    
                </div>
            </div>        
        </DahsboardLayout>
        
        {viewProfile && <EmployerDetails 
            onClose={()=> {setIsViewProfile(false)}} 
            isOpen={viewProfile} />}
        
        {impressumDialog && <ImpersumDialog
            onClose={()=> {setImpressumDialog(false)}} 
            isOpen={impressumDialog} />}

        {allgemeine && <AllgemeineuDialog
            onClose={()=> {setAllgemeine(false)}} 
            isOpen={allgemeine} />}

        {dateenschu && <DateenschuDialog
            onClose={()=> {setDateenschu(false)}} 
            isOpen={dateenschu} />}
        
        {changePassword && <ChangePassword 
            onClose={()=> {setChangePassword(false)}} 
            isOpen={changePassword} />}
        
        {editProfile && <EditEmployerProfile 
            onClose={()=> {setEditProfile(false)}} 
            isOpen={editProfile} />}
        
        { confirmLogoutDialog.isOpen && <ConfirmDialog
            icon={<>
              <div className="bg-red-500 p-4 rounded-full w-fit mt-3">
                <TrashIcon width="30" height="30" />
              </div>
            </>}

            title="Logo ut ?"
            message={'Are you sure you want to Logout ?'}
            onNo={()=>{
                setCofirmLogoutDialog({
                    isYes: false,
                    isNo: true,
                    isOpen: false,
                    isLoading: false,
                    // jobId: '',
                })
            }}
            isLoading={confirmLogoutDialog.isLoading}
            onYes={onLogOut}
        />}
     
        { confirmDeleteAccountDialog.isOpen && <ConfirmDialog
            icon={<>
              <div className="bg-red-500 p-4 rounded-full w-fit mt-3">
                <TrashIcon width="30" height="30" />
              </div>
            </>}

            title="Delete account ?"
            message={'Do you really want to Delete your Account?'}
            onNo={()=>{
                setCofirmDeleteAccountDialog({
                    isYes: false,
                    isNo: true,
                    isOpen: false,  
                    isLoading: false,
                    // jobId: '',  
                })
            }}
            isLoading={confirmDeleteAccountDialog.isLoading}
            onYes={()=>{}}
        />}
    </> );
}

export default SettingsPage;