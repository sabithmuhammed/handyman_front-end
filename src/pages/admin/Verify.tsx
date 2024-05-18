import React, { useEffect, useState } from "react";
import AdminTile from "../../components/admin/AdminTile";
import ViewDetails from "../../components/admin/ViewDetails";
import { adminGetPendingVerification } from "../../api/adminApi";

type TradesmanType = {
    name: string;
    skills: string[];
    profile: string;
    idProof: string;
    _id: string;
    experience: number;
    wage: {
        amount: number;
        type: string;
    };
};

const Verify = () => {
    const [showDetails, setShowDetails] = useState(false);
    const [viewData, setViewData] = useState<number | null>();
    const [pendingVerifations, setPendingVerifications] = useState<TradesmanType[]>([]);
    useEffect(()=>{
        (async()=>{
            const response = await adminGetPendingVerification()
            console.log(response,"ghjghjkhk");
            if(response?.data){
                console.log(response);
                
                setPendingVerifications(response.data)
            }
        })()
    },[])
    
    return (
        <>
            <h1 className="text-2xl">Verify tradesman</h1>
            {
                pendingVerifations.length ?pendingVerifations.map((item, index) => (
                    <AdminTile
                        key={item._id}
                        {...item}
                        setViewData={setViewData}
                        index={index}
                        setShowDetails={setShowDetails}
                    />
                )): <p>No new requests</p>
            }
            {showDetails && (
                <ViewDetails
                    {...pendingVerifations[viewData as number]}
                    setShowDetails={setShowDetails}
                />
            )}
        </>
    );
};

export default Verify;
