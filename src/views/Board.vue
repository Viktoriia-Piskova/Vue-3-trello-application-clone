<template>
  <div class="board">
    <div class="flex flex-row items-start">
      <div class="column" v-for="(column, $columnIndex) of board.columns" :key="$columnIndex">
        <div class="font-bold flex items-center mb-2">
          {{ column.name }}</div>
        <div class="list-reset">
          <div
          class="task"
          v-for="task in column.tasks"
          :key="task.id">
          <span class="font-bold w-full flex flex-no-shrink">
            {{task.name}}</span>
            <p v-if="task.description"
             class="w-full flex flex-no-shrink mt-1 text-sm">
              {{task.description}}
            </p>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState(['board'])
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
