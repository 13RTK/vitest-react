import NoteList from '@/components/NoteList';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from 'vitest-browser-react';
import { worker } from '../mocks/server';
import { delay, http, HttpResponse } from 'msw';

const API_URL = import.meta.env.VITE_API_URL;

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

  beforeAll(() => worker.start());
  afterEach(() => worker.resetHandlers());
  afterAll(() => worker.stop());

  describe('render test', () => {
    it('should render list items with correct count', async () => {
      // Arrange
      const { getByRole } = await renderComponent();

      await vi.waitFor(() => {
        const main = getByRole('main');
        expect(main).toBeInTheDocument();
      });

      // Act
      const noteItems = getByRole('listitem').elements();

      // Assert
      expect(noteItems.length).toBeGreaterThan(0);
    });

    it('should render the skeleton while the data is fetching', async () => {
      // Arrange
      worker.use(
        http.get(API_URL, async () => {
          await delay();

          return HttpResponse.json([]);
        })
      );
      const { getByRole } = await renderComponent();

      // Act
      const skeleton = getByRole('progressbar');

      // Assert
      await expect.element(skeleton).toBeInTheDocument();
    });

    it('should display the error message while the api function throw error', async () => {
      worker.use(
        http.get(API_URL, () => {
          return HttpResponse.error();
        })
      );
      const { getByRole } = await renderComponent();

      const alert = getByRole('alert');

      await expect.element(alert).toBeInTheDocument();
    });
  });
});
