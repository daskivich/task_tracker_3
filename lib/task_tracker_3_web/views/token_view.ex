defmodule TaskTracker3Web.TokenView do
  use TaskTracker3Web, :view

  def render("token.json", %{user: user, token: token}) do
    %{
      user_id: user.id,
      token: token
    }
  end
end
