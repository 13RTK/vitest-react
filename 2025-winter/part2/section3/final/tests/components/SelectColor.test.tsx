import { render } from 'vitest-browser-react';
import SelectColor from '../../src/components/SelectColor';
import { useState } from 'react';
import { userEvent } from 'vitest/browser';

function SelectColorMock() {
  const [textColor, setTextColor] = useState<string>('');

  return <SelectColor textColor={textColor} setTextColor={setTextColor} />;
}

async function renderComponent() {
  return await render(<SelectColorMock />);
}

describe('SelectColor', () => {
  describe('render test', () => {
    it('should render the select element correctly', async () => {
      const { getByRole } = await renderComponent();

      const select = getByRole('combobox');

      await expect.element(select).toBeInTheDocument();
    });

    it('should render the label element with correct text', async () => {
      const { getByText } = await renderComponent();

      const label = getByText(/text color/i);
      await expect.element(label).toBeInTheDocument();
    });
  });

  describe('user interaction', () => {
    it('should display the correct items after user click the select', async () => {
      const { getByRole } = await renderComponent();
      const select = getByRole('combobox');

      await userEvent.click(select);

      const options = getByRole('option').elements();
      expect(options).toHaveLength(3);
    });

    it.each([
      { optionValue: '', label: 'white' },
      { optionValue: 'text-black', label: 'black' },
      { optionValue: 'text-orange', label: 'orange' },
    ])(
      'should display the $label after user click the $label option',
      async ({ optionValue }) => {
        const { getByRole } = await renderComponent();

        const select = getByRole('combobox');
        const user = userEvent.setup();
        await user.selectOptions(select, optionValue);

        await expect.element(select).toHaveValue(optionValue);
      }
    );
    // it('should display the black text after user click the black option', async () => {
    //   render(<SelectColorMock />);

    //   const optionValue = 'text-black';

    //   const select = screen.getByRole('combobox');
    //   const user = userEvent.setup();

    //   await user.selectOptions(select, optionValue);

    //   expect(select).toHaveValue(optionValue);
    // });
  });
});
