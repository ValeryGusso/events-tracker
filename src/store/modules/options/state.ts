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
	onyNotViewed: boolean;
	lockSubmit: boolean;
}

export const state: OptionsState = {
	type: DisplayType.TABLE,
	search: { type: SearchType.ALL, value: '' },
	onyNotViewed: false,
	lockSubmit: false,
};
