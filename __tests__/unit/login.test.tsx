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
});
