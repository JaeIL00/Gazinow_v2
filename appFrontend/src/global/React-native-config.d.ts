/// <reference types="nativewind/types" />

declare module 'react-native-config' {
  export interface NativeConfig {}

  export const Config: NativeConfig;
  export default Config;
}

declare module '*.svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}

declare module 'classname';
