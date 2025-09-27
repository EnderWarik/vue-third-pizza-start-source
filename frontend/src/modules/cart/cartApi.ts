import { httpClient } from "@/http/HttpClient";
import { IApiExtraResponse } from "@/modules/cart/types/api/api";

export class cartApi {
  async getExtras(): Promise<IApiExtraResponse[]> {
    return httpClient.get<IApiExtraResponse[]>(`/misc`);
  }
}
