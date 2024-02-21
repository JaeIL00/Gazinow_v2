import styled from '@emotion/native';
import Icon from 'react-native-vector-icons/Feather';

import { FontText, Input, IconButton, Space } from '@/global/ui';
import { COLOR } from '@/global/constants';
import { useAppDispatch } from '@/store';
import { getSearchText } from '@/store/modules/stationSearchModule';
import { useAddRecentSearch, useGetSearchHistory, useSearchStationName } from '@/global/apis/hook';
import { useCallback, useState } from 'react';
import { debounce } from 'lodash';
import { Modal, SafeAreaView } from 'react-native';
import { SelectedStationTypes } from '../../screens/homeScreen/components/SwapStation';
import { subwayReturnLineName } from '@/global/utils/subwayLine';
import IconLocationPin from '@assets/icons/location_pin.svg';

interface SearchStationModalProps {
  searchType: '출발역' | '도착역';
  closeModal: () => void;
  setSubwayStation: React.Dispatch<React.SetStateAction<SelectedStationTypes>>;
}

const SearchStationModal = ({
  searchType,
  closeModal,
  setSubwayStation,
}: SearchStationModalProps) => {
  return <></>;
};

export default SearchStationModal;
