export interface PaginationResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export function paginate<T>(
  data: T[],
  total: number,
  page: number,
  limit: number
): PaginationResult<T> {
  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  return {
    data: data.slice(startIndex, endIndex),
    total,
    page,
    limit,
    totalPages,
  };
}

export function getPaginationParams(query: {
  page?: string | number;
  limit?: string | number;
}): { page: number; limit: number } {
  const page = Math.max(1, parseInt(String(query.page || 1), 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(String(query.limit || 10), 10) || 10));

  return { page, limit };
}

export function calculateTotalPages(total: number, limit: number): number {
  return Math.ceil(total / limit);
}
