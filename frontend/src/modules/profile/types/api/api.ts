import { IUserAddress } from "@/modules/profile/types/IUserAddress";

type EditableAddressFields = Omit<IUserAddress, "id" | "userId">;

export type IApiAddressCreateRequest = EditableAddressFields;
export type IApiAddressCreatResponse = IUserAddress;

export type IApiAddressUpdateRequest = { id: number } & EditableAddressFields;
export type IApiAddressGetResponse = IUserAddress[];
