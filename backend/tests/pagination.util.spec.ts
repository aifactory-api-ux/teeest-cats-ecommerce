import { paginate, getPaginationParams, calculateTotalPages } from '../shared/utils/pagination.util';

describe('pagination.util', () => {
  describe('paginate', () => {
    it('should return paginated data with correct structure', () => {
      const data = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];

      const result = paginate(data, 5, 1, 2);

      expect(result).toBeDefined();
      expect(result.data).toHaveLength(2);
      expect(result.total).toBe(5);
      expect(result.page).toBe(1);
      expect(result.limit).toBe(2);
      expect(result.totalPages).toBe(3);
    });

    it('should slice data correctly for page 1', () => {
      const data = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];

      const result = paginate(data, 5, 1, 2);

      expect(result.data).toEqual([{ id: 1 }, { id: 2 }]);
    });

    it('should slice data correctly for page 2', () => {
      const data = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];

      const result = paginate(data, 5, 2, 2);

      expect(result.data).toEqual([{ id: 3 }, { id: 4 }]);
    });

    it('should handle partial last page', () => {
      const data = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];

      const result = paginate(data, 5, 3, 2);

      expect(result.data).toEqual([{ id: 5 }]);
    });

    it('should handle empty data array', () => {
      const result = paginate([], 0, 1, 10);

      expect(result.data).toEqual([]);
      expect(result.total).toBe(0);
      expect(result.totalPages).toBe(0);
    });

    it('should calculate totalPages correctly', () => {
      const data = new Array(25).fill({ id: 1 });

      const result = paginate(data, 25, 1, 10);

      expect(result.totalPages).toBe(3);
    });
  });

  describe('getPaginationParams', () => {
    it('should return default values when no params provided', () => {
      const result = getPaginationParams({});

      expect(result.page).toBe(1);
      expect(result.limit).toBe(10);
    });

    it('should parse string page to number', () => {
      const result = getPaginationParams({ page: '3', limit: '20' });

      expect(result.page).toBe(3);
      expect(result.limit).toBe(20);
    });

    it('should enforce minimum page of 1', () => {
      const result = getPaginationParams({ page: -5 });

      expect(result.page).toBe(1);
    });

    it('should enforce maximum limit of 100', () => {
      const result = getPaginationParams({ limit: 500 });

      expect(result.limit).toBe(100);
    });

    it('should enforce minimum limit of 1', () => {
      const result = getPaginationParams({ limit: 0 });

      expect(result.limit).toBe(1);
    });

    it('should handle invalid string values gracefully', () => {
      const result = getPaginationParams({ page: 'invalid', limit: 'invalid' });

      expect(result.page).toBe(1);
      expect(result.limit).toBe(10);
    });
  });

  describe('calculateTotalPages', () => {
    it('should calculate total pages correctly for even division', () => {
      const result = calculateTotalPages(100, 10);

      expect(result).toBe(10);
    });

    it('should round up for partial pages', () => {
      const result = calculateTotalPages(25, 10);

      expect(result).toBe(3);
    });

    it('should return 0 when total is 0', () => {
      const result = calculateTotalPages(0, 10);

      expect(result).toBe(0);
    });

    it('should return 1 when total is less than limit', () => {
      const result = calculateTotalPages(5, 10);

      expect(result).toBe(1);
    });
  });
});