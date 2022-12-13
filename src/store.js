import Vue from 'vue'
import Vuex from 'vuex'
import defaultBoard from './default-board'
import { saveStatePlugin, uuid } from './utils.js'

Vue.use(Vuex)

const board = JSON.parse(localStorage.getItem('board')) || defaultBoard

export default new Vuex.Store({
  plugins: [saveStatePlugin],
  state: {
    board
  },
  getters: {
    getTask (state) {
      return (id) => {
        for (const column of state.board.columns) {
          for (const task of column.tasks) {
            if (task.id === id) {
              return task
            }
          }
        }
      }
    }
  },
  mutations: {
    CREATE_TASK (state, { tasks, name }) {
      tasks.push({
        name,
        id: uuid(),
        description: ''
      })
    },
    UPDATE_TASK (state, { task, key, value }) {
      Vue.set(task, key, value) // makes these properties reactive in Vue app
    },
    MOVE_TASK (state, { fromColumn, toColumn, taskIndex }) {
      const taskToMove = fromColumn.splice(taskIndex, 1)[0]
      toColumn.push(taskToMove)
    }
  }
})
