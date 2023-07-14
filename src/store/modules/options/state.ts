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

export interface ISearch {
	type: SearchType;
	value: string;
}
export interface OptionsState {
	type: DisplayType;
	search: ISearch;
	page: number;
	itemsPerPage: number;
}

export const state: OptionsState = {
	type: DisplayType.TABLE,
	page: 0,
	itemsPerPage: 0,
	search: { type: SearchType.ALL, value: '' },
};
