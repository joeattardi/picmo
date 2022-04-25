import { Events, EventKey } from '../events';

type TestEvent = 
  'event1' |
  'event2';

describe('Events', () => {
  test('fires the listeners each time an event is emitted', () => {
    const events = new Events<TestEvent>();

    const handler1 = jest.fn();
    const handler2 = jest.fn();

    events.on('event1', handler1);
    events.on('event1', handler2);

    events.emit('event1', 1);
    events.emit('event1', 2);

    expect(handler1).toHaveBeenCalledWith(1);
    expect(handler2).toHaveBeenCalledWith(2);
  });

  test('adds a one-time event listener', () => {
    const events = new Events<TestEvent>();
    const handler = jest.fn();

    events.once('event1', handler);

    events.emit('event1');
    events.emit('event1');

    expect(handler).toHaveBeenCalledTimes(1);
  });

  test('removes an event listener', () =>  {
    const events = new Events<TestEvent>();

    const handler = jest.fn();

    events.on('event1', handler);
    events.emit('event1');
    events.off('event1', handler);
    events.emit('event1');

    expect(handler).toHaveBeenCalledTimes(1);
  });

  test('calls the handler with the context set', () => {
    const events = new Events<TestEvent>();

    const spy = jest.fn();

    const user = {
      name: 'joe',
      sayHello() {
        spy(this.name);
      }
    }
    
    events.on('event1', user.sayHello, user);
    events.emit('event1');
    expect(spy).toHaveBeenCalledWith('joe');
  });

  test('removes all listeners', () => {
    const events = new Events<TestEvent>();
    
    const handler1 = jest.fn();
    const handler2 = jest.fn();

    events.on('event1', handler1);
    events.on('event2', handler2);

    events.removeAll();
    events.emit('event1');
    events.emit('event2');

    expect(handler1).not.toHaveBeenCalled();
    expect(handler2).not.toHaveBeenCalled();
  })
});