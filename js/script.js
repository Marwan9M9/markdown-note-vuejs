Vue.filter('date', time => moment(time)
  .format('DD/MM/YY, HH:mm')
)

new Vue({
  name: 'MarkDown',
  el: '#markdown',
  data() {
    return {
      notes: JSON.parse(localStorage.getItem('notes')) || [],
      noteId: localStorage.getItem('note-id') || null
    }
  },
  methods: {
    addNote() {
      let time = Date.now()
      let note = {
        id: String(time),
        title: 'new title ' + (this.notes.length + 1),
        content: 'content ' + (this.notes.length + 1),
        created: time,
        favorite: false
      }
      this.notes.push(note)
    },
    signNoteId(note) {
      this.noteId = note.id
    },
    saveNotes() {
      localStorage.setItem('notes', JSON.stringify(this.notes))
    },
    removeNote() {
      if (this.selectedNote && confirm('Delete this note?')) {
        const index = this.notes.indexOf(this.selectedNote)
        this.selectedNote.title === ''
        this.notes.splice(index, 1)
      }
    },
    addFavorite() {
      this.selectedNote.favorite = !this.selectedNote.favorite
    }
  },
  computed: {
    selectedNote() {
      return this.noteId ? this.notes.find(note => note.id === this.noteId) : ''
    },
    sortNotes() {
      return this.notes.slice()
        .sort((a, b) => a.created - b.created)
        .sort((a, b) => (a.favorite === b.favorite) ? 0
          : a.favorite ? -1
          : 1
        )
    }
  },
  watch: {
    notes: {
      handler: 'saveNotes',
      deep: true
    },
    noteId(val) {
      localStorage.setItem('note-id', val)
    }
  }
})