import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the CodeSync landing page', () => {
  render(<App />);
  expect(screen.getByText(/Code together, in the same tab/i)).toBeInTheDocument();
});
