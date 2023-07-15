import { createStore } from 'vuex';
import events from '@/store/modules/events';
import { EventsState } from '@/store/modules/events/state';
import options from '@/store/modules/options';
import { OptionsState } from '@/store/modules/options/state';
import { Getters } from './modules/events/getters';

export interface RootState {
	events: EventsState;
	options: OptionsState;
	getters: Getters;
}

export default createStore<RootState>({
	modules: { events, options },
});
