export const getEvents = () => {
	return fetch("http://localhost:8000/events", {
		headers: {
			"Authorization": `Token ${localStorage.getItem("lu_token")}`
		}
	})
		.then(response => response.json())
}

export const createEvent = (event) => {
	return fetch("http://localhost:8000/events", {
		method: 'POST',
		body: JSON.stringify(event),
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Token ${localStorage.getItem('lu_token')}`,
		}
	})
		.then(response => response.json())
}

export const getSingleEvent = (id) => {
	return fetch(`http://localhost:8000/events/${id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Token ${localStorage.getItem('lu_token')}`,
		}
	})
		.then(response => response.json())
}

export const updateEvent = (event, eventId) => {
	return fetch(`http://localhost:8000/events/${eventId}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'Authorization': `Token ${localStorage.getItem('lu_token')}`,
		},
		body: JSON.stringify(event)
	})
}

export const deleteEvent = (id) => {
	return fetch(`http://localhost:8000/events/${id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'Authorization': `Token ${localStorage.getItem('lu_token')}`,
		}
	})
}