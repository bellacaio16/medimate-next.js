import { httpAxios } from "@/helper/httpAxios";

export async function profileService(request){
    try{
        const response = await httpAxios.get("api/current",).then((res) => res.data);
        console.log("Service: ",response);
        return response;

    }catch(err){
        console.log(err);
        return err;
    }
}