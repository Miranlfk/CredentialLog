import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./UseRefreshToken";
import useAuth from "./UseAuth";

const useAxiosPrivate = () => {
    //define Auth and refresh functions
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {
        //request interceptor to add token to request headers
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );
        //response interceptor to handle if token expires by refreshing token
        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        );
        //clean up function to remove interceptors
        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [auth, refresh])

    return axiosPrivate;
}

export default useAxiosPrivate;