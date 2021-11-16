<template>
	<Drawer>
		this is {{ user.name }}
	</Drawer>
</template>
<script>
	import Drawer from '../components/Drawer/Drawer.vue'
    import ListLoading from '../components/ListLoading/ListLoading.vue'

    export default {
    	components: {
    		Drawer,
    	},
		data() {
			return {
				user: {},
			}
		},
		created() {
			this.user = this.$store.state.auth.user
		}
    }
</script>