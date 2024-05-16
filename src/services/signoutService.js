const { httpAxios } = require("@/helper/httpAxios");

export async function signoutService() {
  try {
    const result = await httpAxios
      .delete("api/signout")
      .then((res) => res.data);
    console.log(result);
    return result;
  } catch (err) {
    return err;
  }
}
