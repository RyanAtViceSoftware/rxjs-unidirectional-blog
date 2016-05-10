export const Dispatcher = new Rx.Subject();

export function toAction(action, data) {
  return {action: action, data: data};
}

export function send(action) {
  Dispatcher.onNext({action: action});
} 