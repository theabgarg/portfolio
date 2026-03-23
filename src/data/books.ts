export interface Book {
    title: string;
    author: string;
    cover: string;
    genre: string;
    goodreadsUrl: string;
}

export const booksRead: Book[] = [];

export const currentlyReading: Book[] = [];
