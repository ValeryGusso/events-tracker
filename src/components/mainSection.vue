<template>
	<main>
		<div class="content" v-if="$store.state.options.type === DisplayType.CARD">
			<events-grid
				:selected="selected"
				:onClick="click"
				:selectAll="selectAll"
				:clearAll="clearAll"
			/>
		</div>
		<div class="content" v-else>
			<events-table
				:selected="selected"
				:onClick="click"
				:selectAll="selectAll"
				:clearAll="clearAll"
			/>
		</div>
		<Toast />
	</main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Toast from 'primevue/toast';
import eventsGrid from '@/components/eventsGrid.vue';
import eventsTable from '@/components/eventsTable.vue';
import { IEvent } from '@/store/modules/events/state';
import { EventsMutationTypes } from '@/store/modules/events/mutations';
import { DisplayType } from '@/store/modules/options/state';

export default defineComponent({
	data() {
		return {
			selected: [] as number[],
			DisplayType,
		};
	},
	methods: {
		sendSelectedToast() {
			this.$toast.add({
				severity: 'info',
				summary: this.selected.length + ' событий выбрано!',
				detail: 'Нажмите "space" чтобы отметить их прочитанными.',
				life: 3000,
			});
		},
		click(id: number) {
			if (this.selected.includes(id)) {
				this.selected = this.selected.filter((el) => el !== id);
			} else {
				this.selected.push(id);
			}

			if (!this.selected.length) return;

			this.sendSelectedToast();
		},
		selectAll() {
			if (this.$store.getters.getByFilters.notViewed === this.selected.length) {
				return;
			}

			this.$store.getters.getByFilters.events.forEach((event: IEvent) => {
				if (!event.viewed && !this.selected.includes(event.id)) {
					this.selected.push(event.id);
				}
			});

			if (!this.selected.length) return;

			this.sendSelectedToast();
		},
		clearAll() {
			this.$toast.add({
				severity: 'warn',
				summary: 'Список успешно очищен!',
				detail:
					'Для выбора собития нажмите на него или воспользуйтесь кнопкой снизу.',
				life: 5000,
			});
			this.selected = [];
		},
		markAsViewed() {
			this.$store.commit(EventsMutationTypes.VIEW_EVENTS, this.selected);
			this.selected = [];
		},
		keypress(e: KeyboardEvent) {
			const count = this.selected.length;
			if (
				e.code === 'Space' &&
				count &&
				!this.$store.state.options.lockSubmit
			) {
				this.markAsViewed();

				this.$toast.add({
					severity: 'success',
					summary: 'Готово!',
					detail: count + ' событий просмотренно.',
					life: 5000,
				});
			}
		},
	},
	mounted() {
		window.addEventListener('keypress', this.keypress);
	},
	unmounted() {
		window.removeEventListener('keypress', this.keypress);
	},
	components: {
		Toast,
		eventsTable,
		eventsGrid,
	},
});
</script>

<style scoped lang="scss">
.content {
	height: calc(90vh - 70px);
}
</style>
