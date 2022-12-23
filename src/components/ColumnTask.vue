<template>
    <div class="task"  draggable @dragover.prevent
        @dragenter.prevent @dragstart="pickupTask($event, taskIndex, columnIndex)" @click="goToTask(task)"
        @drop.stop="moveTaskOrColumn($event, column.tasks, columnIndex, taskIndex)">

        <span class="font-bold w-full flex flex-no-shrink">
            {{ task.name }}
        </span>
        <p v-if="task.description" class="w-full flex flex-no-shrink mt-1 text-sm">
            {{ task.description }}
        </p>
    </div>
</template>

<script>

import moveTaskAndColumnMixin from '../mixins/moveTaskAndColumnMixin.js'
export default {
  mixins: [moveTaskAndColumnMixin],
  props: {
    task: {
      type: Object,
      required: true
    },
    taskIndex: {
      type: Number,
      required: true
    }
  },
  methods: {
    goToTask (task) {
      this.$router.push({ name: 'task', params: { id: task.id } })
    },
    pickupTask (e, taskIndex, fromColumnIndex) {
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.dropEffect = 'move'

      e.dataTransfer.setData('from-task-index', taskIndex)
      e.dataTransfer.setData('from-column-index', fromColumnIndex)
      e.dataTransfer.setData('type', 'task')
    }
  }
}
</script>

<style>

</style>
