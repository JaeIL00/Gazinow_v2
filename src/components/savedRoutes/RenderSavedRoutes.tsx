import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { FontText } from '@/components/common/atoms';
import { COLOR } from '@/constants';
import axios from 'axios';
import { SubwayRoute } from '@/components/savedRoutes';
import { DeleteModal } from '@/components/savedRoutes';

const RenderSavedRoutes = () => {
    const [routes, setRoutes] = useState([]);
    const [popupVisible, setPopupVisible] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://13.125.6.104:8080/api/v1/my_find_road/get_roads', {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyeWQxMDIyN0BnbWFpbC5jb20iLCJhdXRoIjoiUk9MRV9VU0VSIiwiZXhwIjoxNzA0OTgwNjA0fQ.fYyv1M0dxFumBgnpMbHiXdJIHfqL-gi6C93QOvGxe1I'
                    },
                });
                setRoutes(response.data.data.map(item => ({ roadName: item.roadName })));
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, []);

    const renderSavedRoutes = () => (
        routes.map(({ roadName }, index) => (
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
        borderColor: '#F2F2F2',
        width: 999,
        marginStart: -99,
        marginTop: 30,
    },
});

export default RenderSavedRoutes;