import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { GameList } from "../components/game/GameList"
import { GameForm } from "../components/game/GameForm"
import { EventList } from "../components/event/EventList"
import { EventForm } from "../components/event/EventForm"


export const ApplicationViews = () => {
    return <div className="lu-container">
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Authorized />}>
                {/* Add Routes here */}
                <Route path="/events" element={<EventList />} />
                <Route path="/events/new" element={<EventForm />} />
                <Route path="/games" element={<GameList />} />
                <Route path="/games/new" element={<GameForm />} />
            </Route>
        </Routes>
    </div>
}
