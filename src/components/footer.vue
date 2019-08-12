<template>
    <footer class="footer" v-show="todos.length">
        <span class="todo-count">
            <strong v-text="remaining"></strong>
            {{pluralize("item", remaining)}} left
        </span>
        <ul class="filters">
            <li>
                <a href="#/all" :class="{selected: visibility == 'all'}">All</a>
            </li>
            <li>
                <a href="#/active" :class="{selected: visibility == 'active'}">Active</a>
            </li>
            <li>
                <a href="#/completed" :class="{selected: visibility == 'completed'}">Completed</a>
            </li>
        </ul>
        <button
            class="clear-completed"
            @click="removeTodoList"
            v-show="todos.length > remaining"
        >Clear completed</button>
    </footer>
</template>

<script lang="ts">

import { Component, Prop, Vue } from "vue-property-decorator";
import { State, Getter, Mutation} from "vuex-class";
var filters = {
    all: function(todos: any) {
        return todos;
    },
    active: function(todos: any) {
        return todos.filter(function(todo: any) {
            return !todo.completed;
        });
    },
    completed: function(todos: any) {
        return todos.filter(function(todo: any) {
            return todo.completed;
        });
    }
};

@Component
export default class Footer extends Vue {
    // @Prop() private msg!: string;

// computed
//     remaining: function () {
// 			return filters.active(this.todos).length;
// 		},
    private get remaining(): number {
        return filters.active(this.todos).length;
    }
// 		...mapGetters([
// 			"visibility",
// 			"todos"
// 		]),
    @Getter('todos') todos: any;
    @Getter('visibility') visibility!: string;
    @Mutation('removeCompleted') removeCompleted!: Function;
    // methods
    removeTodoList(): void {
        this.removeCompleted()
    };

    pluralize(word: string, count: number): string {
        return word + (count === 1 ? "" : "s");
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
