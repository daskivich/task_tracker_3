defmodule TaskTracker3Web.TaskView do
  use TaskTracker3Web, :view
  alias TaskTracker3Web.TaskView

  def render("index.json", %{tasks: tasks}) do
    %{data: render_many(tasks, TaskView, "task.json")}
  end

  def render("show.json", %{task: task}) do
    %{data: render_one(task, TaskView, "task.json")}
  end

  def render("task.json", %{task: task}) do
    %{id: task.id,
      title: task.title,
      description: task.description,
      time_invested: task.time_invested,
      completed: task.completed}
  end
end
