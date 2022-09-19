import React, { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { createGame, getGameTypes } from '../../managers/GameManager.js'


export const GameForm = () => {
	const history = useNavigate()
	const [gameTypes, setGameTypes] = useState([])

	/*
		Since the input fields are bound to the values of
		the properties of this state variable, you need to
		provide some default values.
	*/
	const [currentGame, setCurrentGame] = useState({
		skillLevel: 1,
		numberOfPlayers: 0,
		title: "",
		maker: "",
		gameTypeId: 0
	})

	useEffect(() => {
		// Get the game types, then set the state
		getGameTypes().then(setGameTypes)
	}, [])

	const changeGameState = (domEvent) => {
		// TODO: Complete the onChange function
		const copy = { ...currentGame }
		copy[domEvent.target.name] = domEvent.target.value
		setCurrentGame(copy)
	}

	return (
		<div className="lu-list">
			<form className="gameForm">
				<h2 className="gameForm__title lu-form-title">Register New Game</h2>
				<fieldset>
					<div className="form-group lu-form-group">
						<label htmlFor="title">Title: </label>
						<input type="text" name="title" required autoFocus className="form-control"
							value={currentGame.title}
							onChange={changeGameState}
						/>
						<label htmlFor="maker">Maker: </label>
						<input type="text" name="maker" required autoFocus className="form-control"
							value={currentGame.maker}
							onChange={changeGameState}
						/>
						<label htmlFor="skillLevel">Skill Level: </label>
						<input type="number" name="skillLevel" required autoFocus className="form-control"
							value={currentGame.skillLevel} min="0" max="10"
							onChange={changeGameState}
						/>
						<label htmlFor="numberOfPlayers">Minimum Number of Players: </label>
						<input type="number" name="numberOfPlayers" required autoFocus className="form-control"
							value={currentGame.numberOfPlayers} min="0" max="15"
							onChange={changeGameState}
						/>
						<label htmlFor="gameTypeId">Game Type: </label>
						<select name="gameTypeId" required autoFocus className="form-control"
							value={currentGame.gameTypeId}
							onChange={changeGameState}>
							<option defaultValue="Select..">Select..</option>
							{gameTypes.map((type) => <option key={`gameType--${type.id}`} defaultValue={type.id}>{type.label}</option>)}
						</select>
					</div>
				</fieldset>


				<button type="submit"
					onClick={evt => {
						// Prevent form from being submitted
						evt.preventDefault()

						const game = {
							maker: currentGame.maker,
							title: currentGame.title,
							numberOfPlayers: parseInt(currentGame.numberOfPlayers),
							skillLevel: parseInt(currentGame.skillLevel),
							gameTypeId: parseInt(currentGame.gameTypeId)
						}

						// Send POST request to API
						createGame(game)
							.then(() => history.push("/games"))
					}}
					className="button-62">Create</button>
			</form >
		</div>
	)
}