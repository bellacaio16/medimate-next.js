const { httpAxios } = require("@/helper/httpAxios");

export async function signinService(signinData){
    try{

        const result = await httpAxios.post("api/login", signinData).then((res)=>{
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