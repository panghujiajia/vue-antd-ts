<template>
	<a-layout-sider v-model="collapsed" :trigger="null" collapsible>
		<div class="logo-wrap" @click="handleClickMenu('/data/screen')">
			<img
				class="logo"
				src="//logo.png"
				alt=""
			/>
			<h1>管理系统</h1>
		</div>
		<div class="menu-list">
			<a-menu theme="dark" mode="inline" :selectedKeys="selectedKeys">
				<template v-for="(item, index) in menuList">
					<a-sub-menu v-if="!item.meta.invisible" :key="index">
						<span slot="title">
							<a-icon :type="item.meta.icon" />
							<span>{{ item.meta.title }}</span>
						</span>
						<template v-for="child in item.children">
							<a-menu-item
								v-if="!child.meta.invisible"
								:key="`/${item.path}/${child.path}`"
								@click="
									handleClickMenu(
										`/${item.path}/${child.path}`
									)
								"
								>{{ child.meta.title }}
							</a-menu-item>
						</template>
					</a-sub-menu>
					<template v-else>
						<template v-for="child in item.children">
							<a-menu-item
								v-if="!child.meta.invisible"
								:key="`/${item.path}/${child.path}`"
								@click="
									handleClickMenu(
										`/${item.path}/${child.path}`
									)
								"
							>
								<a-icon :type="child.meta.icon" />
								<span>{{ child.meta.title }}</span>
							</a-menu-item>
						</template>
					</template>
				</template>
			</a-menu>
		</div>
	</a-layout-sider>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Mutation, State } from 'vuex-class';
import Scrollbar from 'smooth-scrollbar';
@Component({
	name: 'MySider',
	components: {},
})
export default class MySider extends Vue {
	@State('collapsed') private collapsed!: boolean;
	@State('menuList') private menuList!: any;
	private selectedKeys: string[] = []; // 选中的菜单
	private mounted() {
		this.selectedKeys = [this.$route.path];
		Scrollbar.init(document.querySelector('.menu-list') as any);
	}
	// 点击菜单
	private handleClickMenu(path: string) {
		this.selectedKeys = [path];
		if (this.$route.fullPath === path) return;
		this.$router.push(path);
	}
}
</script>
<style lang="less" scoped>
.menu-list {
	height: calc(100vh - 84px);
}
.logo-wrap {
	height: 32px;
	margin: 16px 24px;
	overflow: hidden;
	cursor: pointer;
	.logo {
		height: 32px;
		width: 32px;
		vertical-align: middle;
		border-radius: 5px;
	}
	h1 {
		color: #fff;
		display: inline-block;
		font-size: 20px;
		margin: 0 0 0 12px;
		font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
		font-weight: 600;
		vertical-align: middle;
	}
}
</style>
