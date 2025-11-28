import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TogglePurple from '../../src/components/TogglePurple';
import { useState } from 'react';

function TogglePurpleMock() {
  const [isPurple, setIsPurple] = useState<boolean>(false);

  return <TogglePurple isPurple={isPurple} setIsPurple={setIsPurple} />;
}

describe('TogglePurple', () => {
  beforeEach(() => {
    render(<TogglePurpleMock />);
  });

  describe('render test', () => {
    it('should render the checkbox and the checkbox should not be checked', () => {
      const checkbox = screen.getByRole('checkbox');

      // expect(element).matcher
      expect(checkbox).toBeInTheDocument();
      expect(checkbox).not.toBeChecked();

      // automatically call cleanup to unmount the component which rendered before
    });

    it('should render the label with purple text', () => {
      const label = screen.getByText(/purple/i);

      // expect(element).matcher;
      expect(label).toBeInTheDocument();
    });
  });

  describe('user interaction', () => {
    it('should be checked after user click', async () => {
      const checkbox = screen.getByRole('checkbox');
      const user = userEvent.setup();

      await user.click(checkbox);

      expect(checkbox).toBeChecked();
    });
  });
});
