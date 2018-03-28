defmodule TaskTracker3.SessionController do
  use TaskTracker3Web, :controller

  alias TaskTracker3.Users

  # creates a session for the given user credentials if authorized
  def create(conn, %{"email" => email, "password" => password}) do
    user = Users.get_and_auth_user(email, password)

    if user do
      conn
      |> put_session(:user_id, user.id)
      |> put_flash(:info, "Welcome back, #{user.name}!")
      |> redirect(to: page_path(conn, :home, which: "all_to_join"))
    else
      conn
      |> put_flash(:error, "Invalid credentials!")
      |> redirect(to: page_path(conn, :index))
    end
  end

  # closes the given connection's session
  def delete(conn, _params) do
    conn
    |> delete_session(:user_id)
    |> put_flash(:info, "Logged out!")
    |> redirect(to: page_path(conn, :index))
  end
end
