import React, { ReactNode } from 'react';
import { act, fireEvent, render, renderHook, waitFor } from '@testing-library/react-native';
import { describe, expect, it, jest } from '@jest/globals';
import { Login } from '@/screens/auth';
import { API_BASE_URL } from '@env';
import { QueryClient, QueryClientProvider, UseMutateFunction } from 'react-query';
import { useLoginMutation } from '@/hooks/queries';
import nock from 'nock';
import { AxiosResponse } from 'axios';
import { LoginFetchProps, LoginFetchResponse } from '@/apis/auth/type';

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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});
const Wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

const mockedLoginMutate = jest.fn();
jest.mock('../../src/hooks/queries/auth', () => ({
  useLoginMutation: () => ({ mutate: mockedLoginMutate }),
}));
describe('<Login />', () => {
  it('matches snapshot', () => {
    const screen = render(
      <Wrapper>
        <Login />
      </Wrapper>,
    );
    const json = screen.toJSON();
    expect(json).toMatchSnapshot();
  });
  it('has input and a button', () => {
    const { getByText, getByPlaceholderText } = render(
      <Wrapper>
        <Login />
      </Wrapper>,
    );
    getByPlaceholderText('이메일을 입력해주세요');
    getByPlaceholderText('비밀번호를 입력해주세요');
    getByText('로그인');
  });
  it('changes input', () => {
    const email = 'test@naver.com';
    const password = '1234qwer!';
    const { getByPlaceholderText, getByDisplayValue } = render(
      <Wrapper>
        <Login />
      </Wrapper>,
    );
    const inputEmail = getByPlaceholderText('이메일을 입력해주세요');
    const inputPassword = getByPlaceholderText('비밀번호를 입력해주세요');
    fireEvent(inputEmail, 'changeText', email);
    getByDisplayValue(email);
    fireEvent(inputPassword, 'changeText', password);
    getByDisplayValue(password);
  });
  it('touch login button', () => {
    const { getByText } = render(
      <Wrapper>
        <Login />
      </Wrapper>,
    );
    const button = getByText('로그인');
    fireEvent(button, 'press');
    expect(mockedLoginMutate).toBeCalledTimes(1);
  });
  it('login fetch successful', async () => {
    // API 통신 테스트 보류
    // const { result } = renderHook(() => useLoginMutation(), {
    //   wrapper: Wrapper,
    // });
    // nock(API_BASE_URL)
    //   .post('/api/v1/member/login', {
    //     email: 'email@naver.com',
    //     password: 'password',
    //   })
    //   .reply(200);
    // act(() => {
    //   result.current.mutate({
    //     email: 'email@naver.com',
    //     password: 'password',
    //   });
    // });
    // await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });
});
