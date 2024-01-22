import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton } from '@/components/common/molecules';
import { FontText } from '@/components/common/atoms';
import { COLOR } from '@/constants';
import { SubwayRoute } from '@/components/savedRoutes';
import { RecommendedRoutes, IssuesBanner } from '@/components/home/organism';
import { axiosInstance } from '@/apis/axiosInstance';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';

const SavedRouteBox = () => {
    const [hasSavedRoutes, setHasSavedRoutes] = useState(false);

    const { data: savedRoutes } = useQuery('getRoads', async () => {
        try {
            const res = await axiosInstance.get('/api/v1/my_find_road/get_roads');
            setHasSavedRoutes(res.data.data.length > 0);
            return res.data.data;
        } catch (err) {
            const er = err as AxiosError;
            throw er;
        }
    });

    if (hasSavedRoutes) {
        const firstSavedRoute = savedRoutes ? savedRoutes[0] : [];
        return (
            <View>
                <View style={styles.titleContainer}>
                    <View style={styles.textContainer}>
                        <FontText
                            value={`${firstSavedRoute.roadName}  `}
                            textSize="20px"
                            textWeight="Bold"
                            lineHeight="25px"
                            textColor={COLOR.BASIC_BLACK}
                        />
                        <FontText style={styles.grayEllipse}
                            value="42분 이상 예상"
                            textSize="16px"
                            textWeight="Medium"
                            lineHeight="21px"
                            textColor={COLOR.GRAY_999}
                        />
                    </View>
                    <View style={styles.textContainer}>
                        <FontText
                            value="세부정보  "
                            textSize="16px"
                            textWeight="Medium"
                            lineHeight="21px"
                            textColor={COLOR.GRAY_999}
                        />
                        <IconButton isFontIcon={false} imagePath="more_gray" iconWidth="8px" iconHeight="14px" />
                    </View>
                </View>
                <View style={styles.containerSubwayRoute}><SubwayRoute /></View>
                <IssuesBanner />
                <RecommendedRoutes />
            </View>
        );
    } else {
        return (
            <FontText style={styles.messageStyle}
                value="저장한 경로가 없어요"
                textSize="16px"
                textWeight="Medium"
                lineHeight="500px"
                textColor={COLOR.GRAY_999}
            />
        );
    }
};

const styles = StyleSheet.create({
    messageStyle: {
        textAlign: 'center'
    },
    titleContainer: {
        marginVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    grayEllipse: {
        backgroundColor: '#f0f0f0',
        borderRadius: 40,
        paddingHorizontal: 8,
        paddingVertical: 2,
    },
    containerSubwayRoute: {
        marginTop: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default SavedRouteBox;
