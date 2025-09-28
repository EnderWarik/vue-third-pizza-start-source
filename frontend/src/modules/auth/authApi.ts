import { IApiLoginRequest } from "@/modules/auth/types/api/IApiLoginRequest";
import { httpClient } from "@/http/HttpClient";
import { IApiLoginResponse } from "@/modules/auth/types/api/IApiLoginResponse";
import { IApiWhoAmIResponse } from "@/modules/auth/types/api/IApiWhoAmIResponse";

export const authApi = {
  async login(data: IApiLoginRequest): Promise<IApiLoginResponse> {
    return httpClient.post<IApiLoginResponse>("/login", data);
  },

  async logout(): Promise<void> {
    await httpClient.delete<void>("/logout");
  },

  async me(): Promise<IApiWhoAmIResponse> {
    return httpClient.get<IApiWhoAmIResponse>("/whoAmI");
  },
};
