import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { axiosInstance } from '@/apis/axiosInstance';

export const useGetSearchRoutesQuery = () => {
    return useQuery('recentSearch', async () => {
        try {
            const res = await axiosInstance.get(`/api/v1/recentSearch`);
            return res.data.data;
        } catch (err) {
            const er = err as AxiosError;
            throw er;
        }
    });
};

export const useGetSavedRoutesQuery = () => {
    return useQuery('getRoads', async () => {
        try {
            const res = await axiosInstance.get(`/api/v1/my_find_road/get_roads`);
            return res.data.data;
        } catch (err) {
            const er = err as AxiosError;
            throw er;
        }
    });
};

export const useDeleteQuery = async (id: number | null) => {
    try {
        await axiosInstance.delete(`/api/v1/my_find_road/delete_route?id=${id}`);
    } catch (err) {
        const error = err as AxiosError;
        throw error;
    }
};