import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        visibility: "all",
        todos: [{ "id": 1, "title": "ddd", "completed": false }, { "id": 2, "title": "ddd", "completed": false }, { "id": 3, "title": "ddd", "completed": false }, { "id": 4, "title": "ddd", "completed": false }, { "id": 5, "title": "fdgsdfsd", "completed": false }, { "id": 6, "title": "dsfas", "completed": false }],
    },
    getters: {
        todos: state => {
            return state.todos;
        },
        visibility: state => {
            return state.visibility;
        },
        allDone: state => {
            return state.todos.every(todo => todo.completed);
        },
    },
    mutations: {
        addTodo(state, todo) {
            state.todos.push(todo);
        },
        removeTodo(state, todo) {
            state.todos.splice(state.todos.indexOf(todo), 1);
        },
        changeRouter(state, val) {
            state.visibility = val;
        },
        removeCompleted(state) {
            state.todos = state.todos.filter(todo => {
                return !todo.completed;
            })
        },
        toggleCompleted(state, done) {
            state.todos.forEach(todo => todo.completed = done);
        }
    },
    actions: {
        addTodo({ commit }, todo) {
            commit("addTodo", todo);
        },
        removeTodo({ commit }, todo) {
            commit("removeTodo", todo);
        },
        changeRouter({ commit }, val) {
            commit("changeRouter", val);
        },
        removeCompleted({ commit }) {
            commit("removeCompleted");
        },
        toggleCompleted({ commit }, done) {
            commit("toggleCompleted", done);
        }
    }
})
