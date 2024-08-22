import { Dimensions, SafeAreaView, TouchableHighlight, View } from 'react-native';
import React, { useState } from 'react';
import ImageMyPath from '@assets/icons/img_walkthrough_mypath.svg';
import ImageNoti from '@assets/icons/img_walkthrough_noti.svg';
import TextMyPath from '@assets/icons/text_walkthrough_mypath.svg';
import TextNoti from '@assets/icons/text_walkthrough_noti.svg';

interface WalkthroughProps {
  setIsWalkthroughClosed: (isWalkthroughClosed: boolean) => void;
}

const Walkthrough = ({ setIsWalkthroughClosed }: WalkthroughProps) => {
  const { width, height } = Dimensions.get('window');
  const [textLayoutHeight, setTextLayoutHeight] = useState<number>(0);
  const [visibleWalkthrough, setVisibleWalkthrough] = useState<'Path' | 'Noti'>('Path');

  return (
    <SafeAreaView className="flex-1 absolute w-full h-full bg-[#000000BF]">
      {visibleWalkthrough === 'Path' && (
        <TouchableHighlight onPress={() => setVisibleWalkthrough('Noti')} className="flex-1">
          <>
            <View style={{ height: height * 0.21 }} />
            <TextMyPath
              onLayout={(event) => {
                const { height } = event.nativeEvent.layout;
                setTextLayoutHeight(height + 16);
              }}
              className="w-full flex-row mb-16 ml-21"
            />
            <ImageMyPath className="mx-16" width={width - 32} />
          </>
        </TouchableHighlight>
      )}
      {visibleWalkthrough === 'Noti' && (
        <TouchableHighlight onPress={() => setIsWalkthroughClosed(true)} className="flex-1">
          <>
            <View style={{ height: height * 0.21 + textLayoutHeight }} />
            <View className="bg-white mx-16 rounded-15">
              <ImageMyPath width={width - 32} />
              <View className="absolute h-full w-full rounded-15 bg-[#000000BF]" />
            </View>
            <View className="flex-1" />
            <View className="w-full flex-row-reverse mb-24 mr-[-23]">
              <TextNoti />
            </View>
            <ImageNoti style={{ marginLeft: width * 0.745 }} />
          </>
        </TouchableHighlight>
      )}
    </SafeAreaView>
  );
};

export default Walkthrough;
