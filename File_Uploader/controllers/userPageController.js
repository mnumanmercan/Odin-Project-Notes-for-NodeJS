export function registerUserPage(req, res) {
    res.render("register", { title: "Register" });
}

export function loginUserPage(req, res) {
    res.render("login", { title: "Login" });
}