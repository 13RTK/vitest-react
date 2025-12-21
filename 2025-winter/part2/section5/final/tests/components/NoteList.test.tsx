import NoteList from '@/components/NoteList';
import { getNotes } from '@/services/apiNote';
import type { Note } from '@/types/Note';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from 'vitest-browser-react';

describe('NoteList', () => {
  async function renderComponent() {
    const queryClient = new QueryClient();

    return render(
      <QueryClientProvider client={queryClient}>
        <NoteList />
      </QueryClientProvider>
    );
  }

  describe('render test', () => {
    it('should render list items with correct count', async () => {
      // Arrange
      const mockNotes: Note[] = [
        {
          id: 1,
          title: 'How do I create an account?',
          content:
            'Click the "Sign Up" button in the top right corner and follow the registration process.',
        },
        {
          id: 2,
          title: 'Can I reset my password?',
          content:
            'Yes, you can reset your password by clicking the "Forgot Password" link in the login form.',
        },
      ];
      vi.mock('@/services/apiNote', { spy: true });
      vi.mocked(getNotes).mockResolvedValue(mockNotes);
      const { getByRole } = await renderComponent();

      await vi.waitFor(() => {
        const main = getByRole('main');

        expect(main).toBeInTheDocument();
      });

      // Act
      const noteItems = getByRole('listitem').elements();

      // Assert
      expect(noteItems).toHaveLength(mockNotes.length);
      expect(getNotes).toHaveBeenCalled();
    });
  });
});
