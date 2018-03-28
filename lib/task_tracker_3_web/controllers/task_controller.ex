defmodule TaskTracker3Web.TaskController do
  use TaskTracker3Web, :controller

  alias TaskTracker3.PoTasks
  alias TaskTracker3.PoTasks.Task

  action_fallback TaskTracker3Web.FallbackController

  def index(conn, _params) do
    tasks = PoTasks.list_tasks()
    render(conn, "index.json", tasks: tasks)
  end

  def create(conn, %{"task" => task_params}) do
    with {:ok, %Task{} = task} <- PoTasks.create_task(task_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", task_path(conn, :show, task))
      |> render("show.json", task: task)
    end
  end

  def show(conn, %{"id" => id}) do
    task = PoTasks.get_task!(id)
    render(conn, "show.json", task: task)
  end

  def update(conn, %{"id" => id, "task" => task_params}) do
    task = PoTasks.get_task!(id)

    with {:ok, %Task{} = task} <- PoTasks.update_task(task, task_params) do
      render(conn, "show.json", task: task)
    end
  end

  def delete(conn, %{"id" => id}) do
    task = PoTasks.get_task!(id)
    with {:ok, %Task{}} <- PoTasks.delete_task(task) do
      send_resp(conn, :no_content, "")
    end
  end
end
