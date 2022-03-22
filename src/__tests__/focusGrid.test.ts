import { FocusGrid } from '../focusGrid';

import { Events } from '../events';

describe('FocusGrid', () => {
  const emitSpy = jest.spyOn(Events.prototype, 'emit');

  afterEach(() => {
    emitSpy.mockReset();
  });

  describe('focusNext', () => {
    test('focuses the next column in the first row', () => {
      const grid = new FocusGrid(3, 9);
      grid.focusNext();

      expect(grid.getCell()).toEqual({ row: 0, column: 1 });
      expect(grid.getIndex()).toEqual(1);
      expect(emitSpy).toHaveBeenCalledWith('focus:change', { from: 0, to: 1, performFocus: true });
    });

    test('focuses the next column in the second row', () => {
      const grid = new FocusGrid(3, 9, 1, 1);
      expect(grid.getCell()).toEqual({ row: 1, column: 1 });
      expect(grid.getIndex()).toEqual(4);

      grid.focusNext();
      expect(grid.getCell()).toEqual({ row: 1, column: 2 });
      expect(grid.getIndex()).toEqual(5);
      expect(emitSpy).toHaveBeenCalledWith('focus:change', { from: 4, to: 5, performFocus: true });
    });

    test('wraps to the next row when on the last column', () => {
      const grid = new FocusGrid(3, 9, 1, 2);
      expect(grid.getCell()).toEqual({ row: 1, column: 2 });

      grid.focusNext();
      expect(grid.getCell()).toEqual({ row: 2, column: 0 });
      expect(emitSpy).toHaveBeenCalledWith('focus:change', { from: 5, to: 6, performFocus: true });
    });

    test('emits the overflow event when on the last element', () => {
      const grid = new FocusGrid(3, 9, 2, 2);
      expect(grid.getCell()).toEqual({ row: 2, column: 2 });

      grid.focusNext();
      expect(grid.getCell()).toEqual({ row: 2, column: 2 });
      expect(emitSpy).toHaveBeenCalledWith('focus:overflow', 0);
    });
  });

  describe('focusPrevious', () => {
    test('emits the underflow event when on the first element', () => {
      const grid = new FocusGrid(3, 9);
      grid.focusPrevious();
      expect(grid.getCell()).toEqual({ row: 0, column: 0 });
      expect(emitSpy).toHaveBeenCalledWith('focus:underflow', 2);
    });

    test('focuses the previous element on the first row', () => {
      const grid = new FocusGrid(3, 9, 0, 2);
      grid.focusPrevious();
      expect(grid.getCell()).toEqual({ row: 0, column: 1 });
      expect(grid.getIndex()).toEqual(1);
      expect(emitSpy).toHaveBeenCalledWith('focus:change', { from: 2, to: 1, performFocus: true });
    });

    test('focuses the previous element on the second row', () => {
      const grid = new FocusGrid(3, 9, 1, 1);
      grid.focusPrevious();
      expect(grid.getCell()).toEqual({ row: 1, column: 0 });
      expect(grid.getIndex()).toEqual(3);
      expect(emitSpy).toHaveBeenCalledWith('focus:change', { from: 4, to: 3, performFocus: true });
    });

    test('wraps to the previous row', () => {
      const grid = new FocusGrid(3, 9, 1, 0);
      grid.focusPrevious();
      expect(grid.getCell()).toEqual({ row: 0, column: 2 });
      expect(grid.getIndex()).toEqual(2);
      expect(emitSpy).toHaveBeenCalledWith('focus:change', { from: 3, to: 2, performFocus: true });
    });
  });

  describe('focusUp', () => {
    test('emits the underflow event when on the first row', () => {
      const grid = new FocusGrid(3, 9);
      grid.focusUp();

      expect(grid.getCell()).toEqual({ row: 0, column: 0 });
      expect(emitSpy).toHaveBeenCalledWith('focus:underflow', 0);
    });

    test('focuses the previous row', () => {
      const grid = new FocusGrid(3, 9, 1, 0);
      grid.focusUp();
      expect(grid.getCell()).toEqual({ row: 0, column: 0});
      expect(grid.getIndex()).toEqual(0);
      expect(emitSpy).toHaveBeenCalledWith('focus:change', { from: 3, to: 0, performFocus: true });
    });
  });

  describe('focusDown', () => {
    test('emits the overflow event when on the last row', () => {
      const grid = new FocusGrid(3, 9, 2, 0);
      grid.focusDown();
      expect(grid.getCell()).toEqual({ row: 2, column: 0 });
      expect(emitSpy).toHaveBeenCalledWith('focus:overflow', 0);
    });

    test('focuses the next row', () => {
      const grid = new FocusGrid(3, 9, 0, 0);
      grid.focusDown();
      expect(grid.getCell()).toEqual({ row: 1, column: 0 });
      expect(grid.getIndex()).toEqual(3);
      expect(emitSpy).toHaveBeenCalledWith('focus:change', { from: 0, to: 3, performFocus: true });
    });
  });
});
