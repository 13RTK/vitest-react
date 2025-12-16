import Navbar from '@/components/Navbar';
import NoteList from './components/NoteList';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import FloatingButton from './components/FloatingButton';
import { Toaster } from 'react-hot-toast';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <NoteList />

      <Toaster position="bottom-center" />
      <FloatingButton />
    </QueryClientProvider>
  );
}

export default App;
