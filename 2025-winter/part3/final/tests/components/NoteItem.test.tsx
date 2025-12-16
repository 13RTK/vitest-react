import NoteItem from '@/components/NoteItem';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { Note } from '@/types/Note';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import ToastDemo from '@/components/ToastDemo';

vi.mock('@/services/apiNote', () => ({
  deleteNoteById: vi.fn().mockResolvedValue(true),
}));

describe('NoteItem', () => {
  function NoteItemMock() {
    const note: Note = {
      id: 1,
      title: 'Example Title',
      content: 'Example Content',
    };

    const queryClient = new QueryClient();

    return (
      <QueryClientProvider client={queryClient}>
        <NoteItem note={note} />

        <Toaster />
      </QueryClientProvider>
    );
  }

  beforeEach(() => {
    render(<NoteItemMock />);
    // render(
    //   <>
    //     <ToastDemo />
    //     <Toaster />
    //   </>
    // );
  });

  describe('user interaction', () => {
    it('should display the toast after delete', async () => {
      const button = screen.getByRole('delete-btn');
      // const button = screen.getByRole('button');
      const user = userEvent.setup();

      await user.click(button);

      const toast = await screen.findByText(/success/i);

      expect(toast).toBeInTheDocument();
    });
  });
});
