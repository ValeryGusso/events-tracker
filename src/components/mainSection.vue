<template>
	<main>
		<div
			class="content__card"
			ref="content"
			v-if="$store.state.options.type === DisplayType.CARD"
		>
			<transition-group
				name="list"
				tag="ul"
				v-if="$store.state.events.events.length > 0"
			>
				<card-event
					v-for="event of $store.getters.getByFilters.events"
					:event="event"
					:key="event.id"
					:searched="searched.includes(event.id)"
					@click="click(event.id)"
				/>
			</transition-group>
		</div>
		<div class="content__row" ref="content" v-else>
			<div class="content__row__title" :style="{ '--h': extraHeight + 'px' }">
				<p>Дата</p>
				<p>Важность</p>
				<p>Оборудование</p>
				<p>Сообщение</p>
				<p>Ответсвтенный</p>
			</div>
			<transition-group
				name="list"
				tag="ul"
				v-if="$store.state.events.events.length > 0"
			>
				<row-event
					v-for="(event, i) of $store.getters.getByFilters.events"
					:isOdd="i % 2 > 0"
					:event="event"
					:key="event.id"
					:searched="searched.includes(event.id)"
					@click="click(event.id)"
				/>
			</transition-group>
		</div>
		<div class="footer">
			<Paginator
				@page="setPage"
				:rows="$store.state.options.itemsPerPage"
				:totalRecords="$store.getters.getByFilters.total"
			></Paginator>
			<Button
				label="Выделить всё"
				severity="secondary"
				@click="selectAll"
				raised
			/>
			<Button
				v-if="searched.length"
				label="Очистить"
				severity="secondary"
				@click="searched = []"
				raised
			/>
		</div>
		<Toast />
	</main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Paginator, { PageState } from 'primevue/paginator';
import Toast from 'primevue/toast';
import Button from 'primevue/button';
import cardEvent from './event/cardEvent.vue';
import rowEvent from './event/rowEvent.vue';
import { IEvent } from '@/store/modules/events/state';
import { EventsMutationTypes } from '@/store/modules/events/mutations';
import { OptionsMutationTypes } from '@/store/modules/options/mutations';
import { DisplayType } from '@/store/modules/options/state';

export default defineComponent({
	data() {
		return {
			searched: [] as number[],
			DisplayType,
			totalItems: this.$store.getters.getByFilters.total,
			extraHeight: 0,
		};
	},
	methods: {
		resize() {
			const rect = (
				this.$refs.content as HTMLDivElement
			).getBoundingClientRect();

			const maxRow =
				this.$store.state.options.type === DisplayType.TABLE
					? 1
					: Math.floor(rect.width / 380);
			const maxCol =
				this.$store.state.options.type === DisplayType.TABLE
					? Math.floor((rect.height - 40) / 36)
					: Math.floor(rect.height / 200);

			this.extraHeight = Math.floor(rect.height % maxCol);

			this.$store.commit(
				OptionsMutationTypes.SET_ITEMS_PER_PAGE,
				maxRow * maxCol
			);
		},
		click(id: number) {
			if (this.searched.includes(id)) {
				this.searched = this.searched.filter((el) => el !== id);
			} else {
				this.searched.push(id);
			}

			if (!this.searched.length) return;

			this.$toast.add({
				severity: 'info',
				summary: this.searched.length + ' сообщений выделено',
				detail: 'Нажмите "space" чтобы отметить прочитанными',
				life: 3000,
			});
		},
		selectAll() {
			this.$store.getters.getByFilters.events.forEach((event: IEvent) => {
				if (!event.viewed) {
					this.searched.push(event.id);
				}
			});

			if (!this.searched.length) return;

			this.$toast.add({
				severity: 'info',
				summary: this.searched.length + ' сообщений выделено',
				detail: 'Нажмите "space" чтобы отметить прочитанными',
				life: 5000,
			});
		},
		markAsViewed() {
			this.$store.commit(EventsMutationTypes.VIEW_EVENT, this.searched);
		},
		keypress(e: KeyboardEvent) {
			const count = this.searched.length;
			if (e.code === 'Space' && this.searched.length) {
				this.markAsViewed();
				this.searched = [];

				this.$toast.add({
					severity: 'success',
					summary: 'Готово!',
					detail: count + ' событий просмотренно!',
					life: 3000,
				});
			}
		},
		setPage(e: PageState) {
			this.$store.commit(OptionsMutationTypes.SET_PAGE, e.page);
		},
	},
	watch: {
		['$store.state.options.type']() {
			this.$store.commit(OptionsMutationTypes.SET_PAGE, 0);
			this.resize();
		},
	},
	mounted() {
		this.resize();
		window.addEventListener('resize', this.resize);
		window.addEventListener('keypress', this.keypress);
	},
	unmounted() {
		window.removeEventListener('resize', this.resize);
		window.removeEventListener('keypress', this.keypress);
	},
	components: { Paginator, cardEvent, rowEvent, Toast, Button },
});
</script>

<style scoped lang="scss">
.content__card {
	height: calc(90vh - 70px);
	& ul {
		width: 100vw;
		max-height: 100%;
		display: flex;
		padding: 0 24px;
		row-gap: 12px;
		justify-content: space-around;
		flex-wrap: wrap;
		overflow: hidden;
	}
}
.content__row {
	height: calc(90vh - 70px);
	& ul {
		width: 100vw;
		max-height: 100%;
		display: flex;
		padding: 0 24px;
		flex-wrap: wrap;
		overflow: hidden;
		& div:last-child {
			border-bottom: 2px solid var(--color-light);
		}
	}
}
.content__row__title {
	display: grid;
	padding: 0 24px;
	height: calc(40px + var(--h));
	font-size: var(--text-xl);
	grid-template-columns: 300px 200px 300px 1fr 200px;
	border-bottom: 2px solid var(--color-light);
	& p {
		padding-left: 8px;
		border-right: 2px solid var(--color-light);
	}
	& p:last-child {
		border: none;
	}
}
.footer {
	width: fit-content;
	height: fit-content;
	display: flex;
	padding: 8px 0;
	column-gap: 24px;
}

.list-enter-active,
.list-leave-active {
	transition: all var(--transition) ease;
}
.list-enter-from,
.list-leave-to {
	opacity: 0;
	transform: translateX(-45px);
}
</style>
