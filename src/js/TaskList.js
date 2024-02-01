class TaskList {
	constructor () {

this.DEBUG = true;

		this.list = [];
		this.lastId = 0;
	}

	// Método privado
	incrementId () {
		this.lastId++;
	}

	createNewTask (description_) {
		let task = new Task(
			this.lastId,
			description_
			);

		return task;
	}

	insertNewTask (description_) {
		this.list.push (this.createNewTask (description_));
	}

	NewTask (description_) {
		this.insertNewTask (description_);
		this.incrementId ();
	}

	getIndexTask (taskId_) {
		return this.list.findIndex((element_) => element_.GetId() == taskId_);
	}

	doneTask (taskId_) {
		this.list[this.getIndexTask(taskId_)].Done();
	}

	undoneTask (taskId_) {
		this.list[this.getIndexTask(taskId_)].Undone();
	}

	ChangeDoneTask (taskId_) {
		if (this.list[this.getIndexTask(taskId_)].GetIsDone())
			this.undoneTask(taskId_);
		else
			this.doneTask(taskId_);
	}

	DeleteTask (taskId_) {
		return this.list.splice(
			this.getIndexTask(taskId_),
			1
		);
	}

	GetTask (taskId_) {
		return this.list[this.getIndexTask(taskId_)];
	}

	GetTaskIndexOf (index_) {
		return this.list[index_];
	}

	GetLength () {
		return this.list.length;
	}

	GetLastTask() {
		return this.list[this.list.length - 1];
	}

	getJSON() {
		return JSON.stringify(this.list);
	}

	SaveLocalStorage(name_) {
		localStorage.setItem(name_, this.getJSON());
	}

	OpenLocalStorage (name_) {
		let objListTmp = JSON.parse(localStorage.getItem(name_));

		for (let i = 0; i < objListTmp.length; i++) {
			this.lastId = objListTmp[i].id;
			this.insertNewTask(objListTmp[i].description);
			if (objListTmp[i].isDone)
				this.doneTask(objListTmp[i].id);
			else
				this.undoneTask(objListTmp[i].id);
		}
		this.incrementId();
	}
}