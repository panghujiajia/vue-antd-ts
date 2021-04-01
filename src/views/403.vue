<template>
	<div>
		<a-result status="403" title="403" sub-title="对不起，暂无访问权限">
			<template #extra>
				<a-button type="primary" @click="$router.go(-2)">
					返回上一页
				</a-button>
			</template>
		</a-result>
	</div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component({
	name: 'NoAccess',
})
export default class NoAccess extends Vue {}
</script>
<style lang="less" scoped></style>
