import React from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton, TextButton } from '@/components/common/molecules';
import { FontText } from '@/components/common/atoms';
import { COLOR } from '@/constants';
import { SubwayRoute } from '@/components/savedRoutes';
import { useGetSearchRoutesQuery } from '@/hooks';

const RecentSearchBox = () => {
    const routeDetail = () => {
        //
    };

    const { data: recentSearchData } = useGetSearchRoutesQuery();

    const renderRecentSearch = () => (
        <View>
            <View style={styles.titleContainer}>
                <View style={styles.textContainer}>
                    <FontText
                        value={`${recentSearchData[0].stationName} -> ${recentSearchData[0].destination}`}
                        textSize="20px"
                        textWeight="Bold"
                        lineHeight="25px"
                        textColor={COLOR.BASIC_BLACK}
                    />
                    <FontText
                        value={`${recentSearchData[0].duration} 소요`}
                        textSize="16px"
                        textWeight="Medium"
                        lineHeight="21px"
                        textColor={COLOR.GRAY_999}
                    />
                </View>
                <View style={styles.textContainer}>
                    <TextButton
                        value="세부정보  "
                        textSize="16px"
                        textColor={COLOR.GRAY_999}
                        textWeight="Medium"
                        lineHeight="21px"
                        onPress={routeDetail}
                    />
                    <IconButton isFontIcon={false} imagePath="more_gray" iconWidth="8px" iconHeight="14px" />
                </View>
            </View>
            <View style={styles.containerSubwayRoute}><SubwayRoute /></View>
        </View>
    );

    const renderNoRecentSearch = () => (
        <FontText
            style={styles.messageStyle}
            value="최근 검색한 경로가 없어요."
            textSize="16px"
            textWeight="Medium"
            lineHeight="500px"
            textColor={COLOR.GRAY_999}
        />
    );

    return recentSearchData && recentSearchData.length > 0 ? renderRecentSearch() : renderNoRecentSearch();
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

export default RecentSearchBox;
