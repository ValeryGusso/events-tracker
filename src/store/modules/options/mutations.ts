import { MutationTree } from 'vuex';
import {
	DisplayType,
	OptionsState,
	SearchType,
} from '@/store/modules/options/state';

export enum OptionsMutationTypes {
	SET_DISPLAY_TYPE = 'OPTIONS/SET_DISPLAY_TYPE',
	SET_SEARCH_TYPE = 'OPTIONS/SET_SEARCH_TYPE',
	SET_SEARCH_VALUE = 'OPTIONS/SET_SEARCH_VALUE',
	SET_PAGE = 'OPTIONS/SET_PAGE',
	SET_ITEMS_PER_PAGE = 'OPTIONS/SET_ITEMS_PER_PAGE',
}

export type Mutations<S = OptionsState> = {
	[OptionsMutationTypes.SET_DISPLAY_TYPE](state: S, payload: DisplayType): void;
	[OptionsMutationTypes.SET_SEARCH_TYPE](state: S, payload: SearchType): void;
	[OptionsMutationTypes.SET_SEARCH_VALUE](state: S, payload: string): void;
	[OptionsMutationTypes.SET_PAGE](state: S, payload: number): void;
	[OptionsMutationTypes.SET_ITEMS_PER_PAGE](state: S, payload: number): void;
};

export const mutations: MutationTree<OptionsState> & Mutations = {
	[OptionsMutationTypes.SET_DISPLAY_TYPE](
		state: OptionsState,
		payload: DisplayType
	) {
		state.type = payload;
	},
	[OptionsMutationTypes.SET_SEARCH_TYPE](
		state: OptionsState,
		payload: SearchType
	) {
		state.search.type = payload;
	},
	[OptionsMutationTypes.SET_SEARCH_VALUE](
		state: OptionsState,
		payload: string
	) {
		state.search.value = payload;
	},
	[OptionsMutationTypes.SET_PAGE](state: OptionsState, payload: number) {
		state.page = payload;
	},
	[OptionsMutationTypes.SET_ITEMS_PER_PAGE](
		state: OptionsState,
		payload: number
	) {
		state.itemsPerPage = payload;
	},
};
