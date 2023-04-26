import React, { Component, Suspense } from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'

const loading = (
	<div className="pt-3 text-center">
		<div className="sk-spinner sk-spinner-pulse"></div>
	</div>
)


// Pages
const TaskList = React.lazy(() => import('./TaskList'))
const Task = React.lazy(() => import('./Task'))

class AppContent extends Component {
	render() {
		return (
			<BrowserRouter>
				<Suspense fallback={loading}>
					<Routes>
						<Route path="/tasks/:id?" name="Task" element={<Task />} />
						<Route exact path="*" name="Main Page" element={<TaskList />} />
					</Routes>
				</Suspense>
			</BrowserRouter>
		)
	}
}

export default AppContent
