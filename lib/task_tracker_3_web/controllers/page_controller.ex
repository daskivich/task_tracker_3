defmodule TaskTracker3Web.PageController do
  use TaskTracker3Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
