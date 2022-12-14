<template>
  <div class="task-view">
    <div class="flex flex-col flex-grow items-start justify-between px-4 font-bold">
      <input type="text" :value="task.name" class="p-2 w-full mr-2 block text-xl font-bold"
      @change="updateTaskProperty($event, 'name')"
      @keyup.enter="updateTaskProperty($event, 'name')">
        <!-- <span class="text-sm mt-1"
        v-if="task.description">
          {{task.description}}
        </span> -->
        <textarea
          class="relative border-none w-full bg-transparent px-2 mt-2 leading-normal h-12"
          :value="task.description"
          placeholder="Add task description here"
          @change="updateTaskProperty($event, 'description')"
        />
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
  },
  methods: {
    updateTaskProperty (e, key) {
      this.$store.commit('UPDATE_TASK', {
        task: this.task,
        key,
        value: e.target.value
      }
      )
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
