const { httpAxios } = require("@/helper/httpAxios");

export async function signupService(signupData){
    try{

        const result = await httpAxios.post("api/users", signupData).then((res)=>{
            // console.log(res);
            return res.data;
        });
        console.log(result);
        return result;
    }catch(err){
        console.log(err);
        return null;
    }
}