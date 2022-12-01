// import { uuid } from './utils'

export default {
  name: 'workshop',
  columns: [
    {
      name: 'todo',
      tasks: [
        {
          description: 'first task details',
          name: 'first task',
          id: '12a34er',
          userAssigned: null
        },
        {
          description: '',
          name: 'second task',
          id: '12a34et',
          userAssigned: null
        },
        {
          description: '',
          name: 'and thrid',
          id: '12a34ey',
          userAssigned: null
        }
      ]
    },
    {
      name: 'in-progress',
      tasks: [
        {
          description: '',
          name: 'first task',
          id: '12a34eu',
          userAssigned: null
        }
      ]
    },
    {
      name: 'done',
      tasks: [
        {
          description: '',
          name: 'first task',
          id: '12a34ei',
          userAssigned: null
        }
      ]
    }
  ]
}
