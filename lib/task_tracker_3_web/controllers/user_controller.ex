defmodule TaskTracker3Web.UserController do
  use TaskTracker3Web, :controller

  alias TaskTracker3.Users
  alias TaskTracker3.Users.User

  action_fallback TaskTracker3Web.FallbackController

  def index(conn, _params) do
    users = Users.list_users()
    render(conn, "index.json", users: users)
  end

  def create(conn, %{"user_params" => user_params}) do
    user = Users.get_user_by_email(user_params["email"])

    if user != nil do
      IO.inspect({:bad_match, user_params["email"], user_params["email"]})
      raise "hax!"
    end

    with {:ok, %User{} = user} <- Users.create_user(user_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", user_path(conn, :show, user))
      |> render("show.json", user: user)
    end
  end

  def show(conn, %{"id" => id}) do
    user = Users.get_user!(id)
    render(conn, "show.json", user: user)
  end

  # verifies that the token user matches the user to be updated
  def update(conn, %{"token" => token, "user_params" => user_params}) do
    {:ok, user_id} = Phoenix.Token.verify(conn, "auth token", token, max_age: 86400)
    user = Users.get_user(user_id)

    if user == nil || user.id != user_params["id"] do
      IO.inspect({:bad_match, user_params["id"], user.id})
      raise "hax!"
    end

    with {:ok, %User{} = user} <- Users.update_user(user, user_params) do
      render(conn, "show.json", user: user)
    end
  end

  def delete(conn, %{"id" => id}) do
    user = Users.get_user!(id)
    with {:ok, %User{}} <- Users.delete_user(user) do
      send_resp(conn, :no_content, "")
    end
  end
end
