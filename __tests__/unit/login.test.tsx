import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { describe, expect, it, jest } from '@jest/globals';
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
  it('changes input', () => {
    const email = 'test@naver.com';
    const password = '1234qwer!';
    const { getByPlaceholderText, getByDisplayValue } = render(<Login />);
    const inputEmail = getByPlaceholderText('이메일을 입력해주세요');
    const inputPassword = getByPlaceholderText('비밀번호를 입력해주세요');
    fireEvent(inputEmail, 'changeText', email);
    getByDisplayValue(email);
    fireEvent(inputPassword, 'changeText', password);
    getByDisplayValue(password);
  });
  it('touch login button', async () => {
    const { getByText, toJSON } = render(<Login />);
    const button = getByText('로그인');
    const screen = toJSON();
    fireEvent(button, 'press');
    getByText('로딩중');
    expect(screen).toMatchSnapshot();
  });
});
