import Vue from "vue";
import Router from "vue-router";
import Meta from "vue-meta";
import store from "@/store";

import paths from "./paths";

function route(path, view, name, meta, children = null) {
  let data = {
    name: name || view,
    path,
    meta,
    component: resovle => import(`@/views/${view}.vue`).then(resovle)
  };

  if (children) {
    data.children = routes(children);
  }

  return data;
}

function routes(paths) {
  return paths.map(path =>
    route(path.path, path.view, path.name, path.meta, path.children)
  );
}

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: routes(paths).concat([{ path: "*", redirect: "/" }]),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { selector: to.hash };
    }
    return { x: 0, y: 0 };
  }
});

router.beforeEach(function(to, from, next) {
  if (
    to.matched.some(record => record.meta.requiresGuest) &&
    Vue.prototype.$auth.isAuthenticated()
  ) {
    if (store.getters["app/me"].is_admin) {
      next({ path: "/admin/taskboard" });
    } else {
      next({ path: "/taskboard" });
    }
  }
  if (
    to.matched.some(record => record.meta.requiresAdmin) &&
    Vue.prototype.$auth.isAuthenticated() &&
    !store.getters["app/me"].is_admin
  ) {
    next({ path: "/taskboard" });
  }
  if (
    to.matched.some(record => record.meta.requiresUser) &&
    Vue.prototype.$auth.isAuthenticated() &&
    store.getters["app/me"].is_admin
  ) {
    next({ path: "/admin/taskboard" });
  }
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!window.auth.isAuthenticated()) {
      next({
        path: "/",
        query: { redirect: to.fullPath }
      });
    }
  }

  next();
});

Vue.use(Meta);

export default router;
