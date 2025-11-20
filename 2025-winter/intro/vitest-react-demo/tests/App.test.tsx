import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../src/App';
import '@testing-library/jest-dom/vitest';

test('heading element should in the document', () => {
  render(<App />);

  const headingElement = screen.getByRole('heading');
  const buttonElement = screen.getByRole('button');

  expect(headingElement).toBeInTheDocument();
  expect(buttonElement).toBeInTheDocument();
});
