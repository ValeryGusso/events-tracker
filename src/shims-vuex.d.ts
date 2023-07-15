import { ComponentCustomProperties } from 'vue';
import { Store } from 'vuex';
import { EventsState } from '@/store/modules/events/state';
import { OptionsState } from '@/store/modules/options/state';
import { Getters } from './store/modules/events/getters';

declare module '@vue/runtime-core' {
	interface RootState {
		events: EventsState;
		options: OptionsState;
		getters: Getters;
	}

	interface ComponentCustomProperties {
		$store: Store<RootState>;
	}
}
