defmodule TaskTracker3.Users.User do
  use Ecto.Schema
  import Ecto.Changeset


  schema "users" do
    field :email, :string
    field :name, :string
    field :password_hash, :string
    field :pw_last_try, :utc_datetime
    field :pw_tries, :integer

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:name, :email, :password_hash, :pw_tries, :pw_last_try])
    |> validate_required([:name, :email, :password_hash, :pw_tries, :pw_last_try])
    |> unique_constraint(:email)
  end
end
