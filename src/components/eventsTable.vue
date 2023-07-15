<template>
	<DataTable
		:value="$store.getters.getByFilters.events"
		:paginator="true"
		:rows="rows"
		class="p-datatable-sm table"
		showGridlines
		stripedRows
	>
		<template #paginatorend>
			<div class="buttons">
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
		<Column field="date" header="Дата" sortable style="width: 250px">
			<template #body="{ data }">
				<p
					@click="onClick(data.id)"
					:class="{
						table__text: true,
						selected: selected.includes(data.id),
						viewed: data.viewed,
					}"
				>
					{{ getDate(data.date) }}
				</p>
			</template>
		</Column>
		<Column field="importance" header="Важность" style="width: 200px">
			<template #body="{ data }">
				<p
					@click="onClick(data.id)"
					:class="{
						table__text: true,
						selected: selected.includes(data.id),
						viewed: data.viewed,
					}"
				>
					<importance-tag :importance="data.importance" />
				</p>
			</template>
		</Column>
		<Column field="device" header="Оборудование" sortable style="width: 300px"
			><template #body="{ data }">
				<p
					@click="onClick(data.id)"
					:class="{
						table__text: true,
						selected: selected.includes(data.id),
						viewed: data.viewed,
					}"
				>
					{{ data.device }}
				</p>
			</template>
		</Column>
		<Column field="message" header="Сообщение" sortable style="width: auto"
			><template #body="{ data }">
				<p
					@click="onClick(data.id)"
					:class="{
						table__text: true,
						selected: selected.includes(data.id),
						viewed: data.viewed,
					}"
				>
					{{ data.message }}
				</p>
			</template>
		</Column>
		<Column
			field="operator"
			header="Ответственный"
			sortable
			style="width: 200px"
			><template #body="{ data }">
				<p
					@click="onClick(data.id)"
					:class="{
						table__text: true,
						selected: selected.includes(data.id),
						viewed: data.viewed,
					}"
				>
					{{ data.operator }}
				</p>
			</template>
		</Column>
	</DataTable>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import Button from 'primevue/button';
import importanceTag from '@/components//UI/importance.vue';
import { getDate } from '@/utils/get';

export default defineComponent({
	data() {
		return {
			rows: 0,
		};
	},
	methods: {
		getDate,
		calculateSize() {
			this.rows = Math.floor((window.innerHeight - 200) / 38);
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
	components: {
		DataTable,
		Column,
		Button,
		importanceTag,
	},
});
</script>

<style scoped lang="scss">
.table {
	width: 90vw;
	display: flex;
	flex-direction: column;
	row-gap: 6px;
}

.buttons {
	display: flex;
	column-gap: 12px;
}
.table__text {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 37px;
	cursor: pointer;
	transition: var(--transition-fast);
}
.selected {
	background-color: var(--color-transparent-blue);
}
.viewed {
	background-color: var(--color-transparent-green);
	pointer-events: none;
}
</style>
