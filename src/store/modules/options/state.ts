import { Importance } from '../events/state';

export enum DisplayType {
	TABLE = 'TABLE',
	CARD = 'CARD',
}

export enum SearchType {
	ALL = 'ALL',
	DEVICE = 'DEVICE',
	MASSAGE = 'MASSAGE',
	OPERATOR = 'OPERATOR',
}

export enum ImportanceAll {
	ALL = 'ALL',
}

export type ImportanceFilter = ImportanceAll | Importance;

export interface ISearch {
	type: SearchType;
	value: string;
}
export interface OptionsState {
	type: DisplayType;
	search: ISearch;
	importance: ImportanceFilter;
	onyNotViewed: boolean;
	lockSubmit: boolean;
}

export const state: OptionsState = {
	type: DisplayType.TABLE,
	search: { type: SearchType.ALL, value: '' },
	importance: ImportanceAll.ALL,
	onyNotViewed: false,
	lockSubmit: false,
};
