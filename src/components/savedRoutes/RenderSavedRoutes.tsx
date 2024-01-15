import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { FontText } from '@/components/common/atoms';
import { COLOR } from '@/constants';
import { SubwayRoute } from '@/components/savedRoutes';
import { DeleteModal } from '@/components/savedRoutes';
import { axiosInstance } from '@/apis/axiosInstance';
import { AxiosError } from 'axios';
import { useQuery } from 'react-query';

const RenderSavedRoutes = () => {
    const [popupVisible, setPopupVisible] = useState(false);

    const { data: savedRoutes } = useQuery('getRoads', async () => {
        try {
            const res = await axiosInstance.get('/api/v1/my_find_road/get_roads');
            return res.data.data;
        } catch (err) {
            const er = err as AxiosError;
            throw er;
        }
    });
    
    const renderSavedRoutes = () => (
        savedRoutes.map(({ roadName }, index) => (
            <View key={index} style={styles.containerRoutes}>
                <View style={styles.containerRenderTitle}>
                    <FontText
                        value={roadName}
                        textSize="22px"
                        textWeight="Bold"
                        lineHeight="29px"
                        textColor={COLOR.BASIC_BLACK}
                    />
                    <TouchableOpacity onPress={showDeletePopup}>
                        <FontText
                            value="삭제"
                            textSize="16px"
                            textWeight="Medium"
                            lineHeight="21px"
                            textColor={COLOR.GRAY_999}
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.containerSubwayRoute}>
                    <SubwayRoute />
                </View>

                <View style={styles.borderLine}></View>
            </View>
        ))
    );

    const showDeletePopup = () => setPopupVisible(true);
    const hideDeletePopup = () => setPopupVisible(false);
    const handleDelete = () => {
        // 삭제 로직 추가
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