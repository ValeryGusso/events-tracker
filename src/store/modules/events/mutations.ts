import { MutationTree } from 'vuex';
import { EventsState, IEvent } from '@/store/modules/events/state';

export type CreateEventProps = Omit<IEvent, 'id' | 'viewed' | 'date'>;

type AddEventPayload = CreateEventProps;

type ViewEventPayload = number[];

export enum EventsMutationTypes {
	ADD_EVENT = 'EVENTS/ADD_EVENT',
	VIEW_EVENT = 'EVENTS/VIEW_EVENT',
}

export type Mutations<S = EventsState> = {
	[EventsMutationTypes.ADD_EVENT](state: S, payload: AddEventPayload): void;
	[EventsMutationTypes.VIEW_EVENT](state: S, payload: ViewEventPayload): void;
};

export const mutations: MutationTree<EventsState> & Mutations = {
	[EventsMutationTypes.ADD_EVENT](
		state: EventsState,
		payload: AddEventPayload
	) {
		state.events.push({
			...payload,
			id: state.events.length,
			date: new Date(),
			viewed: false,
		});
	},
	[EventsMutationTypes.VIEW_EVENT](
		state: EventsState,
		payload: ViewEventPayload
	) {
		state.events.forEach((event) => {
			if (payload.includes(event.id)) {
				event.viewed = true;
			}
		});
	},
};
