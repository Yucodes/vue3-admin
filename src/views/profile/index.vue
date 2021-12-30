<template>
  <div class="">
    {{ $t('msg.test') }}
    <el-pagination
      :page-size="100"
      layout="total, prev, pager, next"
      :total="1000"
    >
    </el-pagination>
  </div>
</template>

<script setup>
// import { onMounted } from 'vue'
// onMounted(() => {
//   console.log('i18n', $t('msg'))
// })
</script>

<style lang="scss" scoped></style>
