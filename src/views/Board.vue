<template>
  <div class="board">
    <div class="flex flex-row items-start">
      <div
        class="column"
        v-for="(column, $columnIndex) of board.columns"
        :key="$columnIndex"
        draggable
        @drop="moveTaskOrColumn($event, column.tasks, $columnIndex)"
        @dragover.prevent
        @dragenter.prevent
        @dragstart.self="pickupColumn($event, $columnIndex)"
      >
          <div class="font-bold flex items-center mb-2">
            {{ column.name }}
          </div>

        <div class="list-reset">
          <div
            class="task"
            v-for="(task, $taskIndex) of column.tasks"
            :key="task.id"
            draggable
            @dragover.prevent
            @dragenter.prevent
            @dragstart="pickupTask($event, $taskIndex, $columnIndex)"
            @click="goToTask(task)"
            @drop.stop="moveTaskOrColumn($event, column.tasks, $columnIndex, $taskIndex)"
            >

            <span
              class="font-bold w-full flex flex-no-shrink">
              {{task.name}}
            </span>
            <p
              v-if="task.description"
              class="w-full flex flex-no-shrink mt-1 text-sm">
              {{task.description}}
            </p>
          </div>
        </div>

        <input type="text"
          class="block p-2 w-full bg-transparent"
          placeholder="+ Enter new task"
          @keyup.enter="createTask($event, column.tasks)"
          />
      </div>
    </div>
  <div class="task-bg"
    v-if="taskIsOpen"
    @click.self="close">
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: { ...mapState(['board']),
    taskIsOpen () {
      return this.$route.name === 'task'
    }
  },
  methods: {
    goToTask (task) {
      this.$router.push({ name: 'task', params: { id: task.id } })
    },
    close () { this.$router.push({ name: 'board' }) },
    createTask (event, tasks) {
      this.$store.commit('CREATE_TASK', {
        tasks,
        name: event.target.value // to read the value of input
      })
      event.target.value = ''
    },
    pickupTask (e, taskIndex, fromColumnIndex) {
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.dropEffect = 'move'

      e.dataTransfer.setData('from-task-index', taskIndex)
      e.dataTransfer.setData('from-column-index', fromColumnIndex)
      e.dataTransfer.setData('type', 'task')
    },
    pickupColumn (e, fromColumnIndex) {
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.dropEffect = 'move'

      e.dataTransfer.setData('from-column-index', fromColumnIndex)
      e.dataTransfer.setData('type', 'column')
    },
    moveTaskOrColumn (e, toTasks, toColumnIndex, toTaskIndex) {
      // debugger
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

<style lang="css">
.task {
  @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-grey-darkest no-underline;
}

.column {
  @apply bg-grey-light p-2 mr-4 text-left shadow rounded;
  min-width: 350px;
}

.board {
  @apply p-4 bg-teal-dark h-full overflow-auto;
}

.task-bg {
  @apply pin absolute;
  background: rgba(0, 0, 0, 0.5);
}
</style>
