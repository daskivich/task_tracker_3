defmodule TaskTracker3Web.UserView do
  use TaskTracker3Web, :view
  alias TaskTracker3Web.UserView

  def render("index.json", %{users: users}) do
    %{data: render_many(users, UserView, "user.json")}
  end

  def render("show.json", %{user: user}) do
    %{data: render_one(user, UserView, "user.json")}
  end

  def render("user.json", %{user: user}) do
    %{id: user.id,
      name: user.name,
      email: user.email,
      password_hash: user.password_hash,
      pw_tries: user.pw_tries,
      pw_last_try: user.pw_last_try}
  end
end
