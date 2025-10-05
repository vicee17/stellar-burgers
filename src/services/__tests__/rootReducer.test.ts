import { rootReducer } from '../store'; 
import { RootState } from '../store';

describe('RootReducer', () => {
  it('должен возвращать начальное состояние для неизвестного экшена', () => {
    const unknownAction = { type: 'UNKNOWN_ACTION' };
    const state = rootReducer(undefined, unknownAction); 

    expect(state).toEqual(rootReducer(undefined, { type: '@@INIT' }));
  });
});