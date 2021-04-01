<template>
	<div>
		<a-result
			status="404"
			title="404"
			sub-title="对不起，您访问的页面不存在"
		>
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
	name: 'NotFound',
})
export default class NotFound extends Vue {}
</script>
<style lang="less" scoped></style>
