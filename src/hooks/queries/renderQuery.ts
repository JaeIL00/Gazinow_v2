import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { axiosInstance } from '@/apis/axiosInstance';

export const useRenderQuery = (boxType: string, endPoint: string) => {
    return useQuery(boxType, async () => {
        try {
            const res = await axiosInstance.get(`/api/v1/${endPoint}`);
            return res.data.data;
        } catch (err) {
            const er = err as AxiosError;
            throw er;
        }
    });
};

export const useDeleteQuery = async (id: number|null) => {
    try {
        await axiosInstance.delete(`/api/v1/my_find_road/delete_route?id=${id}`);
    } catch (err) {
        const error = err as AxiosError;
        throw error;
    }
};