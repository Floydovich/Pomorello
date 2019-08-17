import { Logger } from "./logger.js"
import { notify } from "./notifications.js"

export async function Start(t, set_length, break_length) {
  Logger.trace("Starting new set");
  return t.set("card", "shared", {
    POMORELLO_ACTIVE: true,
    POMORELLO_BREAK: false,
    POMORELLO_START: Date.now(),
    POMORELLO_SET_LENGTH: set_length,
    POMORELLO_BREAK_LENGTH: break_length
  });
}

export async function Break(t, state) {
  Logger.trace(`Pomodoro for card ${state.name} finished.`);
  
  notify(t, `Pomodoro for card ${state.name} complete.\nTime to take a break!`);

  state.is_active = false;
  state.is_break = true;
  state.start_ms = Date.now();
  state.addSet();

  return state.sync(t);
}

export async function End(t, state) {
  Logger.trace(`Break for card ${state.name} finished.`);

  notify(t, `Break for card ${state.name} has ended!`);

  state.is_active = false;
  state.is_break = false;

  return state.sync(t);
}

