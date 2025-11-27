import { render, screen } from '@testing-library/react';
import TogglePurple from '../../src/components/TogglePurple';

describe('TogglePurple render test', () => {
  const isPurple = false;
  function setIsPurple(isPurple: boolean) {}

  beforeEach(() => {
    render(<TogglePurple isPurple={isPurple} setIsPurple={setIsPurple} />);
  });

  it('should render the checkbox and the checkbox should not be checked', () => {
    const checkbox = screen.getByRole('checkbox');

    // expect(element).matcher
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();

    // automatically call cleanup to unmount the component which rendered before
  });

  it('should render the label with purple text', () => {
    const label = screen.getByText(/purple/i);

    // screen.debug();

    // expect(element).matcher;
    expect(label).toBeInTheDocument();
  });
});
