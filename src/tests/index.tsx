import { render, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';
import { Provider as ChakraProvider } from '@src/components/ui/provider';

export default function (ui: ReactElement, options?: RenderOptions) {
  return render(ui, { wrapper: ({ children }) => <ChakraProvider>{children}</ChakraProvider>, ...options });
}
