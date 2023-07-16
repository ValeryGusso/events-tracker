import { createStore } from 'vuex';
import events from '@/store/modules/events';
import { EventsState } from '@/store/modules/events/state';
import options from '@/store/modules/options';
import { OptionsState } from '@/store/modules/options/state';

export interface RootState {
	events: EventsState;
	options: OptionsState;
}

export default createStore<RootState>({
	modules: { events, options },
});
