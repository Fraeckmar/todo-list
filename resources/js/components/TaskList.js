import React from "react"
import { Link } from "react-router-dom"
import API from '../api'
import Spinner from "./Spinner"

class TaskList extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			isProcessing: false,
			tasks: {}
		}

		this.filterHandle = this.filterHandle.bind(this)
	}

	deleteHandle(taskId) {
		if (!taskId) {
			return false
		}
		this.setState({ isProcessing: true })
		API.delete('tasks/' + taskId)
			.then(res => {
				console.log(res)
				this.getTaskList()
			})
	}

	getTaskList() {
		this.setState({ isProcessing: true })

		API.get('tasks')
			.then(res => {
				console.log(res.data)
				this.setState({
					isProcessing: false,
					tasks: res.data
				})
			})
			.catch(err => {
				console.log(err)
				this.setState({
					isProcessing: false
				})
			})
	}

	filterHandle(e) {
		const q = e.target.value

		if (q.length > 2) {
			this.setState({ isProcessing: true })
			API.post('search', {
				q
			})
				.then(res => {
					this.setState({
						tasks: res.data,
						isProcessing: false
					})
				})
				.catch(err => {
					console.log(err)
					this.setState({ isProcessing: false })
				})
		}
		if (!q.length) {
			this.getTaskList()
		}

	}

	componentDidMount() {
		this.getTaskList()
	}

	render() {
		return (
			<div className="mt-5 mx-auto" style={{ maxWidth: '768px' }}>
				<Spinner isVisible={this.state.isProcessing} />
				<h5 className="h5 fw-bold mb-3">Task List</h5>

				<div className="row my-2">
					<div className="col-12 col-md-8">
						<Link to={'/tasks'} className='btn btn-sm btn-outline-primary'> Add Task</Link>
					</div>
					<div className="col-12 col-md-4">
						<input
							type="text"
							className="form-control"
							placeholder="Search Task"
							onChange={this.filterHandle}
						/>
					</div>
				</div>

				<table className="table table-bordered table-striped">
					<thead>
						<tr>
							<th>Task</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{Object.values(this.state.tasks)?.map((task, key) => {
							return (
								<tr key={key}>
									<td>{task.name}</td>
									<td>
										<Link to={'/tasks/' + task.id} className='btn btn-sm btn-primary'> Edit</Link>
										<button
											className="btn btn-sm btn-danger mx-1"
											onClick={(e) => this.deleteHandle(task.id)}
										> Delete</button>
									</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
		)
	}
}

export default TaskList