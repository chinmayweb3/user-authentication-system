import { prismadb } from "../utils/prisma";
import { IisUser } from "./usercreate";
import bcrypt from "bcrypt";

type IUserLoginReq = {
  email: string;
  password: string;
};
// export const UserLogin = async (body: IUserLoginReq): Promise<IisUser> => {
//     try{

//         // const hash = bcrypt.compare()
//         // const user = prismadb.user.findFirst({
//         //     where:{
//         //         password
//         //     }
//         // })
//         return {isError:false,}
//     }catch(er:any){
//         console.log("db/userlogin :>> ",er);
//         let code = er?.code || 405;
//         let msg = er?.msg || "not found";

//         return {isError:true,code,msg}
//     }
// };
