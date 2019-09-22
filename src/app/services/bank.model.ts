export class Balance {
    currentBalance: number;
}

export class Withdrawal {
    amount: number;
    notes: number[] = [];

    addNote(noteValue: number) {
        this.notes.push(noteValue);
    }
}
