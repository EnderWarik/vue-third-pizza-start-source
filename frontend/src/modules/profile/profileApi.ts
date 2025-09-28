import { httpClient } from "@/http/HttpClient";
import {
  IApiAddressCreateRequest,
  IApiAddressCreatResponse,
  IApiAddressGetResponse,
  IApiAddressUpdateRequest,
} from "@/modules/profile/types/api/api";

export const profileApi = {
  async updateAddress(data: IApiAddressUpdateRequest): Promise<void> {
    return httpClient.put<void>(`/addresses/${data.id}`, data);
  },

  async deleteAddress(id: number): Promise<void> {
    return httpClient.delete<void>(`/addresses/${id}`);
  },

  async createAddress(
    data: IApiAddressCreateRequest,
  ): Promise<IApiAddressCreatResponse> {
    return httpClient.post<IApiAddressCreatResponse>(`/addresses`, data);
  },

  async getAddresses(): Promise<IApiAddressGetResponse> {
    return httpClient.get<IApiAddressGetResponse>(`/addresses`);
  },
};
