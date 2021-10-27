<template>
	<custom-button>
		Sample button
	</custom-button>
	<br>
	<br>
	<input type="text" v-model="message"><br>
	<p>This is what you've inputted: {{ message }}</p>
</template>

<script>
	import CustomButton from '../components/Button/Button.vue'

	export default {
		components: {
			CustomButton
		},
		data() {
			return {
				message: 'Hello ken!'
			}
		}
	}
</script>