import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { getGameTypes, getSingleGame, updateGame } from '../../managers/GameManager.js'


export const UpdateGame = () => {
	const navigate = useNavigate()
	const [gameTypes, setGameTypes] = useState([])
	const { gameId } = useParams()


	/*
		Since the input fields are bound to the values of
		the properties of this state variable, you need to
		provide some default values.
	*/
	// const [currentGame, setCurrentGame] = useState({})
	const [currentGame, setCurrentGame] = useState({
	})

	useEffect(() => {
		// Get the game types, then set the state
		getGameTypes().then(setGameTypes)
		getSingleGame(gameId).then(setCurrentGame)
	}, [])

	const changeGameState = (domEvent) => {
		const copy = { ...currentGame }
		copy[domEvent.target.name] = domEvent.target.value
		setCurrentGame(copy)
	}

	return (
		<div className="lu-list">
			<form className="gameForm">
				<h2 className="gameForm__title lu-form-title">Update Game</h2>
				<fieldset>
					<div className="form-group lu-form-group">
						<label htmlFor="title">Title </label>
						<input type="text" name="title" required autoFocus className="form-control"
							value={currentGame.title}
							onChange={changeGameState}
							placeholder="Title"
						/>
						<label htmlFor="maker">Maker </label>
						<input type="text" name="maker" required autoFocus className="form-control"
							value={currentGame.maker}
							onChange={changeGameState}
						/>
						<label htmlFor="skill_level">Skill Level </label>
						<input type="number" name="skill_level" required autoFocus className="form-control"
							// TODO: later you see noted these forms wip go do more excited to focus on python rn 
							value={currentGame.skill_level} min="0" max="10"
							onChange={changeGameState}
						/>
						<label htmlFor="number_of_players">Minimum Number of Players </label>
						<input type="number" name="number_of_players" required className="form-control"
							value={currentGame.number_of_players} min="1" max="15"
							onChange={changeGameState}
						/>
						<label htmlFor="game_type">Game Type </label>
						<select name="game_type" required autoFocus className="form-control"
							value={currentGame?.game_type?.id}
							onChange={changeGameState}>
							<option value="Select...">Select...</option>
							{gameTypes.map((type) => <option key={`gameType--${type.id}`} value={type.id}>{type.label}</option>)}
						</select>
					</div>
				</fieldset>


				<button type="submit"
					onClick={evt => {
						// Prevent form from being submitted
						evt.preventDefault()

						// set selected form data for API
						const game = {
							maker: currentGame.maker,
							title: currentGame.title,
							number_of_players: parseInt(currentGame.number_of_players),
							skill_level: parseInt(currentGame.skill_level),
							game_type: parseInt(currentGame.game_type.id)
						}

						// Send POST request to API
						updateGame(game, gameId)
							.then(() => navigate("/games"))
					}}
					className="button-62">Update</button>
			</form >
		</div>
	)
}