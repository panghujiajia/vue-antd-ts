<template>
	<div>
		<!-- 如果有二级标题就显示面包屑 -->
		<a-breadcrumb class="breadcrumb" v-if="$route.meta.breadcrumb">
			<a-breadcrumb-item
				v-for="(item, index) in $route.meta.breadcrumb"
				:key="index"
			>
				<a v-if="index == 0" @click="$router.go(-1)">{{ item }}</a>
				<template v-else>{{ item }}</template>
			</a-breadcrumb-item>
		</a-breadcrumb>
		<router-view></router-view>
	</div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component({
	name: 'PageView',
})
export default class PageView extends Vue {}
</script>
<style lang="less" scoped>
.breadcrumb {
	border-left: 5px solid #1890ff;
	margin-bottom: 10px;
	padding-left: 10px;
}
</style>
