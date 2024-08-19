const container = document.querySelector('.container')
const inputValue = document.querySelector('.input')
const add = document.querySelector('.add')

if (localStorage.getItem('todos') === undefined) {
	const todos = []
	localStorage.setItem('todos', JSON.stringify(todos))
}

const todosEX = localStorage.getItem('todos')
const todos = JSON.parse(todosEX)

class item {
	constructor(name) {
		this.createItem(name)
		this.newName = name
	}
	createItem(name) {
		const itemBox = document.createElement('div')
		itemBox.classList.add('item')

		const input = document.createElement('input')
		input.type = 'text'
		input.disabled = true
		input.value = name
		input.classList.add('item_input')

		const edit = document.createElement('button')
		edit.classList.add('edit')
		edit.addEventListener('click', (e) => {
			this.edit(input, name)
			e.target.classList.toggle('edit-active')
			input.classList.toggle('item_input-active')
		})

		const remove = document.createElement('button')
		remove.classList.add('remove')
		remove.addEventListener('click', () => this.remove(itemBox))

		container.appendChild(itemBox)

		itemBox.appendChild(input)
		itemBox.appendChild(edit)
		itemBox.appendChild(remove)
	}

	edit(input, name) {
		if (input.disabled === true) {
			input.disabled = !input.disabled
			input.focus()
		} else {
			input.disabled = !input.disabled
			let indexof = todos.indexOf(name)
			todos[indexof] = input.value
			localStorage.setItem('todos', JSON.stringify(todos))
			this.newName = input.value
			console.log(this.newName)
		}
	}

	remove(itemBox) {
		itemBox.parentNode.removeChild(itemBox)
		console.log(this.newName)
		let index = todos.indexOf(this.newName)
		console.log(index)
		todos.splice(index, 1)
		localStorage.setItem('todos', JSON.stringify(todos))
	}
}

add.addEventListener('click', check)
document.addEventListener('keydown', (e) => {
	if (e.key === 'Enter') {
		check()
	}
})

function check() {
	if (inputValue.value !== '') {
		new item(inputValue.value)
		todos.push(inputValue.value)
		localStorage.setItem('todos', JSON.stringify(todos))
		inputValue.value = ''
	}
}

for (let i = 0; i < todos.length; i++) {
	new item(todos[i])
}
