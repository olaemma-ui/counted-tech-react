import { useEffect, useState } from "react";
import { axiosInstance } from "../../service/axios_conf";
import { DahsboardLayout } from "../dashboard/layout/dashboard_layout";
import { Convert, Orders, PackageProps } from "../../interface/response/dto";
import { PackageComponent } from "../../_components/PackageComponent";
import { Card, CardBody, Divider, Spinner, Tab, Tabs } from "@nextui-org/react";
import { OrderCard } from "../../_components/components";

function PakcgaePage() {


    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [loadingMessage, setLoadingMessage] = useState<string>('');

    const [packages, setPackageList] = useState<PackageProps[]>();
    const [orders, setOrders] = useState<Orders[]>();

    const [subscription, setSubscription] = useState<PackageProps>();

    async function fetchPackages() {
        setIsLoading(true);
        setLoadingMessage('Fetching available packages.....')
        await axiosInstance.get('company/package-list')
            .then((response) => {
                const data = response.data.data;
                const list: PackageProps[] = [];

                data.forEach((element: any) => {
                    list.push(Convert.toPackageProps(JSON.stringify(element)))
                });

                setPackageList(list);
            }).catch((e) => e)
        setIsLoading(false);
        setLoadingMessage('')
    }


    async function fetchSubscription() {
        setIsLoading(true);
        setLoadingMessage('Fetching subscription.....')
        await axiosInstance.get('company/subscription')
            .then((response) => {
                const sub = Convert.toPackageProps(JSON.stringify(response.data.data.package))
                setSubscription(sub);
            }).catch((e) => e)
        setIsLoading(false);
        setLoadingMessage('')
    }

    async function fetchOrderHistory() {
        setLoadingMessage('Fetching order history.....')
        setIsLoading(true);
        await axiosInstance.get('company/order-history')
            .then((response) => {

                const data = response.data.data;
                const list: Orders[] = [];

                data.forEach((element: any) => {
                    list.push(Convert.toOrders(JSON.stringify(element)))
                });

                setOrders(list);
            }).catch((e) => e)
        setIsLoading(false);
        setLoadingMessage('')
    }


    useEffect(() => {
        fetchPackages()
        fetchSubscription()
        fetchOrderHistory()
    }, [])




    return (<>

        <DahsboardLayout>
            <Tabs aria-label="Options" className="bg-transparent w-full px-4" color="primary">
                <Tab key="packages" title="Packages" >
                    {isLoading && <>
                        <p className="text-white text-left px-4 my-2"> {loadingMessage} <Spinner size="sm" /></p>
                    </>}
                    <div className="px-4">
                        <Divider className="bg-gray-600 my-5" />
                    </div>
                    <div className="p-4 flex sm:flex-row flex-col gap-8 justify-between  items-center">
                        {packages?.map((e) => <PackageComponent key={e.id} {...e} activePackageId={subscription?.id} />)}
                    </div>

                </Tab>
                <Tab key="history" title="History">
                    <div className="px-4">
                        <Divider className="bg-gray-600 my-5" />
                    </div>
                    
                    <div className="flex gap-8 flex-wrap px-4 h-full overflow-y-auto fixed">
                        {orders?.map((order) => <OrderCard key={order.order_id} {...order}/>)}
                    </div>

                </Tab>
            </Tabs>

        </DahsboardLayout>

    </>);
}

export default PakcgaePage;