import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import TogglePurple from '../../src/components/TogglePurple';
import '@testing-library/jest-dom/vitest';

const isPurple = false;
function setIsPurple(isPurple: boolean) {}

render(<TogglePurple isPurple={isPurple} setIsPurple={setIsPurple} />);

test('checkbox', () => {
  const checkbox = screen.getByRole('checkbox');

  // expect(element).matcher
  expect(checkbox).toBeInTheDocument();
  expect(checkbox).not.toBeChecked();
});

test('label text', () => {
  const label = screen.getByText(/purple/i);

  // expect(element).matcher
  expect(label).toBeInTheDocument();
});
