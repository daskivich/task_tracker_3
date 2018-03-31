defmodule TaskTracker3.Tasks.Task do
  use Ecto.Schema
  import Ecto.Changeset

  schema "tasks" do
    field :completed, :boolean, default: false
    field :description, :string
    field :time_invested, :integer, default: 0
    field :title, :string
    belongs_to :user, TaskTracker3.Users.User

    timestamps()
  end

  @doc false
  def changeset(task, attrs) do
    task
    |> cast(attrs, [:title, :description, :time_invested, :completed, :user_id])
    |> validate_required([:title, :description, :user_id])
  end
end
