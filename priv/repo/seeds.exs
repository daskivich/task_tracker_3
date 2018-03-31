# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     TaskTracker3.Repo.insert!(%TaskTracker3.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

defmodule Seeds do
  alias TaskTracker3.Repo
  alias TaskTracker3.Users.User
  alias TaskTracker3.Tasks.Task

  def run do
    ph1 = Comeonin.Argon2.hashpwsalt("password1");
    ph2 = Comeonin.Argon2.hashpwsalt("password2");
    ph3 = Comeonin.Argon2.hashpwsalt("password3");
    ph4 = Comeonin.Argon2.hashpwsalt("password4");

    Repo.delete_all(User)
    a = Repo.insert!(%User{ name: "alice", email: "alice@example.com", password_hash: ph1 })
    b = Repo.insert!(%User{ name: "bob", email: "bob@example.com", password_hash: ph2 })
    c = Repo.insert!(%User{ name: "carol", email: "carol@example.com", password_hash: ph3 })
    d = Repo.insert!(%User{ name: "dave", email: "dave@example.com", password_hash: ph4 })

    Repo.delete_all(Task)
    Repo.insert!(%Task{ user_id: a.id, title: "Fix Bug 1", description: "The first bug in the system." })
    Repo.insert!(%Task{ user_id: b.id, title: "Fix Bug 2", description: "The second bug in the system." })
    Repo.insert!(%Task{ user_id: b.id, title: "Fix Bug 3", description: "The third bug in the system." })
    Repo.insert!(%Task{ user_id: c.id, title: "Fix Bug 4", description: "The fourth bug in the system." })
    Repo.insert!(%Task{ user_id: d.id, title: "Fix Bug 5", description: "The fifth bug in the system." })
  end
end

Seeds.run
