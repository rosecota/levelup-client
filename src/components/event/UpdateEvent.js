import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { updateEvent, getSingleEvent } from '../../managers/EventManager.js'
import { getGames } from '../../managers/GameManager.js'


export const UpdateEvent = () => {
	const navigate = useNavigate()
	const [games, setGames] = useState([])
	const { eventId } = useParams()

	/*
		Since the input fields are bound to the values of
		the properties of this state variable, you need to
		provide some default values.
	*/
	const [currentEvent, setCurrentEvent] = useState({})

	useEffect(() => {
		// Get the event types, then set the state
		getGames().then(setGames)
		getSingleEvent(eventId).then(setCurrentEvent)
	}, [])

	const changeEventState = (e) => {
		const copy = { ...currentEvent }
		copy[e.target.name] = e.target.value
		setCurrentEvent(copy)
	}

	return (
		<div className="lu-list">
			<form className="eventForm">
				<h2 className="eventForm__title lu-form-title">Register New Event</h2>
				<fieldset>
					<div className="form-group lu-form-group">
						<label htmlFor="description">Description </label>
						<input type="text" name="description" required autoFocus className="form-control"
							value={currentEvent.description}
							onChange={changeEventState}
							placeholder="Event Title"
						/>
						<label htmlFor="date">Date </label>
						<input type="date" name="date" required autoFocus className="form-control"
							value={currentEvent.date}
							onChange={changeEventState}
						/>
						<label htmlFor="time">Time </label>
						<input type="time" name="time" required autoFocus className="form-control"
							value={currentEvent.time}
							onChange={changeEventState}
						/>

						<label htmlFor="game">Game </label>
						<select name="game" required autoFocus className="form-control"
							value={currentEvent?.game?.id}
							onChange={changeEventState}>
							<option value="Select...">Select...</option>
							{games.map((game) => <option key={`game--${game.id}`} value={game.id}>{game.title}</option>)}
						</select>
					</div>
				</fieldset>


				<button type="submit"
					onClick={evt => {
						// Prevent form from being submitted
						evt.preventDefault()

						// set selected form data for API
						const event = {
							description: currentEvent.description,
							date: currentEvent.date,
							time: currentEvent.time,
							game: parseInt(currentEvent.game)
						}

						// Send POST request to API
						updateEvent(event, eventId)
							.then(() => navigate("/events"))
					}}
					className="button-62">Update</button>
			</form >
		</div>
	)
}