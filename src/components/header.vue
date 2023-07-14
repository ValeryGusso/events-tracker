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
				<h2>Только непросмотренные</h2>
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
					@change="setSearchType"
					v-model="searchParam"
					id="dropdown"
					:options="searchOptions"
					scrollHeight="220px"
					optionLabel="name"
					optionValue="value"
					class="dropdown"
					aria-describedby="dd-error"
				/>
				<label class="dropdown__label" for="dropdown">Где ищем?</label>
			</span>
			<span class="p-float-label">
				<input-text v-model="searchValue" id="search" />
				<label for="search">Что ищем?</label>
			</span>
			<Button label="Найти!" raised />
		</div>
	</header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import inputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import SelectButton from 'primevue/selectbutton';
import Checkbox from 'primevue/checkbox';
import { DisplayType, SearchType } from '@/store/modules/options/state';
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
			displayType: DisplayType.TABLE,
			searchParam: SearchType.ALL,
			searchValue: '',
			onlyNotViewed: false,
		};
	},
	methods: {
		setSearchType(e: { value: SearchType }) {
			this.$store.commit(OptionsMutationTypes.SET_SEARCH_TYPE, e.value);
		},
		setDisplayType(e: { value: DisplayType }) {
			this.$store.commit(OptionsMutationTypes.SET_DISPLAY_TYPE, e.value);
		},
		setOnlyNotViewed(e: boolean) {
			this.$store.commit(OptionsMutationTypes.SET_ONLY_NOT_VIEWED, e);
		},
	},
	watch: {
		searchValue(newVal) {
			this.$store.commit(OptionsMutationTypes.SET_SEARCH_VALUE, newVal);
		},
	},
	components: { inputText, Button, Checkbox, Dropdown, SelectButton },
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
	width: 250px;
}
</style>
