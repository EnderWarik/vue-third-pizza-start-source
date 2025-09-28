import { httpClient } from "@/http/HttpClient";
import { IApiOrderCreateResponse } from "@/modules/order/types/api/IApiOrderCreateResponse";
import { IApiOrderCreateRequest } from "@/modules/order/types/api/IApiOrderCreateRequest";
import { IApiOrderGetResponse } from "@/modules/order/types/api/IApiOrderGetResponse";

export const orderApi = {
  async deleteOrder(id: number): Promise<void> {
    return httpClient.delete<void>(`/orders/${id}`);
  },

  async createOrder(
    data: IApiOrderCreateRequest,
  ): Promise<IApiOrderCreateResponse> {
    return httpClient.post<IApiOrderCreateResponse>(`/orders/`, data);
  },

  async getOrders(): Promise<IApiOrderGetResponse[]> {
    return httpClient.get<IApiOrderGetResponse[]>("/orders");
  },
};
