import type { Note } from '@/types/Note';
import { render } from 'vitest-browser-react';

import NoteItem from '@/components/NoteItem';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

describe('NoteItem', () => {
  const mockNote: Note = {
    id: 1,
    title: 'How do I create an account?',
    content:
      'Click the "Sign Up" button in the top right corner and follow the registration process.',
  };

  async function renderComponent() {
    const queryClient = new QueryClient();

    return render(
      <QueryClientProvider client={queryClient}>
        <NoteItem note={mockNote} />
      </QueryClientProvider>
    );
  }

  describe('render test', () => {
    it('should render the correct buttons with accessible name', async () => {
      const { getByRole } = await renderComponent();

      const editButton = getByRole('button', {
        name: 'edit-button',
      });
      const deleteButton = getByRole('button', {
        name: 'delete-button',
      });

      await expect.element(editButton).toBeInTheDocument();
      await expect.element(deleteButton).toBeInTheDocument();
    });
  });
});
