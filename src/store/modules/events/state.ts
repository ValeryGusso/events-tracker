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
	events: [
		{
			id: 0,
			viewed: false,
			date: new Date(),
			importance: Importance.LOW,
			device: 'База данных',
			message: 'Ошибка чтения с диска',
			operator: 'Лебедев М.К.',
		},
	],
};
