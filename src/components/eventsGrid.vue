<template>
	<DataView
		:value="$store.getters.getByFilters.events"
		:totalRecords="$store.getters.getByFilters.total"
		:rows="rows"
		layout="grid"
		class="container"
		dataKey="IEvent"
		paginator
	>
		<template #paginatorend>
			<div class="buttons">
				<p>
					Всего {{ $store.getters.getByFilters.total }}
					{{ getCorrectEventsForm($store.getters.getByFilters.total) }} ({{
						$store.getters.getByFilters.notViewed
					}}
					непрочитанных)
				</p>
				<Button
					v-if="selected.length"
					@click="clearAll"
					label="Очистить"
					severity="secondary"
					raised
				/>
				<Button
					@click="selectAll"
					label="Выделить всё"
					severity="secondary"
					raised
				/>
			</div>
		</template>
		<template #grid="slotProps">
			<div class="col-12 sm:col-12 lg:col-6 xl:col-4 p-2" ref="card">
				<div
					@click="onClick(slotProps.data.id)"
					class="card px-4 py-1 border-2 surface-border surface-card border-round"
					:class="{
						selected: selected.includes(slotProps.data.id),
						viewed: slotProps.data.viewed,
					}"
				>
					<div class="info">
						<div class="info__row">
							<p>Дата</p>
							<p>{{ getDate(slotProps.data.date) }}</p>
						</div>
						<div class="info__row">
							<p>Важность</p>
							<p>
								<importance-tag :importance="slotProps.data.importance" />
							</p>
						</div>
						<div class="info__row">
							<p>Оборудование</p>
							<p>{{ slotProps.data.device }}</p>
						</div>
						<div class="info__row">
							<p>Сообщение</p>
							<p>{{ slotProps.data.message }}</p>
						</div>
					</div>
					<div class="name">
						<img :src="defaultAvatar" alt="avatar" draggable="false" />
						<p>{{ slotProps.data.operator }}</p>
					</div>
				</div>
			</div>
		</template>
	</DataView>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import DataView from 'primevue/dataview';
import Button from 'primevue/button';
import importanceTag from '@/components//UI/importance.vue';
import defaultAvatar from '@/assets/img/default_avatar.png';
import { getDate, getCorrectEventsForm } from '@/utils/get';

export default defineComponent({
	data() {
		return { defaultAvatar, rows: 12 };
	},
	methods: {
		getDate,
		getCorrectEventsForm,
		calculateSize() {
			const rect = (this.$refs.card as HTMLDivElement)?.getBoundingClientRect();

			if (!rect) return;

			const { innerWidth, innerHeight } = window;

			const maxCol = Math.floor((innerWidth * 0.92) / rect.width);
			const maxRow = Math.floor((innerHeight - 80 - 68 - 6) / rect.height);
			this.rows = maxCol * maxRow;
		},
	},
	mounted() {
		this.calculateSize();
		window.addEventListener('resize', this.calculateSize);
	},
	unmounted() {
		window.removeEventListener('resize', this.calculateSize);
	},
	props: {
		selected: { type: Array as () => number[], required: true },
		onClick: {
			type: Function as PropType<(id: number) => void>,
			required: true,
		},
		selectAll: { type: Function as PropType<() => void>, required: true },
		clearAll: { type: Function as PropType<() => void>, required: true },
	},
	components: { DataView, Button, importanceTag },
});
</script>

<style scoped lang="scss">
.container {
	width: 90vw;
	display: flex;
	flex-direction: column;
	row-gap: 6px;
}
.card {
	height: 140px;
	display: flex;
	justify-content: space-between;
	box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
	cursor: pointer;
	transition: var(--transition-fast);
	overflow: hidden;
}
.info {
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
.info__row {
	display: flex;
	align-items: center;
	& p:first-child {
		width: 120px;
	}
	& p:last-child {
		width: calc(100% - 120px);
		padding-right: 8px;
	}
}
.name {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
	& img {
		width: 80px;
		height: 80px;
		border-radius: 50%;
		user-select: none;
	}
}
.selected {
	transform: scale(0.9);
	background-color: var(--color-transparent-blue) !important;
	box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.5);
}
.viewed {
	background: var(--color-transparent-green) !important;
	pointer-events: none !important;
}
.buttons {
	display: flex;
	align-items: center;
	column-gap: 12px;
	& p {
		margin-right: 12px;
		font-size: var(--text-regular);
	}
}
</style>
