import { useEffect, useState } from "react";
import { axiosInstance } from "../../service/axios_conf";
import { DahsboardLayout } from "../dashboard/layout/dashboard_layout";
import { Convert, PackageProps } from "../../interface/response/dto";
import { PackageComponent } from "../../_components/PackageComponent";
import { Divider, Spinner } from "@nextui-org/react";

function PakcgaePage() {
    

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [packages, setPackageList] = useState<PackageProps[]>();
    
    async function fetchPackages () {
        setIsLoading(true);
        await axiosInstance.get('company/package-list')
        .then((response) => {
        const data = response.data.data;
        const list : PackageProps[] = [];
        
            data.forEach((element : any) => {
                list.push(Convert.toPackageProps(JSON.stringify(element)))
            });
            
            setPackageList(list);
        }).catch((e) => e)
        setIsLoading(false);
    }


    useEffect(() => {
      fetchPackages()
    }, [])
    

    
    
    return ( <>

        <DahsboardLayout>
            <h1 className="text-white text-left text-xl px-4">
                Packages                 
            </h1>
                {isLoading && <>
                    <p className="text-white text-left px-4 my-2">Fetching Available Packages <Spinner size="sm" /></p>
                </>}
            <div className="px-4">
                <Divider className="bg-gray-600 my-5" />
            </div>
            <div className="p-4 flex sm:flex-row flex-col gap-8 justify-between  items-center">
                {packages?.map((e) => <PackageComponent {...e} />)}
            </div>

        </DahsboardLayout>
    
    </> );
}

export default PakcgaePage;