import { faker } from '@faker-js/faker';
import type { Note } from '@/types/Note';

export function generateNote(id: number = Date.now()): Note {
  return {
    id,
    title: faker.book.title(),
    content: faker.lorem.lines(2),
  };
}
