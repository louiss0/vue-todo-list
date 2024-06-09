
export class Task {

    public readonly id: string
    constructor (
        public readonly title: string,
        public readonly details = '',
        public readonly complete= false
    ) {
        
        this.id = Math.random().toString()
    }
}

export type TaskPayloads = {
    title:Pick<Task, 'id'| 'title'>
    details:Pick<Task, 'id'| 'details'>
    complete:Pick<Task, 'id'| 'complete'>
    id:Task['id']
}

export type Tasks = Array<Task>