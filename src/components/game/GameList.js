import React, { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { getGames } from "../../managers/GameManager.js"

export const GameList = (props) => {
	const [games, setGames] = useState([])
	const navigate = useNavigate()
	const pathname = window.location.pathname

	useEffect(() => {
		getGames().then(data => setGames(data))
	}, [])

	return (<>
		<h1>{pathname}</h1>
		<button className="btn btn-2 btn-sep icon-create marge-auto button-62"
			onClick={() => {
				navigate({ pathname: "/games/new" })
			}}
		>Register New Game</button>
		<article className="games lu-list">
			{
				games.map(game => {
					return <section key={`game--${game.id}`} className="game lu-list-section">
						<div className="game__title lu-list-section-title">{game.title} by {game.maker}</div>
						<div className="game__players">{game.number_of_players} players needed</div>
						<div className="game__skillLevel">Skill level is {game.skill_level}</div>
					</section>
				})
			}
		</article>
	</>
	)
}