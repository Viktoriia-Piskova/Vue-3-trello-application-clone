<template>
  <div class="task-view">
    <div class="flex flex-col flex-grow items-start justify-between px-4 font-bold">
        {{task.name}}
        <span class="text-sm mt-1"
        v-if="task.description">
          {{task.description}}
        </span>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['getTask']),
    task () {
      return this.getTask(this.$route.params.id) // || 'Ooops, could not find this task'
    }
  }
}
</script>

<style>
.task-view {
  @apply relative flex flex-row bg-white pin mx-4 m-32 mx-auto py-4 text-left rounded shadow;
  max-width: 700px;
}
</style>
