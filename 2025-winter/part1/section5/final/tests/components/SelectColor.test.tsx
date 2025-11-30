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
  });
});
