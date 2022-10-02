import React, { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { getEvents, deleteEvent } from "../../managers/EventManager.js"

export const EventList = (props) => {
	const navigate = useNavigate()
	const [events, setEvents] = useState([])
	const pathname = window.location.pathname

	useEffect(() => {
		getEvents().then(data => setEvents(data))
	}, [])

	return (<>
		<h1>{pathname}</h1>
		<button className="btn btn-2 btn-sep icon-create marge-auto button-62"
			onClick={() => {
				navigate({ pathname: "/events/new" })
			}}
		>Register New Event</button>
		<article className="events lu-list">
			{
				events.map(event => {
					return <section key={`event--${event.id}`} className="event lu-list-section">
						<div className="event__description lu-list-section-title">{event.description}</div>
						<div className="event__organizer">Hosted by {event.organizer.user.username}</div>
						<div className="event__date">Date: {event.date}</div>
						<div className="event__time">Time: {event.time}</div>

						<button className="btn btn-3"
							onClick={() => {
								deleteEvent(event.id).then(() => getEvents()).then(setEvents)
							}}
						>Delete</button>
					</section>
				})
			}
		</article>
	</>
	)
}