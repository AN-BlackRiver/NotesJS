const noteName = document.getElementById('title')
const btnCreate = document.getElementById('create')
const listNotes = document.getElementById('list')

const arrNotes = [
    {
        title: 'Первая заметка',
        completed: true
    },
    {
        title: 'Вторая заметка',
        completed: false
    },
]

function render() {
    listNotes.innerHTML = ''
    if (arrNotes.length === 0){
        listNotes.innerHTML='<p class="text-center">У вас нет заметок</p>'
    }else {
        for (let i = 0; i < arrNotes.length; i++) {
            listNotes.insertAdjacentHTML('beforeend', printNotes(arrNotes[i], i))
        }
    }
}

render()


btnCreate.onclick = function () {
    if (noteName.value.length === 0) {
        return
    } else {
        const newNote = {
            title: noteName.value,
            completed: false
        }
        arrNotes.push(newNote)
        render()
        noteName.value = ''
    }

}

function printNotes(note, index) {

    return `<li class="list-group-item d-flex justify-content-between align-items-center">
               <span class="${note.completed ? 'text-decoration-line-through' : ''}">${note.title}</span>
                 <span>
                    <button class="btn btn-small btn-${note.completed? 'warning':'success'}"
                     data-index="${index}" data-type="toggle">
                     &check;
                     </button>
                    <button class="btn btn-small btn-danger" 
                    data-index="${index}" data-type="remove">
                    &times;
                    </button>
                 </span>
             </li>`
}

listNotes.onclick = function (event){
    if (event.target.dataset.index){
        const index = Number(event.target.dataset.index)
        const type = event.target.dataset.type

        if (type === 'toggle'){
            arrNotes[index].completed = !arrNotes[index].completed
        } else if (type === 'remove'){
            arrNotes.splice(index,1)
        }

        render()
    }
}