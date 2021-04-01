<template>
	<div>
		<a-layout id="container">
			<my-sider></my-sider>
			<a-layout>
				<div
					class="header-wrap"
					:style="{
						width: `calc(100vw - ${collapsed ? '80px' : '200px'})`,
						left: collapsed ? '80px' : '200px',
					}"
				>
					<my-header></my-header>
				</div>
				<a-spin
					:spinning="spinning"
					tip="加载中..."
					:delay="500"
					indicator="indicator"
					:style="{
						width: `calc(100vw - ${collapsed ? '80px' : '200px'})`,
					}"
				>
					<a-icon
						slot="indicator"
						type="loading"
						style="font-size: 24px"
						spin
					/>
					<a-layout-content>
						<div class="layout-content">
							<router-view></router-view>
						</div>
					</a-layout-content>
				</a-spin>
			</a-layout>
		</a-layout>
	</div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State, Mutation } from 'vuex-class';
import MyHeader from './Header.vue';
import MySider from './Sider.vue';
import Scrollbar from 'smooth-scrollbar';
@Component({
	name: 'Main',
	components: {
		MyHeader,
		MySider,
	},
})
export default class Main extends Vue {
	@State('spinning') private spinning!: boolean;
	@State('collapsed') private collapsed!: boolean;
	@Mutation('toggleSpinning')
	private toggleSpinning!: (spinning: boolean) => void;
	private mounted() {
		Scrollbar.init(document.querySelector('.layout-content') as any);
	}
}
</script>
<style lang="less" scoped>
#container {
	height: 100vh;
	.ant-layout-sider {
		z-index: 9999;
	}
	.header-wrap {
		position: fixed;
		top: 0;
		z-index: 99;
		width: 100%;
		height: 64px;
		transition: all ease 0.2s;
	}
	.ant-spin-nested-loading {
		height: 100%;
		transition: all ease 0.2s;
		/deep/.ant-spin-spinning {
			max-height: initial;
		}
	}
	/deep/.ant-spin-container {
		overflow: hidden;
	}
	.ant-layout-content {
		margin: 80px 16px 16px;
		border-radius: 10px;
		padding: 16px 0;
		background: #fff;
		height: calc(100vh - 96px);
		.layout-content {
			height: 100%;
			padding: 0 16px;
		}
	}
	/deep/.scrollbar-track {
		background: transparent;
		width: 0;
	}
}
</style>
