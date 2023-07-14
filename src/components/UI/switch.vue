<template>
	<ul class="switch">
		<li class="active"></li>
		<li v-for="item of options" :key="item.id" @click="click(item.id)">
			{{ item.title }}
		</li>
	</ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

interface SwitchItem {
	id: number;
	title: string;
	value: string | number;
}

export default defineComponent({
	name: 'switchBar',
	data() {
		return {};
	},
	methods: {
		click(value: string | number) {
			console.log(value);
			this.$emit('modelValue:update', value);
		},
	},
	props: {
		options: {
			type: Array as () => SwitchItem[],
			required: true,
		},
		active: {
			type: Number,
			required: true,
		},
	},
});
</script>

<style scoped lang="scss">
.switch {
	position: relative;
	display: flex;
	width: fit-content;
	height: fit-content;
	user-select: none;
	& li {
		list-style: none;
		width: 100px;
		height: 44px;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 2px solid var(--color-light);
		cursor: pointer;
	}
	& li:last-child {
		border-left: none;
	}
}
.active {
	position: absolute;
	background-color: #5286be;
	z-index: -10;
}
</style>
