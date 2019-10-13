import Vue from 'vue'
import Vuex from 'vuex'
import gql from 'graphql-tag'
import apollo from './apollo'
// import {QUERY_ALLMOVIES} from '../src/graphqlQueries/queries'

Vue.use(Vuex)


const store = new Vuex.Store({
	state: {
		movies: [],
		directors: []
	},
	getters: {
		movies(state){
			return state.movies
		},
		directors(state){
			return state.directors
		}
	},
	mutations: {
		getMovies(state, movies ) {
			state.movies = movies
		},
		addMovie(state, movies ) {
			state.movies.push({...movies, idx: state.movies.length+1});
		},
		deleteMovie(state, id ){
			state.movies = state.movies.filter(function( obj ) {
				return obj.id !== id;
			});
		},
		editMovie(state, film ){
			let foundIndex = state.movies.findIndex(x => x.id == film.id);
			state.movies[foundIndex] = film;
		},
		getDirectors(state, directors ) {
			state.directors = directors
		},
		addDirector(state, director ) {
			state.directors.push({...director, idx: state.directors.length+1})
		},
		editDirector(state, director){
			let foundIndex = state.directors.findIndex(x => x.id == director.id);
			state.directors[foundIndex] = director;
		},
		deleteDirector(state, id ){
			state.directors = state.directors.filter(function( obj ) {
				return obj.id !== id;
			});
		}
	},
	actions: {
		async getMovies({ commit }) {
			const query = gql`
				query  {
					movies {
							id
							name
							genre
							rate
							watched
							director{
								id
								name
							}
					}
				}`
			let response = await apollo.query({
				query
			}).then((response) => {
				let allmovies = response.data.movies.map( ( item ) => item )
				// console.log(response)
				commit( 'getMovies', allmovies );
			}).catch(e=>console.log(e))
		},

		async getDirectors({ commit }) {
			const query = gql`
				query  {
					directors {
							id
							name
							age
							movies {
								name
							}
					}
				}`
			let response = await apollo.query({
				query
			}).then((response) => {
				let alldirectors = response.data.directors.map( ( item ) => item );
				commit( 'getDirectors', alldirectors );
			}).catch( e=>console.log(e) )
		},
		async addDirector({ commit }, director) {
			console.log(director)
			const ADD_DIRECTOR= gql`
			mutation addDirector ($name: String!, $age:Int!){
				addDirector ( name: $name, age: $age ) {
					id
					name
					age
				}
			}`;
			let response = await apollo.mutate({
        // Mutation
				mutation: ADD_DIRECTOR,
        // Parameters
        variables: {
					name: director.name,
					age: director.age
        }
			}).then((response) => {
				console.log(response)
				commit('addDirector', response.data.addDirector)
			}).catch(e=>console.log(e))
		},
		async editDirector({ commit }, director) {
			const EDIT_DIRECTOR= gql`
			mutation updateDirector ($id:ID, $name: String!, $age:Int!){
				updateDirector (id: $id, name: $name, age: $age ) {
					id
					name
					age
				}
			}`;
			let response = await apollo.mutate({
        // Mutation
				mutation: EDIT_DIRECTOR,
        // Parameters
        variables: {
					id: director.id,
					name: director.name,
					age: director.age
        }
			}).then((response) => {
				// console.log(response)
				commit('editDirector', response.data.updateDirector)
			}).catch(e=>console.log(e))
		},
		async deleteDirector({ commit }, id) {
			// console.log(director)
			const DELETE_DIRECTOR= gql`
			mutation ($id: ID){
				deleteDirector ( id: $id ) {
					id
				}
			}`;
			let response = await apollo.mutate({
        // Mutation
				mutation: DELETE_DIRECTOR,
        // Parameters
        variables: {
					id
        }
			}).then((response) => {
			// console.log(response.data.deleteDirector.id)
			commit('deleteDirector', id)
			}).catch(e=>console.log(e))

		},
		async deleteMovie({ commit }, id) {
			// console.log(director)
			const DELETE_MOVIE= gql`
			mutation ($id: ID){
				deleteMovie ( id: $id ) {
					id
				}
			}`;
			let response = await apollo.mutate({
        // Mutation
				mutation: DELETE_MOVIE,
        // Parameters
        variables: {
					id
        }
			}).then((response) => {
				commit('deleteMovie', id)
			}).catch(e=>console.log(e))
		},
		async addMovie({ commit }, film) {
			const ADD_MOVIE= gql`
			mutation addMovie ($name: String!, $genre: String!, $directorId: ID, $watched: Boolean!, $rate: Int){
				addMovie ( name: $name, genre: $genre, directorId: $directorId, watched: $watched, rate: $rate) {
					id
					name
					genre
					watched
					rate
					director {
						id
						name
					}
				}
			}`;
			let response = await apollo.mutate({
        // Mutation
				mutation: ADD_MOVIE,
        // Parameters
        variables: {
					name: film.name,
					genre: film.genre,
					directorId: film.director,
					watched: film.watched,
					rate: +film.rate,
        }
			}).then((response) => {
				commit('addMovie', response.data.addMovie)
			}).catch(e=>console.log(e))
		},
		async editMovie({ commit }, film) {
			console.log(film)
			const EDIT_MOVIE= gql`
			mutation updateMovie ($id:ID, $name: String!, $genre: String!, $directorId: ID, $watched: Boolean!, $rate: Int){
				updateMovie (id: $id, name: $name, genre: $genre, directorId: $directorId, watched: $watched, rate: $rate) {
					id
					name
					genre
					watched
					rate
					director {
						id
						name
					}
				}
			}`;
			let response = await apollo.mutate({
        // Mutation
				mutation: EDIT_MOVIE,
        // Parameters
        variables: {
					id: film.id,
					name: film.name,
					genre: film.genre,
					directorId: film.directorId,
					watched: film.watched,
					rate: +film.rate,
        }
			}).then((response) => {
				// console.log(response.data.updateMovie)
				commit('editMovie', response.data.updateMovie)
			}).catch(e=>console.log(e))

		},
	}
});

export default store;