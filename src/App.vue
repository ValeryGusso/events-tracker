<template>
	<header-vue />
	<main-section />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import headerVue from './components/header.vue';
import mainSection from './components/mainSection.vue';
import { CreateEventProps } from '@/store/modules/events/mutations';
import { devices, messages, names, getImportance } from './assets/constants';
import { EventsMutationTypes } from '@/store/modules/events/mutations';

interface Data {
	id: null | ReturnType<typeof setInterval>;
}

export default defineComponent({
	name: 'App',
	data(): Data {
		return { id: null };
	},
	components: { headerVue, mainSection },
	methods: {
		createEvent() {
			const event: CreateEventProps = {
				importance: getImportance(),
				device: devices[Math.floor(Math.random() * devices.length)],
				message: messages[Math.floor(Math.random() * messages.length)],
				operator: names[Math.floor(Math.random() * names.length)],
			};

			this.$store.commit(EventsMutationTypes.ADD_EVENT, event);
		},
	},
	beforeMount() {
		for (let i = 0; i < 12; i++) {
			this.createEvent();
		}
	},
	mounted() {
		this.id = setInterval(() => {
			this.createEvent();
		}, 5000);
	},
});
</script>

<style lang="scss">
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}
:root {
	--color-light: #ededed;
	--transition-fast: 0.3s;
	--transition: 0.5s;
	--text-sm: 20px;
	--text-regular: 24px;
	--text-xl: 32px;
	--text-xxl: 42px;
}
body {
	width: 100vw;
	height: 100vh;
	background-color: #232527;
	overflow: hidden;
	color: var(--color-light);
}
header {
	height: 10vh;
}
main {
	height: 90vh;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	overflow: hidden;
}
</style>
