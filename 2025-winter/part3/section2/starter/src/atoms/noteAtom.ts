import type { Note } from '@/types/Note';
import { atom } from 'jotai';

export const noteAtom = atom<Note>({
  id: 999,
  title: 'Example Title',
  content: 'Example Content',
});
