import { ComponentCustomProperties } from 'vue';
import { Store } from 'vuex';
import { EventsState } from '@/store/modules/events/state';
import { OptionsState } from '@/store/modules/options/state';

declare module '@vue/runtime-core' {
	interface RootState {
		events: EventsState;
		options: OptionsState;
	}

	interface ComponentCustomProperties {
		$store: Store<RootState>;
	}
}
