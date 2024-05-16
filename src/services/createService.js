import { httpAxios } from "@/helper/httpAxios";

export async function createService(presData) {
  const result = await httpAxios.post("api/prescriptions", presData).then((res) => res.data);
  return result ;
}
