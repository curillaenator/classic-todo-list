'use client';

import React from 'react';
import { ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react';
import { ColorModeProvider, type ColorModeProviderProps } from './color-mode';

const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      fonts: {
        heading: { value: `system-ui-rounded, ui-rounded, 'SanFrancisco', sans-serif` },
        body: { value: `system-ui-rounded, ui-rounded, 'SanFrancisco', sans-serif` },
      },
    },
  },
});

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  );
}
