class Task {
	constructor (id_, description_, isDone_ = false) {
		this.id = id_;
		this.description = description_;
		this.isDone = isDone_;
	}

	Done () {
		this.isDone = true;
	}

	Undone () {
		this.isDone = false;
	}

	GetId () {
		return this.id;
	}

	GetDescription () {
		return this.description;
	}

	GetIsDone () {
		return this.isDone;
	}
}