import Navbar from '@/components/Navbar';
import NoteList from './components/NoteList';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import FloatingButton from './components/FloatingButton';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <NoteList />

      <Toaster />
      <FloatingButton />
    </QueryClientProvider>
  );
}

export default App;
