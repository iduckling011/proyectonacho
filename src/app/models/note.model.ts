export interface Note {
  id: number;
  title: string;
  content: string;
  category: 'Personal' | 'Trabajo' | 'Estudios';
  date: string;
}