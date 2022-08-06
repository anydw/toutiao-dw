<template>
  <div>
    <van-cell
      >搜索历史
      <template #right-icon>
        <van-icon name="delete" class="delete-o" @click="isDeleteClick"/>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped lang="less">
.delete-o {
  color: #969799;
}
</style>
