import { httpAxios } from "@/helper/httpAxios";

export async function deletePrescription(id){
    console.log("HELPER>",id);
    try{
        const response = await httpAxios.delete(`api/prescriptions/${id}`,).then((res) => res.data);
        console.log("Pres deleted: ",response);
        return response;

    }catch(err){
        console.log(err);
        return err;
    }
}