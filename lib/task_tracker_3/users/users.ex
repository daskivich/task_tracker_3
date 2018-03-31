defmodule TaskTracker3.Users do
  @moduledoc """
  The Users context.
  """

  import Ecto.Query, warn: false
  alias TaskTracker3.Repo

  alias TaskTracker3.Users.User

  @doc """
  Returns the list of users.

  ## Examples

      iex> list_users()
      [%User{}, ...]

  """
  def list_users do
    Repo.all(User)
  end

  @doc """
  Gets a single user.

  Raises `Ecto.NoResultsError` if the User does not exist.

  ## Examples

      iex> get_user!(123)
      %User{}

      iex> get_user!(456)
      ** (Ecto.NoResultsError)

  """
  def get_user!(id), do: Repo.get!(User, id)

  def get_user(id), do: Repo.get(User, id)

  # a method to get a user by his/her email address, which must be unique
  def get_user_by_email(email) do
    Repo.get_by(User, email: email)
  end

  # method to get a user by email with password authentication from Nat's Notes
  # http://www.ccs.neu.edu/home/ntuck/courses/2018/01/cs4550/notes/17-passwords/notes.html
  def get_and_auth_user(email, password) do
    IO.puts("entered Users.get_and_auth_user()")
    user = get_user_by_email(email)

    if user == nil do
      nil
    else
      Comeonin.Argon2.check_pass(user, password)
#      |> verify_tries(user)
    end

    # case Comeonin.Argon2.check_pass(user, password) do
    #   {:ok, user} -> user |> verify_tries()
    #   _else       -> nil |> verify_tries()
    # end
  end

  # allows 10 log-in attempts per hour
  def verify_tries(check_result, user) do
    if user.pw_last_try == nil ||
      DateTime.diff(DateTime.utc_now(), user.pw_last_try) > 360 do

      reset_tries(user)

      case check_result do
        {:ok, user} -> user
        _else       -> one_failed_try(user)
      end
    else
      if user.pw_tries > 10 do
        nil
      else
        case check_result do
          {:ok, user} -> reset_tries(user)
          _else       -> increment_tries(user)
        end
      end
    end
  end

  # resets pw_tries to 0 and pw_last_try to utc_now
  def reset_tries(user) do
    update_user(user, %{pw_tries: 0, pw_last_try: DateTime.utc_now()})
    get_user(user.id)
  end

  # resets pw_tries to 1 and pw_last_try to utc_now
  def one_failed_try(user) do
    update_user(user, %{pw_tries: 1, pw_last_try: DateTime.utc_now()})
    nil
  end

  # increments pw_tries and sets pw_last_try to utc_now
  def increment_tries(user) do
    update_user(user, %{pw_tries: user.pw_tries + 1,
      pw_last_try: DateTime.utc_now()})
    nil
  end

  @doc """
  Creates a user.

  ## Examples

      iex> create_user(%{field: value})
      {:ok, %User{}}

      iex> create_user(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_user(attrs \\ %{}) do
    %User{}
    |> User.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a user.

  ## Examples

      iex> update_user(user, %{field: new_value})
      {:ok, %User{}}

      iex> update_user(user, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_user(%User{} = user, attrs) do
    user
    |> User.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a User.

  ## Examples

      iex> delete_user(user)
      {:ok, %User{}}

      iex> delete_user(user)
      {:error, %Ecto.Changeset{}}

  """
  def delete_user(%User{} = user) do
    Repo.delete(user)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking user changes.

  ## Examples

      iex> change_user(user)
      %Ecto.Changeset{source: %User{}}

  """
  def change_user(%User{} = user) do
    User.changeset(user, %{})
  end
end
