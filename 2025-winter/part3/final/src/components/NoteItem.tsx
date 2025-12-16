import { noteAtom } from '@/atoms/noteAtom';
import { openModal } from '@/hooks/useModel';
import { deleteNoteById } from '@/services/apiNote';
import type { Note } from '@/types/Note';
import { PencilLineIcon, TrashIcon } from '@phosphor-icons/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import toast from 'react-hot-toast';

function NoteItem({ note }: { note: Note }) {
  const queryClient = useQueryClient();
  const setNote = useSetAtom(noteAtom);

  const { mutate: deleteNote, isPending: isDeleting } = useMutation({
    mutationKey: ['deleteNote'],
    mutationFn: deleteNoteById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      toast.success('Note deleted successfully');
    },
  });

  function openEditModal() {
    setNote(note);
    openModal('my_modal_5');
  }

  return (
    <div className="collapse bg-base-100 border border-base-300">
      <input type="radio" name="my-accordion-1" defaultChecked />
      <div className="collapse-title font-semibold lg:text-4xl flex justify-between items-center pr-3">
        {note.title}

        <div className="flex gap-2 relative z-10 pointer-events-auto">
          <button
            className="btn btn-square btn-accent lg:btn-lg cursor-pointer"
            onClick={openEditModal}
          >
            <PencilLineIcon size={24} weight="thin" />
          </button>
          <button
            onClick={(event) => {
              event.stopPropagation();
              deleteNote(note.id);
            }}
            className="btn btn-square btn-error lg:btn-lg"
            role="delete-btn"
          >
            {isDeleting ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <TrashIcon size={24} weight="thin" />
            )}
          </button>
        </div>
      </div>

      <div className="collapse-content text-sm lg:text-lg">{note.content}</div>
    </div>
  );
}

export default NoteItem;
