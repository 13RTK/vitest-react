import { render } from 'vitest-browser-react';
import TogglePurple from '../../src/components/TogglePurple';
import { useState } from 'react';
import { userEvent } from 'vitest/browser';

function TogglePurpleMock() {
  const [isPurple, setIsPurple] = useState<boolean>(false);

  return <TogglePurple isPurple={isPurple} setIsPurple={setIsPurple} />;
}

describe('TogglePurple', () => {
  async function renderComponent() {
    return render(<TogglePurpleMock />);
  }

  describe('render test', () => {
    it('should render the checkbox and the checkbox should not be checked', async () => {
      const { getByRole } = await renderComponent();

      const checkbox = getByRole('checkbox');

      await expect.element(checkbox).toBeInTheDocument();
      await expect.element(checkbox).not.toBeChecked();
      // automatically call cleanup to unmount the component which rendered before
    });

    it('should render the label with purple text', async () => {
      const { getByText } = await render(<TogglePurpleMock />);

      const label = getByText(/purple/i);

      // expect(element).matcher;
      await expect.element(label).toBeInTheDocument();
    });
  });

  describe('user interaction', () => {
    it('should be checked after user click', async () => {
      const { getByRole } = await renderComponent();
      const checkbox = getByRole('checkbox');

      await userEvent.click(checkbox);

      expect(checkbox).toBeChecked();
    });
  });
});
