import EditModal from '@/components/EditModal';
import { openModal } from '@/hooks/useModel';
import type { Note } from '@/types/Note';
import { useAtomValue } from 'jotai';
import { Toaster } from 'sonner';
import { render } from 'vitest-browser-react';
import { Wrapper } from '../provider';
import { userEvent } from 'vitest/browser';

describe('EditModal', () => {
  async function renderComponent() {
    return render(
      <>
        <EditModal />
        <Toaster />
      </>,
      {
        wrapper: Wrapper,
      }
    );
  }

  vi.mock('jotai', async () => {
    const originalModule = await vi.importActual('jotai');

    return { ...originalModule, useAtomValue: vi.fn() };
  });

  const mockedNoteForAdd: Note = {
    id: 999,
    title: 'test title',
    content: 'test content',
  };

  describe('render test', () => {
    it('should render the correct content for add form with default values', async () => {
      vi.mocked(useAtomValue).mockReturnValue(mockedNoteForAdd);
      const { getByLabelText } = await renderComponent();
      openModal('my_modal_5');

      const title = getByLabelText(/title/i);
      const content = getByLabelText(/content/i);

      await expect.element(title).toHaveValue(mockedNoteForAdd.title);
      await expect.element(content).toHaveValue(mockedNoteForAdd.content);
    });
  });

  describe('user interaction', () => {
    it('should render the toaster after user click the add button', async () => {
      vi.mocked(useAtomValue).mockReturnValue(mockedNoteForAdd);
      const { getByRole, getByText } = await renderComponent();
      openModal('my_modal_5');
      const addButton = getByRole('button', {
        name: /add/i,
      });

      await userEvent.click(addButton);
      const toast = getByText(/created/i);

      await expect.element(toast).toBeInTheDocument();
    });
  });
});
