import React, { useEffect, useState } from "react"
import { getGames } from "../../managers/GameManager.js"

export const GameList = (props) => {
	const [games, setGames] = useState([])
	const pathname = window.location.pathname

	useEffect(() => {
		getGames().then(data => setGames(data))
	}, [])

	return (<>
		<h1>{pathname}</h1>
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