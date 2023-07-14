import { GetterTree } from 'vuex';
import { RootState } from '@/store';
import { EventsState, IEvent } from './state';
import { SearchType } from '../options/state';

export type Getters = {
	getByFilters(
		state: EventsState,
		getters: Getters,
		root: RootState
	): IEvent[] | null;
};

export const getters: GetterTree<EventsState, RootState> & Getters = {
	getByFilters: (state, _, root) => {
		let result = [...state.events];

		switch (root.options.search.type) {
			case SearchType.DEVICE:
				result = result.filter((event) =>
					event.device.match(new RegExp(root.options.search.value, 'i'))
				);
				break;
			case SearchType.MASSAGE:
				result = result.filter((event) =>
					event.message.match(new RegExp(root.options.search.value, 'i'))
				);
				break;
			case SearchType.OPERATOR:
				result = result.filter((event) =>
					event.operator.match(new RegExp(root.options.search.value, 'i'))
				);
				break;
			case SearchType.ALL:
				result = result.filter(
					(event) =>
						event.operator.match(new RegExp(root.options.search.value, 'i')) ||
						event.message.match(new RegExp(root.options.search.value, 'i')) ||
						event.device.match(new RegExp(root.options.search.value, 'i'))
				);
				break;
		}

		return result.slice(
			root.options.page * root.options.itemsPerPage,
			(root.options.page + 1) * root.options.itemsPerPage + 1
		);
	},
};
