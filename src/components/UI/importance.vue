<template>
	<Tag
		:severity="getSeverity(importance)"
		:value="importance"
		class="tag"
	></Tag>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Tag from 'primevue/tag';
import { Importance } from '@/store/modules/events/state';

export default defineComponent({
	name: 'importanceTag',
	data() {
		return {
			Importance,
		};
	},
	methods: {
		getSeverity(type: Importance) {
			switch (type) {
				case Importance.LOW:
					return 'success';
				case Importance.MEDIUM:
					return 'info';
				case Importance.HIGH:
					return 'warning';
				case Importance.CRITICAL:
					return 'danger';
			}
		},
	},
	props: {
		importance: { type: String as () => Importance, required: true },
	},
	components: {
		Tag,
	},
});
</script>

<style scoped lang="scss">
.tag {
	width: 120px;
	font-size: var(--text-sm);
	color: var(--color-dark);
}
</style>
