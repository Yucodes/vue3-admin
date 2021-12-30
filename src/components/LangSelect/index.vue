<template>
  <el-dropdown
    trigger="click"
    class="international"
    @command="handleSetLanguage"
  >
    <div>
      <el-tooltip :content="$t('msg.navBar.lang')" :effect="effect">
        <svg-icon icon="language" />
      </el-tooltip>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :disabled="language === 'zh'" command="zh">
          中文
        </el-dropdown-item>
        <el-dropdown-item :disabled="language === 'en'" command="en">
          English
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script setup>
import { defineProps, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'

defineProps({
  effect: {
    type: String,
    defalut: 'dark',
    validator(value) {
      return ['dark', 'light'].includes(value)
    }
  }
})

const language = computed(() => store.getters.language)

const store = useStore()
const i18n = useI18n()
const handleSetLanguage = (lang) => {
  i18n.locale.value = lang
  store.commit('app/setLanguage', lang)
  ElMessage.success(i18n.t('msg.toast.switchLangSuccess'))
}
</script>
