import React from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton } from '@/components/common/molecules';
import { FontText } from '@/components/common/atoms';
import { COLOR } from '@/constants';

const IssuesBanner = () => {
    return (
        <View style={styles.issuesBanner}>
            <IconButton
                isFontIcon={false}
                imagePath="issue_rain_circle"
                iconWidth="23px"
                iconHeight="23px"
            />
            <FontText style={styles.buttonIssues}
                value="폭우로 인한 4호선 운행정지"
                textSize="17px"
                textWeight="SemiBold"
                lineHeight="21px"
                textColor={COLOR.BASIC_BLACK}
            />
            <IconButton isFontIcon={false} imagePath="more_gray" iconWidth="7px" iconHeight="12px" />
        </View>
    );
};

const styles = StyleSheet.create({
    issuesBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#EBEBEB',
        borderRadius: 40,
        marginTop: 25,
        marginBottom: 30,
        paddingHorizontal: 13,
        paddingVertical: 8,
    },
    buttonIssues: {
        flex: 1,
        marginLeft: 10,
    },
});

export default IssuesBanner;
