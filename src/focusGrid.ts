import { Events } from './events';

type FocusGridEvent = 'focus:change' | 'focus:underflow' | 'focus:overflow';

export type FocusChangeEvent = {
  from: number;
  to: number;
  performFocus: boolean;
};

export class FocusGrid {
  private focusedRow: number;
  private focusedColumn: number;
  private rowCount: number;
  private columnCount: number;
  private emojiCount: number;

  private events = new Events<FocusGridEvent>();

  private keyHandlers = {
    ArrowLeft: this.focusPrevious.bind(this),
    ArrowRight: this.focusNext.bind(this),
    ArrowUp: this.focusUp.bind(this),
    ArrowDown: this.focusDown.bind(this)
  };

  constructor(columnCount: number, emojiCount: number, currentRow = 0, currentColumn = 0) {
    this.rowCount = Math.ceil(emojiCount / columnCount);
    this.columnCount = columnCount;
    this.focusedRow = currentRow;
    this.focusedColumn = currentColumn;
    this.emojiCount = emojiCount;

    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  destroy() {
    this.events.removeAll();
  }

  on(event: FocusGridEvent, handler: (...args: any[]) => void) {
    this.events.on(event, handler);
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key in this.keyHandlers) {
      event.preventDefault();
      this.keyHandlers[event.key]();
    }
  }

  setCell(row: number, column?: number, performFocus = true) {
    const previousIndex = this.getIndex();
    this.focusedRow = row;

    if (column !== undefined) {
      this.focusedColumn = Math.min(this.columnCount, column);
    }

    // If the given cell is out of bounds, focus to the last cell.
    if (this.focusedRow >= this.rowCount || this.getIndex() >= this.emojiCount) {
      this.focusedRow = this.rowCount - 1;
      this.focusedColumn = (this.emojiCount % this.columnCount) - 1;
    }

    this.events.emit('focus:change', { from: previousIndex, to: this.getIndex(), performFocus });
  }

  focusNext() {
    if (this.focusedColumn < this.columnCount - 1 && this.getIndex() < this.emojiCount - 1) {
      this.setCell(this.focusedRow, this.focusedColumn + 1);
    } else if (this.focusedRow < this.rowCount - 1) {
      this.setCell(this.focusedRow + 1, 0);
    } else {
      this.events.emit('focus:overflow', 0);
    }
  }

  focusPrevious() {
    if (this.focusedColumn > 0) {
      this.setCell(this.focusedRow, this.focusedColumn - 1);
    } else if (this.focusedRow > 0) {
      this.setCell(this.focusedRow - 1, this.columnCount - 1);
    } else {
      this.events.emit('focus:underflow', this.columnCount - 1);
    }
  }

  focusUp() {
    if (this.focusedRow > 0) {
      this.setCell(this.focusedRow - 1, this.focusedColumn);
    } else {
      this.events.emit('focus:underflow', this.focusedColumn);
    }
  }

  focusDown() {
    if (this.focusedRow < this.rowCount - 1) {
      this.setCell(this.focusedRow + 1, this.focusedColumn);
    } else {
      this.events.emit('focus:overflow', this.focusedColumn);
    }
  }

  focusTo(row: number, column?: number, performFocus?: boolean) {
    this.setCell(row, column, performFocus);
  }

  focusToIndex(index: number) {
    this.setCell(Math.floor(index / this.columnCount), index % this.columnCount);
  }

  getIndex() {
    return (this.focusedRow * this.columnCount) + this.focusedColumn;
  }

  getCell() {
    return { row: this.focusedRow, column: this.focusedColumn };
  }

  getRowCount() {
    return this.rowCount;
  }
}