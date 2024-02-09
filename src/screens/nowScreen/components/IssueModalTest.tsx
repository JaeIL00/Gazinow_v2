import React from 'react';
import { FontText } from '@/global/ui';
import { Modal } from 'react-native';

interface IssueDetailProps {
  id: number;
}

const IssueModalTest = ({ id }: IssueDetailProps) => {
  return (
    <Modal>
      <FontText value={id} textSize="16px" textWeight="SemiBold" lineHeight="21px" />
    </Modal>
  );
};

export default IssueModalTest;
