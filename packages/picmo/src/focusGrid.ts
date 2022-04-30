import { Events } from './events';

type FocusGridEvent = 'focus:change' | 'focus:underflow' | 'focus:overflow';

export type FocusChangeEvent = {
  from: number;
  to: number;
  performFocus: boolean;
};

type Cell = {
  row: number;
  column: number;
};

/**
 * Represents an array of emojis as a grid with rows and columns as they appear in the UI.
 * This makes focus traversal calculations less complex in the EmojiContainer.
 * 
 * The grid is given a flat array of emojis for the current category and the number of columns. It will create
 * a virtual grid structure mapping those emojis to rows of the desired length.
 * 
 * The focus can be traversed left, right, up, and down, or to a specific row and column coordinate. Later, the currently
 * selected grid cell can be translated back to the index in the original emoji array.
 * 
 * The grid emits three events:
 * - focus:change - when the focused cell changes
 *                  Event properties: from (the previous index), to (the new index), and performFocus (whether to focus the new cell)
 * 
 * - focus:underflow - when the focus tries to move below the first emoji in the category
 *                     Event properties: index (the current index within the grid)
 * 
 * - focus:overflow - when the focus tries to move beyond the last emoji in the category
 *                     Event properties: index (the current index within the grid)
 */
 export class FocusGrid {
  private focusedRow: number;
  private focusedColumn: number;
  private rowCount: number;
  private columnCount: number;
  private emojiCount: number;
  private wrap: boolean;

  private events = new Events<FocusGridEvent>();

  /** Maps focus traversal keys to their associated handlers. */
  private keyHandlers = {
    ArrowLeft: this.focusPrevious.bind(this),
    ArrowRight: this.focusNext.bind(this),
    ArrowUp: this.focusUp.bind(this),
    ArrowDown: this.focusDown.bind(this)
  };

  /**
   * Creates a FocusGrid.
   * 
   * @param columnCount The number of columns in the emoji picker.
   * @param emojiCount The total number of emojis in this category.
   * @param initialRow The initial focused row.
   * @param initialColumn The initial focused column.
   */
  constructor(columnCount: number, emojiCount: number, initialRow = 0, initialColumn = 0, wrap = false) {
    this.rowCount = Math.ceil(emojiCount / columnCount);
    this.columnCount = columnCount;
    this.focusedRow = initialRow;
    this.focusedColumn = initialColumn;
    this.emojiCount = emojiCount;
    this.wrap = wrap;

    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  /**
   * Removes all bound event listeners.
   */
  destroy() {
    this.events.removeAll();
  }

  /**
   * Public API for listening for focus events.
   */
  on(event: FocusGridEvent, handler: (...args: any[]) => void) {
    this.events.on(event, handler);
  }

  /**
   * Handles keydown events that are forwarded from the EmojiContainer and executes
   * the appropriate focus function.
   * @param event the KeyboardEvent that occurred
   */
  handleKeyDown(event: KeyboardEvent) {
    if (event.key in this.keyHandlers) {
      event.preventDefault();
      this.keyHandlers[event.key]();
    }
  }

  /**
   * Sets the focused cell to a specific row and, optionally, column. If no column is specified,
   * the focused column remains unchanged.
   * 
   * The `performFocus` flag determines whether the focus should be moved to the new cell. If it
   * is false, the focused element will be changed but the actual focus() call will not be triggered yet.
   * 
   * @param row The new focused row
   * @param column The new focused column, if specified
   * @param performFocus Whether or not to perform the actual focus operation.
   */
  setCell(row: number, column?: number, performFocus = true) {
    const previousIndex = this.getIndex();
    this.focusedRow = row;

    if (column !== undefined) {
      // If the column exceeds the column count, focus the last column.
      this.focusedColumn = Math.min(this.columnCount, column);
    }

    // If the given cell is out of bounds, focus to the last cell.
    if (this.focusedRow >= this.rowCount || this.getIndex() >= this.emojiCount) {
      this.focusedRow = this.rowCount - 1;
      this.focusedColumn = (this.emojiCount % this.columnCount) - 1;
    }

    this.events.emit('focus:change', { from: previousIndex, to: this.getIndex(), performFocus });
  }

  setFocusedIndex(index: number, performFocus = true) {
    const row = Math.floor(index / this.columnCount);
    const column = index % this.columnCount;
    this.setCell(row, column, performFocus);
  }

  /**
   * Moves the focus to the next cell in the current row.
   * Emits `focus:overflow` if there is no next cell. 
   */
  focusNext() {
    if (this.focusedColumn < this.columnCount - 1 && this.getIndex() < this.emojiCount - 1) {
      this.setCell(this.focusedRow, this.focusedColumn + 1);
    } else if (this.focusedRow < this.rowCount - 1) {
      this.setCell(this.focusedRow + 1, 0);
    } else if (this.wrap) {
      this.setCell(0, 0);
    } else {
      this.events.emit('focus:overflow', 0);
    }
  }

  /**
   * Moves the focus to the previous cell in the current row.
   * Emits `focus:underflow` if there is no previous cell.
   */
  focusPrevious() {
    if (this.focusedColumn > 0) {
      this.setCell(this.focusedRow, this.focusedColumn - 1);
    } else if (this.focusedRow > 0) {
      this.setCell(this.focusedRow - 1, this.columnCount - 1);
    } else if (this.wrap) {
      this.setCell(this.rowCount - 1, this.columnCount - 1);
    } else {
      this.events.emit('focus:underflow', this.columnCount - 1);
    }
  }

  /**
   * Moves the focus to the cell directly above the current one.
   * Emits `focus:underflow` if the current cell is in the first row.
   */
  focusUp() {
    if (this.focusedRow > 0) {
      this.setCell(this.focusedRow - 1, this.focusedColumn);
    } else {
      this.events.emit('focus:underflow', this.focusedColumn);
    }
  }

  /**
   * Moves the focus to the cell directly below the current one.
   * Emits `focus:overflow` if the current cell is in the last row.
   */
  focusDown() {
    if (this.focusedRow < this.rowCount - 1) {
      this.setCell(this.focusedRow + 1, this.focusedColumn);
    } else {
      this.events.emit('focus:overflow', this.focusedColumn);
    }
  }

  /**
   * Moves the focus to a specific emoji in the category.
   * @param index the index of the emoji to focus on
   */
  focusToIndex(index: number) {
    this.setCell(Math.floor(index / this.columnCount), index % this.columnCount);
  }

  /**
   * Gets the index in the emoji array of the currently focused cell.
   * @returns the currently focused cell's index
   */
  getIndex(): number {
    return (this.focusedRow * this.columnCount) + this.focusedColumn;
  }

  /**
   * Gets the row and column of the currently focused cell.
   * @returns the row and column data
   */
  getCell(): Cell {
    return { row: this.focusedRow, column: this.focusedColumn };
  }

  /**
   * Gets the total number of rows in the grid
   * @returns the number of rows in the grid
   */
  getRowCount() {
    return this.rowCount;
  }
}
