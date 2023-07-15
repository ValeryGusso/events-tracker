import { GetterTree } from 'vuex';
import { RootState } from '@/store';
import { EventsState, IEvent } from './state';
import { SearchType } from '../options/state';

export type Getters = {
	getByFilters(
		state: EventsState,
		getters: Getters,
		root: RootState
	): { events: IEvent[]; total: number };
};

export const getters: GetterTree<EventsState, RootState> & Getters = {
	getByFilters: (state, _, root) => {
		let result = state.events.filter((event) =>
			root.options.onyNotViewed ? !event.viewed : true
		);

		if (root.options.search.value) {
			const regExp = new RegExp(root.options.search.value, 'i');

			switch (root.options.search.type) {
				case SearchType.DEVICE:
					result = result.filter((event) => !!event.device.match(regExp));
					break;
				case SearchType.MASSAGE:
					result = result.filter((event) => !!event.message.match(regExp));
					break;
				case SearchType.OPERATOR:
					result = result.filter((event) => !!event.operator.match(regExp));
					break;
				case SearchType.ALL:
					result = result.filter(
						(event) =>
							!!event.operator.match(regExp) ||
							!!event.message.match(regExp) ||
							!!event.device.match(regExp)
					);
					break;
			}
		}

		return {
			events: result,
			total: result.length,
		};
	},
};
