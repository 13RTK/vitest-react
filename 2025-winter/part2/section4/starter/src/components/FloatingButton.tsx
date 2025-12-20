import { noteAtom } from '@/atoms/noteAtom';
import { openModal } from '@/hooks/useModel';
import { PlusIcon } from '@phosphor-icons/react';
import { useSetAtom } from 'jotai';

function FloatingButton() {
  const setNote = useSetAtom(noteAtom);

  function openCreateModal() {
    // Set default values for a new note
    setNote({
      id: 999,
      title: 'Example Title',
      content: 'Example Content',
    });
    openModal('my_modal_5');
  }

  return (
    <button
      onClick={openCreateModal}
      className="btn btn-primary btn-circle btn-lg fixed bottom-6 right-6 shadow-xl z-50"
    >
      <PlusIcon size={52} weight="thin" />
    </button>
  );
}

export default FloatingButton;
