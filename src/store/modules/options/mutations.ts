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
	SET_ONLY_NOT_VIEWED = 'OPTIONS/SET_ONLY_NOT_VIEWED',
	SET_LOCK_SUBMIT = 'OPTIONS/SET_LOCK_SUBMIT',
}

export type Mutations<S = OptionsState> = {
	[OptionsMutationTypes.SET_DISPLAY_TYPE](state: S, payload: DisplayType): void;
	[OptionsMutationTypes.SET_SEARCH_TYPE](state: S, payload: SearchType): void;
	[OptionsMutationTypes.SET_SEARCH_VALUE](state: S, payload: string): void;
	[OptionsMutationTypes.SET_ONLY_NOT_VIEWED](state: S, payload: boolean): void;
	[OptionsMutationTypes.SET_LOCK_SUBMIT](state: S, payload: boolean): void;
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
	[OptionsMutationTypes.SET_ONLY_NOT_VIEWED](
		state: OptionsState,
		payload: boolean
	) {
		state.onyNotViewed = payload;
	},
	[OptionsMutationTypes.SET_LOCK_SUBMIT](
		state: OptionsState,
		payload: boolean
	) {
		state.lockSubmit = payload;
	},
};
