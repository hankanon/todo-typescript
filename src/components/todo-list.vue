<template>
    <section class="main" v-show="todos.length">
        <input
            id="toggle-all"
            class="toggle-all"
            type="checkbox"
            @change="toggleCompleted(!allDone)"
            :checked="allDone"
        />
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
            <li
                class="todo"
                v-for="(todo,index) in filteredTodos"
                :key="index"
                :class="{completed: todo.completed, editing: todo == editedTodo}"
            >
                <div class="view">
                    <input class="toggle" type="checkbox" v-model="todo.completed" />
                    <label @dblclick="editTodo(todo)">{{todo.title}}</label>
                    <button class="destroy" @click="removeTodo(todo)"></button>
                </div>
                <input
                    class="edit"
                    type="text"
                    v-model="todo.title"
                    v-todo-focus="todo == editedTodo"
                    @blur="doneEdit(todo)"
                    @keyup.enter="doneEdit(todo)"
                    @keyup.esc="cancelEdit(todo)"
                />
            </li>
        </ul>
    </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Getter, Action} from "vuex-class"
import { Route, RawLocation } from 'vue-router';
var filters = {
    all: function (todos: any) {
        return todos;
    },
    active: function (todos: any) {
        return todos.filter(function (todo: any) {
            return !todo.completed;
        });
    },
    completed: function (todos: any) {
        return todos.filter(function (todo: any) {
            return todo.completed;
        });
    },
    
};
type StatusKey = 'all' | 'active' | 'completed'
// import {} from "vue-property-decorator"
@Component({
    directives: {
        'todo-focus': function (el, binding) {
            if (binding.value) {
                el.focus();
            }
        }
    }
})
export default class TodoList extends Vue {
    // @Prop() private msg!: string;

    // data
    beforeEditCache: any = null;
    editedTodo: any = null;

    // computed: 
    private get filteredTodos() {
        return filters[this.visibility](this.todos);
    }
    @Getter('todos') todos: any;
    @Getter('allDone') allDone!: boolean;
    @Getter('visibility') visibility!: StatusKey;

    // ...mapActions([
    //    'removeTodo',
    // 	]),
    @Action('removeTodo') removeTodo!: Function;

    mounted() {
        console.log(this.$router)
        console.log(this.$route)
    };
    // methods
    doneEdit(todo: any) {
        if (!this.editedTodo) {
            return;
        }
        this.editedTodo = null;
        todo.title = todo.title.trim();
        if (!todo.title) {
            this.removeTodo(todo);
        }
    };
    toggleCompleted(done: boolean) {
        this.$store.dispatch('toggleCompleted', done)
    };
    cancelEdit(todo: any) {
        this.editedTodo = null;
        todo.title = this.beforeEditCache;
    }
    changeRouter(router: string) {
        this.$store.dispatch('changeRouter',router)
    };
    editTodo(todo: any) {
        this.beforeEditCache = todo.title;
        this.editedTodo = todo;
    };

    beforeRouteEnter(to: Route, from: Route, next: (vm: any) => void): void {
        console.log(to)
        next((vm: any) => {
            vm.changeRouter(to.name)
        })
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
