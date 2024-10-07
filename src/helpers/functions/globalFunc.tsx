import axios from "axios";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

interface ResponseData {
    success: boolean;
    body?: any; // 'any' turini kerakli tur bilan almashtiring
    message: string;
}
export interface UseGlobalResponse<T> {
    loading: boolean;
    error: any;
    response: T | any | undefined;
    globalDataFunc: () => void;
}

export function useGlobalRequest<T>(
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    data?: T,
    config?: any
): UseGlobalResponse<T> {
    const mutation = useMutation({
        mutationFn: async () => {
            let res;
            switch (method) {
                case 'GET':
                    res = await axios.get(url, config || {});
                    break;
                case 'POST':
                    res = await axios.post(url, data || {}, config || {});
                    break;
                case 'PUT':
                    res = await axios.put(url, data || {} , config || {});
                    break;
                case 'DELETE': 
                    res = await axios.delete(url, config || {})
                    break;
                default:
                    return toast.error('Xatolik');
            }
                // if (!res.data.success) ''
                // return res.data?.body
                return (res.data as ResponseData).body;
            },
            onError: (error: any) => {
                toast.error(error.message);
            },
    })
    return {
        loading: mutation.status == 'loading',
        error: mutation.error,
        response: mutation.data,
        globalDataFunc: mutation.mutateAsync
    }
}
