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

	return (<></>)
}