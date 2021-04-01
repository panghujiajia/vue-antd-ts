<template>
	<div id="app">
		<a-config-provider :locale="locale">
			<router-view></router-view>
		</a-config-provider>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
@Component({
	name: 'app',
	components: {},
})
export default class App extends Vue {
	private locale = zhCN; // ant默认语言为英文 切换语言为中文
}
</script>

<style lang="less">
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
</style>
