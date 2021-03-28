export default [
  {
    path: "/",
    name: "EmptyLayout",
    view: "layouts/Empty",
    meta: { requiresGuest: true },
    children: [
      {
        path: "",
        name: "Sign in",
        view: "Signin"
      },
      {
        path: "",
        name: "Sign up",
        view: "Signup"
      },
    ]
  },
  {
    path: "/",
    name: "UserLayout",
    view: "layouts/User",
    meta: { requiresAuth: true },
    children: [
      {
        path: "/taskboard",
        name: "Taskboard",
        view: "Taskboard",
        meta: { requiresUser: true },
      },
      {
        path: "admin/taskboard",
        name: "AdminTaskboard",
        view: "AdminTaskboard",
        meta: { requiresAdmin: true },
      },
      // {
      //   path: "/skills",
      //   name: "Skills",
      //   view: "Skills"
      // },
      // {
      //   path: "/users",
      //   name: "Users",
      //   view: "Users",
      //   meta: { requiresAdmin: true }
      // },
      // {
      //   path: "/experiences",
      //   name: "Experiences",
      //   view: "Experiences"
      // },
      // {
      //   path: "/worker-statuses",
      //   name: "WorkerStatuses",
      //   view: "WorkerStatuses"
      // },
      // {
      //   path: "/candidate/:id",
      //   name: "Candidate",
      //   view: "Candidate"
      // },
      // {
      //   path: "/change-password",
      //   name: "ChangePassword",
      //   view: "ChangePassword"
      // }
    ]
  },
];
