import App from '@/App';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

it('should display correct color after user click', async () => {
  // Arrange
  render(<App />);
  const button = screen.getByRole('button');
  const user = userEvent.setup();

  // Act
  await user.click(button);
  const backgroundColor = window.getComputedStyle(button).backgroundColor;

  // Assert
  expect(backgroundColor).toBe('rgba(245, 34, 45)');
});
