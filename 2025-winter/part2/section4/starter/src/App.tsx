import Navbar from '@/component/Navbar';
import NoteList from './component/NoteList';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import FloatingButton from './component/FloatingButton';

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
