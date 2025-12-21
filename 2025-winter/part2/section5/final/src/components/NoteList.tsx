import { getNotes } from '@/services/apiNote';
import type { Note } from '@/types/Note';
import { useQuery } from '@tanstack/react-query';

import NoteListSkeleton from './NoteListSkeleton';
import NoteItem from './NoteItem';
import ErrorAlert from './ErrorAlert';
import EditModal from './EditModal';

function NoteList() {
  const {
    data: notes,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useQuery({
    queryKey: ['notes'],
    queryFn: getNotes,
  });

  if (isLoading) {
    return <NoteListSkeleton />;
  }

  if (isError) {
    return <ErrorAlert>{error.message}</ErrorAlert>;
  }

  if (isSuccess) {
    return (
      <main>
        {notes?.map((note: Note) => (
          <NoteItem key={note.id} note={note} />
        ))}
        <EditModal />
      </main>
    );
  }
}

export default NoteList;
