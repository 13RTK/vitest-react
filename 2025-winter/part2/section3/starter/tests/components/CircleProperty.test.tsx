import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CircleProperty from '../../src/components/CircleProperty';
import { useState } from 'react';

describe('CircleProperty', () => {
  function CirclePropertyMock({
    children = 'demo',
  }: {
    children?: React.ReactNode;
  }) {
    const [property, setProperty] = useState(0);

    return (
      <CircleProperty property={property} setProperty={setProperty}>
        {children}
      </CircleProperty>
    );
  }

  beforeEach(() => {
    render(<CirclePropertyMock />);
  });

  describe('render test', () => {
    it('should render the input correctly', () => {
      const input = screen.getByRole('spinbutton');

      expect(input).toBeInTheDocument();
    });

    it('should render the label with correct text', () => {
      // Arrange
      const labelText = 'alex';
      render(<CirclePropertyMock>{labelText}</CirclePropertyMock>);

      // Act
      const label = screen.getByText(labelText);

      // Assert
      expect(label).toBeInTheDocument();
    });
  });

  describe('user interaction', () => {
    it('should display the correct number in the input after user type', async () => {
      // Arrange
      const input = screen.getByRole('spinbutton');
      const inputNumber = 30;
      const user = userEvent.setup();

      // Act
      await user.click(input);
      await user.keyboard(inputNumber.toString());

      // Assert
      expect(input).toHaveValue(inputNumber);
    });
  });
});
