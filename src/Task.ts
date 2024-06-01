
export class Task {

    public readonly id: string
    public readonly complete: boolean
    constructor (
        public readonly title: string,
        public readonly details?: string,
    ) {
        const date = Date.now()
        this.complete = true
        this.id = date.toString()
    }
}

export type Tasks = Array<Task>