
export class Task {

    public readonly id: string
    constructor (
        public readonly title: string,
        public readonly details = '',
        public readonly complete= true
    ) {
        const date = Date.now()
        this.id = date.toString()
    }
}

export type TaskPayloads = {
    title:Pick<Task, 'id'| 'title'>
    details:Pick<Task, 'id'| 'details'>
    complete:Pick<Task, 'id'| 'complete'>
    id:Task['id']
}

export type Tasks = Array<Task>