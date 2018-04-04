defmodule TaskTracker3Web.TokenView do
  use TaskTracker3Web, :view

  # inclused the id and name of the token user
  def render("token.json", %{user: user, token: token}) do
    %{
      user_id: user.id,
      token: token,
      user_name: user.name
    }
  end
end
