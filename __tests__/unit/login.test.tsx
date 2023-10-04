import React from 'react';
import { render } from '@testing-library/react-native';
import { describe, expect, it } from '@jest/globals';
import { Login } from '@/components/auth/page';

describe('<Login />', () => {
  it('matches snapshot', () => {
    const screen = render(<Login />);
    const json = screen.toJSON();
    expect(json).toMatchSnapshot();
  });
  it('has input and a button', () => {
    const { getByText, getByPlaceholderText } = render(<Login />);
    getByPlaceholderText('이메일을 입력해주세요');
    getByPlaceholderText('비밀번호를 입력해주세요');
    getByText('로그인');
  });
});
