# TaskTracker3

Design decisions:

 * The authentication token was only stored once in the store. It was then
 injected into any components that needed it via the Redux connect() method.
 This helped increase efficiency and minimize the risk of forgetting to update
 the token in all of its locations.
 * Requests to create a task, edit a task, and edit a user were all
 authenticated with the authentication token in corresponding server-side
 controller. This authentication token was its own key/value pair in the
 API JSON data for the sake of clarity.
 * Instead of storing a "selected_user" and a "selected_task" in the state
 whenever a user was selected for editing, that select user's or task's data
 was inserted into the edit_user_form or edit_task_form respectively. This
 helped keep the size of the store to a minimum.
 * A "LOG_OUT" action type case was included in all store functions to clear
 all data from the store when a user logs out--a simple but effective way
 to dispatch the "LOG_OUT" only once but have it clear multiple data fields.
 * API calls to request_tasks() and request_users() were only executed after
 a user successfully logged in to project that data from folks who don't have
 an account with the system.
 * Matching the :user_id from the "/users/:user_id" and passing this as a
 prop to the Feed component allowed me to identify which user's feed I
 should display without cluttering the store with additional data that would
 only be relevant in this one particular situation. But having this data
 allowed me to compare with the logged in user to see determine if edit
 links should be displayed for each task--as they should only be displayed
 if the user feed being viewed is that of the current user.
 * I Redux-ed the Logout function in order to have the ability to dispatch
 the "LOG_OUT" action, a simple way to clear the data store--and redirected
 to the index page. The index page checks if there's a currently logged-in
 user: if so, it displays the Home component; if not, it displays the
 form to create a new user.
 * For the Feed and Users components, I first checked if there was a logged
 in user before displaying anything. If there was no logged-in user, I
 displayed a prompt to log in. If there was a logged-in user, the appropriate
 content was rendered. This is helpful in situations when someone bookmarks
 a the Users route or a Feed route; if they return and log in, these pages
 render properly.
 * I hid the navigation links in the nav bar until after a valid login in
 order to prevent those without accounts from thinking they could access
 that functionality.
 * Two props were passed to the Feed component useful only within the context
 of a particular selection; in order not to clutter the data store, I passed
 these at the component level. One, "all_users", a boolean to indicate
 whether all users' tasks should be displayed in the feed; the other,
 "match_user_id", the id the user being selected for feed display, matched
 from the user route.
 * Email addresses were required to be unique to ensure that resolvability
 of log-ins.
 * I included the user's name in the JSON returned by the token view to
 simplify the process by which the current user's name is displayed in the
 session info in the nav bar.
>>>>>>> 053169642599f6a473860f4328b297f10bc8425f


To start your Phoenix server:

  * Install dependencies with `mix deps.get`
  * Create and migrate your database with `mix ecto.create && mix ecto.migrate`
  * Install Node.js dependencies with `cd assets && npm install`
  * Start Phoenix endpoint with `mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

Ready to run in production? Please [check our deployment guides](http://www.phoenixframework.org/docs/deployment).

## Learn more

  * Official website: http://www.phoenixframework.org/
  * Guides: http://phoenixframework.org/docs/overview
  * Docs: https://hexdocs.pm/phoenix
  * Mailing list: http://groups.google.com/group/phoenix-talk
  * Source: https://github.com/phoenixframework/phoenix
