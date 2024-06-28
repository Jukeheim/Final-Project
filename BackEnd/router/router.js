const router = require("express").Router();
const pokedexController = require('../controllers/pokedex.controller')
const authController = require("../controllers/auth.controller");
const usersController = require("../controllers/users.controller");
const authMiddlewares = require("./../middlewares/auth.middleware");
const likedPokemonsController = require("../controllers/likedPokemon")


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

module.exports = router;