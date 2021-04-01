<template>
	<a-layout-header style="background: #fff; padding: 0">
		<div class="header-wrap">
			<a-icon
				class="trigger"
				:type="collapsed ? 'menu-unfold' : 'menu-fold'"
				@click="changeCollapsed"
			/>
			<div class="header-right-wrap">
				<div class="user-info">
					<span>
						欢迎您：<b v-if="userInfo">{{ userInfo.name }}</b>
					</span>
					<a-button
						:size="antConfig.buttonSize"
						type="link"
						icon="logout"
						@click="loginOut()"
					>
						退出登录
					</a-button>
				</div>
			</div>
		</div>
	</a-layout-header>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Mutation, State } from 'vuex-class';
@Component({
	name: 'MyHeader',
	components: {},
})
export default class MyHeader extends Vue {
	@State('antConfig') private antConfig!: object;
	@State('collapsed') private collapsed!: boolean;
	@State('userInfo') private userInfo!: any;
	@Mutation('toggleCollapsed')
	private toggleCollapsed!: (collapsed: boolean) => void;
	@Mutation('loginOutMutation')
	private loginOutMutation!: () => void;
	private mounted() {}
	// 修改状态
	private changeCollapsed() {
		this.toggleCollapsed(!this.collapsed);
	}
	// 退出登录
	private async loginOut() {
		this.loginOutMutation();
		this.$router.push('/login');
	}
}
</script>

<style lang="less" scoped>
.header-wrap {
	display: flex;
	justify-content: space-between;
	align-items: center;
	box-shadow: 0 2px 8px #f0f1f2;
	.header-right-wrap {
		display: flex;
		align-items: center;
	}
	.trigger {
		font-size: 18px;
		padding: 0 24px;
		cursor: pointer;
		transition: color 0.3s;
		&:hover {
			color: #1890ff;
		}
	}
}
</style>
