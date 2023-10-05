import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { describe, expect, it, jest, beforeAll, afterEach } from '@jest/globals';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import MockAdapter from 'axios-mock-adapter';
import { Login } from '@/components/auth/page';
import { API_BASE_URL } from '@env';

const mockedNavigation = jest.fn();

jest.mock('@react-navigation/native', () => {
  const originalModule = jest.requireActual<typeof import('@react-navigation/native')>(
    '@react-navigation/native',
  );
  return {
    ...originalModule,
    useNavigation: () => {
      return {
        push: mockedNavigation,
      };
    },
  };
});

describe('<Login />', () => {
  let mock: AxiosMockAdapter;
  beforeAll(() => {
    mock = new MockAdapter(axios);
  });
  afterEach(() => {
    mock.reset();
  });
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
  it('touch login button && login fetch successful', async () => {
    const { getByText } = render(<Login />);
    const button = getByText('로그인');
    mock.onPost(`${API_BASE_URL}/api/v1/member/login`).reply(200);
    fireEvent(button, 'press');
    await waitFor(() => {
      expect(mockedNavigation).toBeCalledTimes(1);
    });
  });
});
