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
export default {
  props: {
    task: {
      type: Object,
      required: true
    },
    column: {
      type: Object,
      required: true
    },
    columnIndex: {
      type: Number,
      required: true
    },
    taskIndex: {
      type: Number,
      required: true
    },
    board: {
      type: Object,
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
    },
    moveTaskOrColumn (e, toTasks, toColumnIndex, toTaskIndex) {
      const type = e.dataTransfer.getData('type')
      if (type === 'task') {
        this.moveTask(e, toTasks, toTaskIndex !== undefined ? toTaskIndex : toTasks.length)
      } else {
        this.moveColumn(e, toColumnIndex)
      }
    },
    moveTask (e, toTasks, toTaskIndex) {
      const fromColumnIndex = e.dataTransfer.getData('from-column-index')
      const fromTasks = this.board.columns[fromColumnIndex].tasks
      const fromTaskIndex = e.dataTransfer.getData('from-task-index')

      this.$store.commit('MOVE_TASK', {
        fromTasks,
        toTasks,
        fromTaskIndex,
        toTaskIndex
      })
    },
    moveColumn (e, toColumnIndex) {
      const fromColumnIndex = e.dataTransfer.getData('from-column-index')

      this.$store.commit('MOVE_COLUMN', { fromColumnIndex, toColumnIndex })
    }
  }
}
</script>

<style>

</style>
