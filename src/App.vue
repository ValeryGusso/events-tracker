<template>
	<header-vue />
	<main-section />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { devices, messages, names } from '@/assets/constants';
import { getImportance } from '@/utils/get';
import { CreateEventProps } from '@/store/modules/events/mutations';
import { EventsMutationTypes } from '@/store/modules/events/mutations';
import headerVue from '@/components/header.vue';
import mainSection from '@/components/mainSection.vue';

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
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
		Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
}
td {
	padding: 0 !important;
}
:root {
	--color-light: #ededed;
	--color-dark: #232527;
	--color-transparent-green: #bbf7d05f;
	--color-transparent-blue: #2563eb35;
	--transition-fast: 0.3s;
	--transition: 0.5s;
	--text-sm: 16px;
	--text-regular: 20px;
}
body {
	width: 100vw;
	height: 100vh;
	background-color: var(--color-dark);
	overflow: hidden;
	color: var(--color-light);
}
header {
	height: 80px;
}
main {
	height: calc(100vh - 80px);
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	overflow: hidden;
}
</style>
