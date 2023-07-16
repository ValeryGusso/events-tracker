<template>
	<header class="container">
		<div class="view">
			<SelectButton
				v-model="displayType"
				@change="setDisplayType"
				:options="displayOptions"
				optionLabel="name"
				optionValue="value"
				aria-labelledby="multiple"
			/>
			<div>
				<p>Только непрочитанные</p>
				<Checkbox
					v-model="onlyNotViewed"
					@input="setOnlyNotViewed"
					:binary="true"
				/>
			</div>
		</div>
		<div class="search">
			<span class="p-float-label">
				<Dropdown
					@change="setImportanceType"
					v-model="importanceType"
					id="dropdown_importance"
					:options="importanceOptions"
					scrollHeight="260px"
					optionLabel="name"
					optionValue="value"
					class="dropdown"
					aria-describedby="dd-error"
				/>
				<label class="dropdown__label" for="dropdown_importance"
					>По важности</label
				>
			</span>
			<span class="p-float-label">
				<Dropdown
					@change="setSearchType"
					v-model="searchParam"
					id="dropdown_search"
					:options="searchOptions"
					scrollHeight="220px"
					optionLabel="name"
					optionValue="value"
					class="dropdown"
					aria-describedby="dd-error"
				/>
				<label class="dropdown__label" for="dropdown_search">Где ищем?</label>
			</span>
			<span class="p-float-label">
				<input-text
					v-model="searchValue"
					id="search"
					@focus="setLockSubmit(true)"
					@blur="setLockSubmit(false)"
				/>
				<label for="search">Что ищем?</label>
			</span>
		</div>
	</header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import inputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import SelectButton from 'primevue/selectbutton';
import Checkbox from 'primevue/checkbox';
import {
	DisplayType,
	SearchType,
	ImportanceFilter,
	ImportanceAll,
} from '@/store/modules/options/state';
import { Importance } from '@/store/modules/events/state';
import { OptionsMutationTypes } from '@/store/modules/options/mutations';

export default defineComponent({
	name: 'headerVue',
	data() {
		return {
			displayOptions: [
				{ name: 'Таблица', value: DisplayType.TABLE },
				{ name: 'Карточки', value: DisplayType.CARD },
			],
			searchOptions: [
				{ name: 'Везде', value: SearchType.ALL },
				{ name: 'Оборудование', value: SearchType.DEVICE },
				{ name: 'Сообщения', value: SearchType.MASSAGE },
				{ name: 'Ответственный', value: SearchType.OPERATOR },
			],
			importanceOptions: [
				{ name: 'Все', value: ImportanceAll.ALL },
				{ name: 'Низкая', value: Importance.LOW },
				{ name: 'Средняя', value: Importance.MEDIUM },
				{ name: 'Высокая', value: Importance.HIGH },
				{ name: 'Критическая', value: Importance.CRITICAL },
			],
			displayType: DisplayType.TABLE,
			searchParam: SearchType.ALL,
			importanceType: ImportanceAll.ALL,
			searchValue: '',
			onlyNotViewed: false,
		};
	},
	methods: {
		setSearchType(e: { value: SearchType }) {
			this.$store.commit(OptionsMutationTypes.SET_SEARCH_TYPE, e.value);
		},
		setImportanceType(e: { value: ImportanceFilter }) {
			this.$store.commit(OptionsMutationTypes.SET_IMPORTANCE_TYPE, e.value);
		},
		setDisplayType(e: { value: DisplayType }) {
			this.$store.commit(OptionsMutationTypes.SET_DISPLAY_TYPE, e.value);
		},
		setOnlyNotViewed(e: boolean) {
			this.$store.commit(OptionsMutationTypes.SET_ONLY_NOT_VIEWED, e);
		},
		setLockSubmit(e: boolean) {
			this.$store.commit(OptionsMutationTypes.SET_LOCK_SUBMIT, e);
		},
	},
	watch: {
		searchValue(newVal) {
			this.$store.commit(OptionsMutationTypes.SET_SEARCH_VALUE, newVal);
		},
	},
	components: { inputText, Checkbox, Dropdown, SelectButton },
});
</script>

<style scoped lang="scss">
.container {
	display: flex;
	align-items: end;
	padding-bottom: 6px;
	justify-content: space-around;
}
.view {
	height: 100%;
	display: flex;
	align-items: center;
	& > div:last-child {
		height: 100%;
		display: flex;
		align-items: center;
		column-gap: 8px;
		margin-left: 12px;
	}
}
.search {
	display: flex;
	column-gap: 12px;
	& .dropdown__label {
		color: var(--color-light);
	}
	& input:focus ~ label {
		color: var(--color-light);
	}
}
.dropdown {
	width: 200px;
}
</style>
