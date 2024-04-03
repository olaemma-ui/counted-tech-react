
import appLogo from '../../assets/COUNTED Logo 1.svg';
import { Card, CardHeader, Divider, CardBody, CardFooter, Button, Spinner } from '@nextui-org/react';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { CheckIcon, CheckedSuccessSvg } from '../../_components/svg_components';
import { axiosInstance } from '../../service/axios_conf';
import { toFormData } from 'axios';
import { LocalStorageService } from '../../service/local_storage';
import { LocalStoragekey } from '../../_constants/enums';

export default function PaymentPage() {

    const navigate = useNavigate();


    let [searchParams, setSearchParams] = useSearchParams();

    const [loading, setLoading] = useState<boolean>(false);
    
    const orderSummary : any = LocalStorageService.getItem(LocalStoragekey.ORDER_SUMMARY);
    const packageName : any = LocalStorageService.getItem(LocalStoragekey.PACKAGE_NAME);
    const packagePrice : any = LocalStorageService.getItem(LocalStoragekey.PACKAGE_PRICE);
    const packageDetails : any = LocalStorageService.getItem(LocalStoragekey.PAKCAGE_DETAILS);
    
    async function completePayment(orderId: string) {
    setLoading(true);
        await axiosInstance.post('company/complete-payment', toFormData({
            order_id: orderId
        })).then((response) => response);

        setLoading(false);
    }
    
    useEffect(()=>{
        console.log({orderSummary});   
        completePayment(orderSummary?.data?.order_id)
    }, [])
    
    function handleOkClick() {
        LocalStorageService.removeItem(LocalStoragekey.ORDER_SUMMARY);
        LocalStorageService.removeItem(LocalStoragekey.PAKCAGE_DETAILS);
        LocalStorageService.removeItem(LocalStoragekey.PACKAGE_NAME);
        LocalStorageService.removeItem(LocalStoragekey.PACKAGE_PRICE);
        navigate('/dashboard')
    }

    return (<>
        <div className="flex h-[100vh]  items-center justify-center">
            <Card className="max-w-[400px] w-full">
                <CardHeader className="flex gap-3 justify-between">
                    <img src={appLogo} className="max-h-[5em] max-w-[5em]" />
                    {!loading &&  <p className="text-gray-800 text-lg font-semibold text-cente my-2 w-fit">
                        Payment Completed
                    </p>}
                </CardHeader>
                <Divider />
                <CardBody>

                    {loading && <div className='flex gap-4 items-center p-2 px-4 rounded-xl '>
                    <Spinner className='w-[6em] h-[6em]'/>
                    <p className="text-black text-lg w-full">
                        Completing Payment...
                    </p>
                    </div>}

                    { !loading &&
                        <div className='px-4'>
                        <div className="flex gap-4 justify-between flex-col items-center">
                            <CheckedSuccessSvg className='h-[3em] w-[3em]'/>
                        </div>

                    <div className="flex gap-4 mb-2">
                        <p className="w-full text-black font-semibold"> Package: </p>
                        <p className="w-full max-w-16 text-black"> {packageName} </p>
                    </div>

                    <div className="flex gap-4 mb-2">
                        <p className="w-full text-black font-semibold"> Months: </p>
                        <p className="w-full max-w-16 text-black"> {packageDetails.month} </p>
                    </div>
                    
                    <div className="flex gap-4 mb-2">
                        <p className="w-full text-black font-semibold"> Quantity: </p>
                        <p className="w-full max-w-16 text-black"> {packageDetails.quantity} </p>
                    </div>

                    <div className="flex gap-4 mb-2">
                        <p className="w-full text-black font-semibold"> Price: </p>
                        <p className="w-full max-w-16 text-black"> {packagePrice} </p>
                    </div>

                    <div className="flex gap-4 mb-2">
                        <p className="w-full text-black font-semibold"> Total Cost: </p>
                        <p className="w-full max-w-16 text-black"> € {Number.parseFloat(packagePrice) * Number.parseInt(packageDetails.month) * Number.parseInt(packageDetails.quantity)} </p>
                    </div>
                    </div>}
                </CardBody>
                <Divider />
                <CardFooter>
                    <Button onPress={handleOkClick} color='primary' className='w-full'>
                        OK
                    </Button>
                </CardFooter>
            </Card>
        </div>
    </>)
}
