import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders Homepage', () => {
  const { getByText } = render(<App />);
  const title = getByText(/Wassa Docker Auth Generator/i);
  expect(title).toBeInTheDocument();
});
