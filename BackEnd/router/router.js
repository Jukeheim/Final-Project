const router = require("express").Router();
const pokedexController = require('../controllers/pokedex.controller')
const authController = require("../controllers/auth.controller");
const usersController = require("../controllers/users.controller");
const authMiddlewares = require("./../middlewares/auth.middleware");
const likedPokemonsController = require("../controllers/likedPokemon")
const eventController = require('../controllers/Event.controller')


//Pokemon Api routes

router.get('/pokemon', pokedexController.listPokemon);
router.get('/pokemon/:name', pokedexController.getPokemonDetails)
router.get('/pokemon-species/:name', pokedexController.getPokemonSpecies)



// Auth
router.post("/login", authController.login);

// User routes
router.post("/users", usersController.create);
router.get("/users", usersController.list);
router.get(
  "/users/me",
  authMiddlewares.isAuthenticated,
  usersController.getCurrentUser
);
router.get("/users/:id", usersController.getUser);


//Liked pokemons

router.post('/pokemon/like', likedPokemonsController.addLikedPokemon)
router.get('/pokemon/liked/:userId', likedPokemonsController.getLikedPokemons)


//Events

router.post('/events', authMiddlewares.isAuthenticated, eventController.createEvent)
router.put('/events/:id', authMiddlewares.isAuthenticated, eventController.editEvent)
router.delete('/events/:id', authMiddlewares.isAuthenticated, eventController.deleteEvent)
router.post('/events/:id/join', authMiddlewares.isAuthenticated, eventController.joinEvent)
router.get('/events', authMiddlewares.isAuthenticated, eventController.getEventList)

//registered Pokemons

router.post('/events/:id/register', authMiddlewares.isAuthenticated, eventController.registerPokemon)

module.exports = router;