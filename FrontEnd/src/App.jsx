import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login/Login'
import './App.css'
import HomePage from './pages/Home/Homepage'
import Register from './pages/Register/Register'
import Profile from './pages/Profile/Profile'
import Pokedex from './pages/Pokedex/Pokedex'
import PokemonDetails from './pages/PokemonDetails/PokemonDetails'
import Events from './pages/Event/Events'
import EventFormPage from './pages/EventForm/EventFormPage'
import EventDetail from './pages/EventDetails/EventDetails'
import Navbar from './components/Navbar/Navbar'



function App() {
  
  return (
    <>
    <Navbar />
    <div>
     <Routes>
      <Route path = "/" element = {<HomePage />} />
      <Route path ="/login" element={<Login />} />
      <Route path ="/register" element={<Register />} />
      <Route path ="/profile" element = {<Profile />} />
      <Route path="/pokedex" element={<Pokedex/>} />
      <Route path="/details/:name" element={<PokemonDetails />} />
      <Route path ="/events" element = {<Events />} />
      <Route path = "/event-form" element = {<EventFormPage />} />
      <Route path="/events/:id" element={<EventDetail />} />
     </Routes>
      </div>
    </>
  )
}

export default App
