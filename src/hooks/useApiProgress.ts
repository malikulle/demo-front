import { useState, useEffect } from "react";
import axios from "axios";

export const useApiProgress = (
  apiMethod: string,
  apiPath: string,
  strictPath: string
) => {
  const [pendingApiCall, setPendingApiCall] = useState<boolean>(false);

  useEffect(() => {
    let requestInterceptor: any, responseInterceptor: any;

    const updateApiCallFor = (
      method: string,
      url: string,
      inProgress: boolean
    ) => {
      if (method !== apiMethod) {
        return;
      }
      if (strictPath && url === apiPath) {
        setPendingApiCall(inProgress);
      } else if (!strictPath && url.startsWith(apiPath)) {
        setPendingApiCall(inProgress);
      }
    };

    const registerInterceptors = () => {
      requestInterceptor = axios.interceptors.request.use((request) => {
        const { url, method } = request;
        updateApiCallFor(String(method), String(url), true);
        return request;
      });

      responseInterceptor = axios.interceptors.response.use(
        (response) => {
          const { url, method } = response.config;
          updateApiCallFor(String(method), String(url), false);
          return response;
        },
        (error) => {
          const { url, method } = error.config;
          updateApiCallFor(method, url, false);
          throw error;
        }
      );
    };

    const unregisterInterceptors = () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };

    registerInterceptors();

    return function unmount() {
      unregisterInterceptors();
    };
  }, [apiPath, apiMethod, strictPath]);

  return pendingApiCall;
};
