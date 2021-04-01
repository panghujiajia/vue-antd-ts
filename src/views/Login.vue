<template>
	<div class="container">
		<a-form-model>
			<a-form-model-item label="请选择菜单权限">
				<template v-for="(item, index) in asyncRouterMap">
					<div
						class="access-wrap"
						v-if="!item.meta.role.includes('root')"
						:key="index"
					>
						{{ item.meta.title }}
						<div class="children">
							<span
								v-for="(child, childIndex) in item.children"
								:key="childIndex"
							>
								<a-checkbox
									@change="onChange"
									:value="child.meta.role[0]"
								>
									{{ child.meta.title }}
								</a-checkbox>
							</span>
						</div>
					</div>
				</template>
			</a-form-model-item>
		</a-form-model>
		<br />
		<a-button type="primary" @click="login()">登录</a-button>
	</div>
</template>
<script lang="ts">
import { asyncRouterMap } from '@/router/router.config';
import { Component, Vue } from 'vue-property-decorator';
import { Action, Mutation } from 'vuex-class';
import { addRouters } from '@/router/index';
import { Modal } from 'ant-design-vue';
@Component({
	name: 'login',
})
export default class Login extends Vue {
	@Mutation('saveToken')
	private saveToken!: (token: string) => void;
	@Action('GetInfo')
	private GetInfo!: () => boolean;
	@Mutation('savePermissions')
	private savePermissions!: (data: any) => void;
	private asyncRouterMap: any = [];
	private checkedList: string[] = [];
	private mounted() {
		this.asyncRouterMap = asyncRouterMap[0].children;
	}
	// 勾选权限
	private onChange(e: any) {
		const { value, checked } = e.target;
		const checkedList = this.checkedList;
		if (checked) {
			checkedList.push(value);
		} else {
			const index = checkedList.indexOf(value);
			checkedList.splice(index, 1);
		}
		this.checkedList = checkedList;
	}
	// 获取当前权限的父级权限role
	private getParentRole(role: string) {
		const asyncRouterMap = this.asyncRouterMap;
		for (const item of asyncRouterMap) {
			const children = item.children;
			for (const child of children) {
				if (child.meta.role.includes(role)) {
					return item.meta.role[0];
				}
			}
		}
	}
	// 登录请求
	private async login() {
		// 获取用户勾选的权限
		const checkedList = this.checkedList;
		let permissions: any = [];
		// 获取勾选权限的父权限role
		for (const item of checkedList) {
			const role = this.getParentRole(item);
			permissions.push(item, role);
		}
		permissions = [...new Set(permissions)];
		// 权限应该在GetInfo里调用info接口获取权限，这里仅做示例
		this.savePermissions(permissions);
		const data = await this.GetInfo();
		if (!data) {
			Modal.info({
				title: '提示',
				content: '用户信息获取失败，请重新登录',
				okText: '确认',
			});
			return;
		}
		// 获取用户权限信息后添加路由，避免直接走路由钩子会报 Uncaught (in promise) undefined
		const res = await addRouters();
		this.saveToken('token');
		res && this.$router.push('/');
	}
}
</script>
<style lang="less" scoped>
.container {
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	.access-wrap {
		background: #f8f8f8;
		padding: 10px;
		width: 300px;
		.children {
			padding-left: 30px;
		}
	}
}
</style>
