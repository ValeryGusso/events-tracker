<template>
	<div class="container" :class="{ searched, viewed: event.viewed }">
		<div class="info">
			<div class="info__row">
				<p>Дата</p>
				<p>{{ event.date.toLocaleDateString() }}</p>
			</div>
			<div class="info__row">
				<p>Важность</p>
				<p :style="{ color: getImportanceColor(event.importance) }">
					{{ event.importance }}
				</p>
			</div>
			<div class="info__row">
				<p>Оборудование</p>
				<p>{{ event.device }}</p>
			</div>
			<div class="info__row">
				<p>Сообщение</p>
				<p>{{ event.message }}</p>
			</div>
		</div>
		<div class="name">
			<img :src="defaultAvatar" alt="avatar" draggable="false" />
			<p>{{ event.operator }}</p>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IEvent } from '@/store/modules/events/state';
import { getImportanceColor } from '@/utils/get';
import defaultAvatar from '@/assets/img/default_avatar.png';

export default defineComponent({
	data() {
		return {
			defaultAvatar,
		};
	},
	methods: {
		getImportanceColor,
	},
	props: {
		event: { type: Object as () => IEvent, required: true },
		searched: { type: Boolean, required: true },
	},
});
</script>

<style scoped lang="scss">
.container {
	width: 380px;
	height: 180px;
	display: flex;
	align-items: center;
	border: 2px solid white;
	padding: 12px 20px;
	border-radius: 12px;
	cursor: pointer;
	transition: var(--transition-fast);
}
.searched {
	border: 2px solid #0891b2;
	transform: scale(0.75);
}
.viewed {
	border: 2px solid greenyellow;
	pointer-events: none;
}
.info {
	display: flex;
	flex-direction: column;
	height: 100%;
	justify-content: space-between;
}
.info__row {
	display: flex;
	& p:first-child {
		width: 120px;
	}
}
.name {
	& img {
		width: 80px;
		height: 80px;
		border-radius: 50%;
		user-select: none;
	}
}
</style>
