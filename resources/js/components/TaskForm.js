import React from "react"
import FUNCTION from "./Function"
import API from "../api"
import Spinner from "./Spinner"

class TaskForm extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			name: '',
			isProcessing: false,
			msg: '',
			msgType: 'success'
		}

		this.submitHandle = this.submitHandle.bind(this)
	}

	componentDidMount() {
		if (this.props.taskId) {
			this.setState({ isProcessing: true })
			API.get('tasks/' + this.props.taskId)
				.then(res => {
					const data = res.data
					this.setState({
						name: data.name,
						isProcessing: false
					})
				})
				.catch(err => {
					console.log(err)
					this.setState({ isProcessing: false })
				})
		}
	}

	submitHandle(e) {
		e.preventDefault()

		this.setState({ isProcessing: true })

		let apiRequest = null
		switch (this.props.action) {
			case 'add':
				apiRequest = API.post('/tasks', {
					name: this.state.name
				})
				break
			case 'edit':
				apiRequest = API.put('/tasks/' + this.props.taskId, {
					name: this.state.name
				})
				break
			case 'delete':
				apiRequest = API.delete('/tasks/' + this.props.taskId)
				break
		}

		if (apiRequest) {
			apiRequest
				.then(res => {
					console.log(res)
					this.setState({
						isProcessing: false,
						msg: 'Task ' + this.props.action + ' sucessfully.',
						msgType: 'success'
					})
				})
				.catch(err => {
					console.log(err)
					this.setState({
						isProcessing: false,
						msg: 'Something went wrong.',
						msgType: 'error'
					})
				})
		}
	}

	render() {
		return (
			<>
				<Spinner isVisible={this.state.isProcessing} />
				<div className={"alert alert-" + this.state.msgType + " " + (this.state.msg ? "" : "d-none")}> {this.state.msg} </div>
				<form onSubmit={this.submitHandle}>
					<div className="mb-2">
						<label className="form-label">Task</label>
						<input
							className="form-control"
							type="text"
							value={this.state.name}
							onChange={e => this.setState({ name: e.target.value })}
						/>
					</div>
					<button type="submit" className="btn btn-primary w-100">{FUNCTION.ucwords(this.props.action)}</button>
				</form>
			</>
		)
	}
}

export default TaskForm