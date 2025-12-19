import CircleProperty from '../../src/components/CircleProperty';
import { userEvent } from 'vitest/browser';
import { useState } from 'react';
import { render } from 'vitest-browser-react';

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

  async function renderComponent(labelText?: string) {
    return await render(<CirclePropertyMock>{labelText}</CirclePropertyMock>);
  }

  describe('render test', () => {
    it('should render the input correctly', async () => {
      const { getByRole } = await renderComponent();

      const input = getByRole('spinbutton');

      await expect.element(input).toBeInTheDocument();
    });

    it('should render the label with correct text', async () => {
      // Arrange
      const labelText = 'alex';
      const { getByText } = await renderComponent(labelText);

      // Act
      const label = getByText(labelText);

      // Assert
      await expect.element(label).toBeInTheDocument();
    });
  });

  describe('user interaction', () => {
    it('should display the correct number in the input after user type', async () => {
      // Arrange
      const renderResult = await renderComponent();
      const input = renderResult.getByRole('spinbutton');
      const inputNumber = 30;

      // Act
      await userEvent.clear(input);
      await userEvent.click(input);
      await userEvent.keyboard(inputNumber.toString());

      // Assert
      await expect.element(input).toHaveValue(inputNumber);
    });
  });
});
