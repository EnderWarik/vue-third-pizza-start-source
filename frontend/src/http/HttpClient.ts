import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";
import { HttpError } from "@/http/types/HttpError";
import { TokenStorage } from "@/modules/auth/utils/TokenStorage";
import { API_URL } from "@/http/constants";
import { useAuthStore } from "@/modules/auth/authStore";

class HttpClient {
  private instance: AxiosInstance;

  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
      timeout: 15_000,
      withCredentials: false,
    });
    this.installInterceptors();
  }

  get<T = unknown>(url: string, config?: AxiosRequestConfig) {
    return this.instance.get<T>(url, config).then((r) => r.data);
  }
  post<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return this.instance.post<T>(url, data, config).then((r) => r.data);
  }
  put<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return this.instance.put<T>(url, data, config).then((r) => r.data);
  }
  patch<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return this.instance.patch<T>(url, data, config).then((r) => r.data);
  }
  delete<T = unknown>(url: string, config?: AxiosRequestConfig) {
    return this.instance.delete<T>(url, config).then((r) => r.data);
  }

  private installInterceptors() {
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = TokenStorage.get();
        if (token) {
          config.headers = config.headers ?? {};
          (config.headers as Record<string, string>)["Authorization"] =
            `Bearer ${token}`;
        }

        return config;
      },
    );

    this.instance.interceptors.response.use(
      (resp) => resp,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          const authStore = useAuthStore();
          authStore.logout();
        }

        const dataAny = error.response?.data as any;
        const message =
          dataAny?.message ||
          dataAny?.error ||
          error.message ||
          "Network or server error";

        throw new HttpError(message, {
          status: error.response?.status,
          code: (dataAny && (dataAny.code || dataAny.errorCode)) || error.code,
          details: dataAny,
        });
      },
    );
  }
}

export const httpClient = new HttpClient(API_URL);
