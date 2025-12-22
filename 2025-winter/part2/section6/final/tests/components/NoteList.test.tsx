import NoteList from '@/components/NoteList';
import { getNotes } from '@/services/apiNote';
import type { Note } from '@/types/Note';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from 'vitest-browser-react';

vi.mock('@/services/apiNote', { spy: true });

describe('NoteList', () => {
  async function renderComponent() {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

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

    it('should render the skeleton while the data is fetching', async () => {
      // Arrange
      vi.mocked(getNotes).mockImplementation(() => {
        return new Promise(() => {});
      });
      const { getByRole } = await renderComponent();

      // Act
      const skeleton = getByRole('progressbar');

      // Assert
      await expect.element(skeleton).toBeInTheDocument();
    });

    it('should display the error message while the api function throw error', async () => {
      const errorMessage = 'Error from vitest';
      vi.mocked(getNotes).mockRejectedValue(new Error(errorMessage));
      const { getByRole } = await renderComponent();

      const alert = getByRole('alert');

      await expect.element(alert).toBeInTheDocument();
    });
  });
});
