<template>
    <div class="column" draggable
        @drop="moveTaskOrColumn($event, column.tasks, columnIndex)" @dragover.prevent @dragenter.prevent
        @dragstart.self="pickupColumn($event, columnIndex)">
        <div class="font-bold flex items-center mb-2">
            {{ column.name }}
        </div>

        <div class="list-reset">
            <ColumnTask v-for="(task, $taskIndex) of column.tasks"
                :key="task.id"
                :task="task"
                :column="column"
                :taskIndex="$taskIndex"
                :columnIndex="columnIndex"
                :board="board"/>
        </div>

        <input type="text" class="block p-2 w-full bg-transparent" placeholder="+ Enter new task"
            @keyup.enter="createTask($event, column.tasks)" />
    </div>
</template>

<script>
import ColumnTask from '@/components/ColumnTask'
import moveTaskAndColumnMixin from '../mixins/moveTaskAndColumnMixin.js'

export default {
  mixins: [moveTaskAndColumnMixin],
  methods: {
    createTask (event, tasks) {
      this.$store.commit('CREATE_TASK', {
        tasks,
        name: event.target.value // to read the value of input
      })
      event.target.value = ''
    },
    pickupColumn (e, fromColumnIndex) {
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.dropEffect = 'move'

      e.dataTransfer.setData('from-column-index', fromColumnIndex)
      e.dataTransfer.setData('type', 'column')
    }
  },
  components: {
    ColumnTask
  }

}
</script>

<style scoped>

</style>
