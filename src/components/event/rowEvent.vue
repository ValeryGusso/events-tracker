<template>
	<div
		class="container"
		:class="{ searched, viewed: event.viewed, odd: isOdd }"
	>
		<p>{{ getDate(event.date) }}</p>
		<p :style="{ color: getImportanceColor(event.importance) }">
			{{ event.importance }}
		</p>
		<p>{{ event.device }}</p>
		<p>{{ event.message }}</p>
		<p>{{ event.operator }}</p>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IEvent } from '@/store/modules/events/state';
import { getDate, getImportanceColor } from '@/utils/get';

export default defineComponent({
	data() {
		return {};
	},
	methods: {
		getDate,
		getImportanceColor,
	},
	props: {
		event: { type: Object as () => IEvent, required: true },
		searched: { type: Boolean, required: true },
		isOdd: { type: Boolean, required: true },
	},
});
</script>

<style scoped lang="scss">
.container {
	width: 100%;
	display: grid;
	grid-template-columns: 300px 200px 300px 1fr 200px;
	cursor: pointer;
	transition: var(--transition-fast);
	& p {
		padding: 8px 0;
		padding-left: 8px;
		border-right: 2px solid var(--color-light);
	}
	& p:last-child {
		border: none;
	}
}
.searched {
	background-color: olivedrab !important;
}
.viewed {
	pointer-events: none;
}
.odd {
	background-color: #5f5f5f;
}
</style>
