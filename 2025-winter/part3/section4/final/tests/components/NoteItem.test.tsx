import type { Note } from '@/types/Note';
import { render } from 'vitest-browser-react';

import NoteItem from '@/components/NoteItem';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { deleteNoteById } from '@/services/apiNote';
import { userEvent } from 'vitest/browser';

vi.mock('@/services/apiNote');

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

        <Toaster />
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

  describe('user interaction', () => {
    it('should render the toaster after user click the delete button and success delete', async () => {
      // Arrange
      vi.mocked(deleteNoteById).mockResolvedValue(mockNote);
      const { getByRole, getByText } = await renderComponent();
      const button = getByRole('button', {
        name: 'delete-button',
      });

      // Act
      await userEvent.click(button);
      const toaster = getByText(/Note deleted successfully/i);

      // Assert
      await expect.element(toaster).toBeInTheDocument();
    });
  });
});
