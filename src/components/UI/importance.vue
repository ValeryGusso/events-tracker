<template>
	<Tag
		v-if="importance === Importance.LOW"
		severity="success"
		:value="Importance.LOW"
		class="tag"
	></Tag>
	<Tag
		v-if="importance === Importance.MEDIUM"
		severity="info"
		:value="Importance.MEDIUM"
		class="tag"
	></Tag>
	<Tag
		v-if="importance === Importance.HIGH"
		severity="warning"
		:value="Importance.HIGH"
		class="tag"
	></Tag>
	<Tag
		v-if="importance === Importance.CRITICAL"
		severity="danger"
		:value="Importance.CRITICAL"
		class="tag"
	></Tag>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Tag from 'primevue/tag';
import { Importance } from '@/store/modules/events/state';

export default defineComponent({
	name: 'importanceName',
	data() {
		return {
			Importance,
		};
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
	font-size: var(--text-sm);
	color: var(--color-dark);
}
</style>
