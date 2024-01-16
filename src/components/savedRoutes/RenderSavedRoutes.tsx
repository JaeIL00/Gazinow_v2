import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { FontText } from '@/components/common/atoms';
import { COLOR } from '@/constants';
import { SubwayRoute } from '@/components/savedRoutes';
import { DeleteModal } from '@/components/savedRoutes';
import { axiosInstance } from '@/apis/axiosInstance';
import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { TextButton } from '../common/molecules';

const RenderSavedRoutes = () => {
    const [popupVisible, setPopupVisible] = useState(false);
    const [routeToDelete, setRouteToDelete] = useState<number | null>(null);
    const [savedRoutes, setSavedRoutes] = useState([]);

    const { data: savedRoutesData } = useQuery('getRoads', async () => {
        try {
            const res = await axiosInstance.get('/api/v1/my_find_road/get_roads');
            // console.log("e",res.data.data[0].id)
            return res.data.data;
        } catch (err) {
            const er = err as AxiosError;
            throw er;
        }
    });

    useEffect(() => {
        setSavedRoutes(savedRoutesData || []);
    }, [savedRoutesData]);
    
    const renderSavedRoutes = () => (
        savedRoutes.map(({ id, roadName }: { id: number, roadName: string }, index: number) => (
            <View key={index} style={styles.containerRoutes}>
                <View style={styles.containerRenderTitle}>
                    <FontText
                        value={roadName}
                        textSize="22px"
                        textWeight="Bold"
                        lineHeight="29px"
                        textColor={COLOR.BASIC_BLACK}
                    />
                    <TextButton
                        value="삭제"
                        textSize="16px"
                        textColor={COLOR.GRAY_999}
                        textWeight="Medium"
                        onPress={() => showDeletePopup(id)}
                        lineHeight="21px"
                    />
                </View>

                <View style={styles.containerSubwayRoute}>
                    <SubwayRoute />
                </View>

                <View style={styles.borderLine}></View>
            </View>
        ))
    );

    const showDeletePopup = (id: number) => {
        // console.log(id);
        setRouteToDelete(id);
        setPopupVisible(true);
    };

    const hideDeletePopup = () => setPopupVisible(false);

    const handleDelete = async () => {
        try {
            await axiosInstance.delete(`/api/v1/my_find_road/delete_route?id=${routeToDelete}`);
            const updatedRoutes = savedRoutes.filter(route => route.id !== routeToDelete);
            setSavedRoutes(updatedRoutes);
        } catch (err) {
            const er = err as AxiosError;
            throw er;
        }
        hideDeletePopup();
    };

    return (
        <View>
            {renderSavedRoutes()}
            <DeleteModal
                isVisible={popupVisible}
                onCancel={hideDeletePopup}
                onDelete={handleDelete}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    containerRoutes: {
        paddingBottom: 20,
    },
    containerRenderTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    containerSubwayRoute: {
        marginTop: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    borderLine: {
        borderWidth: 1,
        borderColor: COLOR.LIGHT_GRAY,
        width: 999,
        marginStart: -99,
        marginTop: 30,
    },
});

export default RenderSavedRoutes;