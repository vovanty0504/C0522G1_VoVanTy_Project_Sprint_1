export interface SearchResult<T> {
  content: T[];
  pagination: {
    pageNumber: number,
    size: number
  };
  totalElements: number;

}
