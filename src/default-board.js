// import { uuid } from './utils'

export default {
  name: 'workshop',
  columns: [
    {
      name: 'todo',
      tasks: [
        {
          description: 'first task details',
          name: 'The first task',
          id: '12a34er',
          userAssigned: null
        },
        {
          description: '',
          name: 'Second todo task',
          id: '12a34et',
          userAssigned: null
        },
        {
          description: 'Get ready to drag&drop everything',
          name: 'Get ready',
          id: '12a34ey',
          userAssigned: null
        }
      ]
    },
    {
      name: 'in-progress',
      tasks: [
        {
          description: 'This is description for in progress task',
          name: 'first in-progress task',
          id: '12a34eu',
          userAssigned: null
        },
        {
          description: '',
          name: 'Another task in progress',
          id: '12a34ea',
          userAssigned: null
        }
      ]
    },
    {
      name: 'done',
      tasks: [
        {
          description: 'Ready to be checked task in done column',
          name: 'Done task',
          id: '12a34ei',
          userAssigned: null
        },
        {
          description: 'Done properly',
          name: 'Best task ever',
          id: '12a34es',
          userAssigned: null
        }
      ]
    }
  ]
}
