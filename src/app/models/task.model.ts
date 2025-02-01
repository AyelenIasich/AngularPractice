export interface Task {
    id: string;
    title: string;
    completed: boolean;
    editing?: boolean;
}

export interface TaskSimple {
    id: number;
    name: string;
}