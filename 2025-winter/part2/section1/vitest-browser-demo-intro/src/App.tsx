import toast, { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <button
        onClick={() => toast.success('toast')}
        className="btn btn-lg btn-neutral"
      >
        Neutral
      </button>

      <Toaster />
    </>
  );
}

export default App;
