export enum Importance {
	LOW = 'Низкая',
	MEDIUM = 'Средняя',
	HIGH = 'Высокая',
	CRITICAL = 'Критическая',
}

export interface IEvent {
	id: number;
	viewed: boolean;
	date: Date;
	importance: Importance;
	device: string;
	message: string;
	operator: string;
}

export interface EventsState {
	events: IEvent[];
}

export const state: EventsState = {
	events: [],
};
