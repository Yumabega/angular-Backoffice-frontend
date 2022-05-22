import { CookieOptions } from "ngx-cookie-service";
import { UserI } from "./user-i.model"; 
export interface SessionI {
  token: string;
  user: UserI;
  setCookie?: CookieOptions
}
