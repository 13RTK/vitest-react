import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SelectColor from '../../src/components/SelectColor';
import { useState } from 'react';

function SelectColorMock() {
  const [textColor, setTextColor] = useState<string>('');

  return <SelectColor textColor={textColor} setTextColor={setTextColor} />;
}

describe('SelectColor', () => {
  describe('render test', () => {
    it('should render the select element correctly', () => {
      render(<SelectColorMock />);

      const select = screen.getByRole('combobox');

      expect(select).toBeInTheDocument();
    });

    it('should render the label element with correct text', () => {
      render(<SelectColorMock />);

      const label = screen.getByText(/text color/i);

      expect(label).toBeInTheDocument();
    });
  });

  describe('user interaction', () => {
    it('should display the correct items after user click the select', async () => {
      render(<SelectColorMock />);

      const select = screen.getByRole('combobox');
      const user = userEvent.setup();

      await user.click(select);

      const options = screen.getAllByRole('option');

      expect(options).toHaveLength(3);
    });

    it.each([
      { optionValue: '', label: 'white' },
      { optionValue: 'text-black', label: 'black' },
      { optionValue: 'text-orange', label: 'orange' },
    ])(
      'should display the $label after user click the $label option',
      async ({ optionValue }) => {
        render(<SelectColorMock />);

        const select = screen.getByRole('combobox');
        const user = userEvent.setup();

        await user.selectOptions(select, optionValue);

        expect(select).toHaveValue(optionValue);
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
