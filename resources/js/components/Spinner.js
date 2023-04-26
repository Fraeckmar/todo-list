const Spinner = ({ isVisible }) => {
	return (
		<div className={'modal ' + (isVisible ? 'd-block' : '')}>
			<div className="modal-dialog modal-dialog-centered w-100 text-center">
				<div className="modal-content modal-content bg-transparent border-0">
					<div className="modal-body">
						<div className="d-inline-block p-4 bg-secondary opacity-50">
							<div className="spinner-border text-white" role="status">
								<span className="visually-hidden">Loading...</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Spinner