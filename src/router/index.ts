import Vue from "vue";
import Router from "vue-router";
import todoList from "@/components/todo-list.vue"

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "all",
      component: todoList
    },
    {
      path: "/all",
      name: "all",
      component: todoList
    },
    {
      path: "/active",
      name: "active",
      component: todoList
    },
    {
      path: "/completed",
      name: "completed",
      component: todoList
    }
  ],
});
