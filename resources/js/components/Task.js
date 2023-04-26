import React from "react"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
import FUNCTION from "./Function"
import TaskForm from "./TaskForm"

const Task = () => {
	const { id } = useParams()
	const taskId = id ?? null
	const action = taskId ? 'edit' : 'add'

	return (
		<>
			<div className="mx-auto my-4" style={{ maxWidth: '600px' }}>
				<Link to={'/'} className='btn btn-sm btn-outline-primary'>Home</Link>
				<h5 className="my-2">{FUNCTION.ucwords(action)} Task</h5>
				<div className="card card-body">
					<TaskForm action={action} taskId={taskId} />
				</div>
			</div>
		</>
	)
}

export default Task