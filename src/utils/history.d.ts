import { HistorySnapshot } from '../types';
export declare class HistoryStack {
    private readonly limit;
    private snapshots;
    private index;
    constructor(limit?: number);
    push(snapshot: HistorySnapshot): void;
    current(): HistorySnapshot;
    undo(): HistorySnapshot | null;
    redo(): HistorySnapshot | null;
    canUndo(): boolean;
    canRedo(): boolean;
}
