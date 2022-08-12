import EventEmitter from 'eventemitter3';

const eventEmitter = new EventEmitter();

export type EmitterEventType = '' | 'tenant';

type CallbackEmitter = (...args: any[]) => void;

const emitter = {
  ...eventEmitter,
  on: (event: EmitterEventType, cb: CallbackEmitter) => eventEmitter.on(event, cb),
  once: (event: EmitterEventType, cb: CallbackEmitter) => eventEmitter.once(event, cb),
  off: (event: EmitterEventType, cb: CallbackEmitter) => eventEmitter.off(event, cb),
  emit: (event: EmitterEventType, ...args: any[]) => eventEmitter.emit(event, ...args),
};

Object.freeze(emitter);

export default emitter;
