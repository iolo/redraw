import type { HistorySnapshot } from '../types';

export class HistoryStack {
  private readonly limit: number;
  private snapshots: HistorySnapshot[];
  private index: number;

  constructor(limit = 40) {
    this.limit = limit;
    this.snapshots = [];
    this.index = -1;
  }

  push(snapshot: HistorySnapshot) {
    const nextSnapshots = this.snapshots.slice(0, this.index + 1);
    nextSnapshots.push(snapshot);

    if (nextSnapshots.length > this.limit) {
      nextSnapshots.shift();
    }

    this.snapshots = nextSnapshots;
    this.index = this.snapshots.length - 1;
  }

  current() {
    return this.snapshots[this.index] ?? null;
  }

  undo() {
    if (this.index <= 0) {
      return null;
    }

    this.index -= 1;
    return this.snapshots[this.index];
  }

  redo() {
    if (this.index >= this.snapshots.length - 1) {
      return null;
    }

    this.index += 1;
    return this.snapshots[this.index];
  }

  canUndo() {
    return this.index > 0;
  }

  canRedo() {
    return this.index >= 0 && this.index < this.snapshots.length - 1;
  }
}
