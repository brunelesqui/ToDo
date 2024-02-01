class ToDo {
	constructor () {
		const TITLE = "TO DO";
		this.LOCAL_STORAGE_NAME = "taskList";

		document.title = TITLE + " v." + getVersion();
		document.getElementById("version").innerHTML += getVersion();
		document.getElementById("modalTitle").innerHTML = TITLE;

		try {
			this.list = new TaskList();
			this.loadTaskList();
		} catch(error_) {		
console.log(error_.message);			
		}		
	}

	GetList() {
		return this.list;
	}

	setMessageAlert(message_) {
		document.getElementById("modalMessage").innerHTML = message_;
	}

	enableAlert() {
		document.getElementById("modalWindow").style.display = "block";
	}

	showAlert(message_) {
		this.setMessageAlert(message_);
		this.enableAlert();
	}

	clearTaskDescription() {
		document.getElementById("taskDescription").value = "";
	}

	getTaskDescription () {
		return document.getElementById("taskDescription").value;
	}

	validateInput() {
		if (this.getTaskDescription().trim().length == 0) {
			this.showAlert("Ingrese una tarea.");
			
			return false;
		} else {
			return true;
		}
	}

	createTask(taskId_, taskDescription_) {
/* para cargar un icono local:
   let iconTrash = `<img src="icon/trash-can-solid.svg" style="width:12px; height:auto;">`; 
   ``
*/
		return `<li class="itemTask" id="${taskId_}"><a href="#" id="removeTask" onclick="removeTask(${taskId_})"><i class="fa-solid fa-trash-can"></i></a>&nbsp;<a href="#" id="changeDoneTask" onclick="changeDoneTask(${taskId_})"><i class="fa-solid fa-square-check"></i></a>&nbsp;<p style="display: inline;">${taskDescription_}</p></li>`;
	}

	addTask(taskId_, taskDescription_) {
		document.getElementById("taskList").innerHTML += this.createTask(taskId_, taskDescription_);
	}

	FocusTaskDescription () {
		document.getElementById("taskDescription").focus();
	}

	NewTask () {
		if (this.validateInput()) {
			this.list.NewTask(this.getTaskDescription ());
			this.saveTaskList();

			this.addTask(this.list.GetLastTask().GetId(), this.list.GetLastTask().GetDescription());
			
			this.clearTaskDescription();

			this.FocusTaskDescription();
		}			
	}

	NewInput () {
		if (this.getTaskDescription() == "Credits")
			this.showAlert("By Bruno Osvaldo<br> Full Stack Developer");
		else
			this.NewTask();
	}

	removeTask(taskId_) {
		document.getElementById(taskId_).remove();
	}

	DeleteTask (taskId_) {
		this.removeTask(this.list.DeleteTask(taskId_)[0].GetId());
		this.saveTaskList();
	}

	changeDoneTaskStyle(taskId_, done_) {
		let taskDescription = document.getElementById(taskId_);

		if(done_) 
			taskDescription.lastChild.style.textDecoration = "line-through";
		else
			taskDescription.lastChild.style.textDecoration = "none";
	}

	DoneTask(taskId_) {
		this.list.ChangeDoneTask(taskId_);
		this.saveTaskList();
		this.changeDoneTaskStyle(taskId_, this.list.GetTask(taskId_).GetIsDone());
	}

	saveTaskList () {
		this.list.SaveLocalStorage(this.LOCAL_STORAGE_NAME);
	}

	loadTaskList () {
		try {
			this.list.OpenLocalStorage(this.LOCAL_STORAGE_NAME);

			for (let i = 0; i < this.list.GetLength(); i++) {
				const task = this.list.GetTaskIndexOf(i);
				this.addTask(task.GetId(), task.GetDescription());
				this.changeDoneTaskStyle(task.GetId(), task.GetIsDone());
			}
		} catch(error_) {
			console.log(error_.message);
		}
	}
}