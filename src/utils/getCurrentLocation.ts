import { toast } from "react-toastify";
import { LocationType } from "../types/stateTypes";

const getCurrentLocation = (setLocation: React.Dispatch<React.SetStateAction<LocationType>>,callback?:()=>void) => {
    navigator.geolocation.getCurrentPosition(
        (pos) => {
            setLocation({
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude,
            });
            if(callback){
                callback()
            }
            
        },
        (err) => {
            toast.error(
                "Location permission denied. Please refresh the page and try again."
            );
        }
    );
};

export default getCurrentLocation