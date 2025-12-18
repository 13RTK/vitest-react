import App from '@/App';

import { render } from 'vitest-browser-react';
import { userEvent } from 'vitest/browser';

it('should display correct color after user click', async () => {
  // Arrange
  const renderResult = await render(<App />);
  const button = renderResult.getByRole('button');

  // Act
  await userEvent.click(button);
  const backgroundColor = window.getComputedStyle(
    button.element()
  ).backgroundColor;

  // Assert
  expect(backgroundColor).toBe('rgb(245, 34, 45)');
});
