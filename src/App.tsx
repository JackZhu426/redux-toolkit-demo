import React, { useState } from 'react';
import { shallowEqual } from 'react-redux';
import { useAppDispatch, useAppSelector } from './app/hooks';
import {
  increment,
  decrement,
  amountAdded,
} from './features/counter/CounterSlice';
import { useGetDogByNameQuery } from './features/dogs/DogsApiSlice';

function App() {
  const dispatch = useAppDispatch();
  const { counter } = useAppSelector(
    (state) => ({
      counter: state.counter.value,
    }),
    shallowEqual
  );

  const [dogNum, setDogNum] = useState(10);

  // RTK Query generated custom hook
  const { data = [], isFetching } = useGetDogByNameQuery([dogNum]);

  return (
    <div className="App">
      <h1>Counter: {counter}</h1>
      <button onClick={() => dispatch(increment())}>+1</button>
      <button onClick={() => dispatch(decrement())}>-1</button>
      <button onClick={() => dispatch(amountAdded(5))}>+5</button>
      <br />
      <select
        value={dogNum}
        onChange={(e) => {
          setDogNum(Number(e.target.value));
        }}
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={15}>15</option>
        <option value={20}>20</option>
      </select>

      <div>
        {isFetching ? (
          <p>Fetching...</p>
        ) : (
          <div>
            <p>Dogs number: {data.length}</p>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Picture</th>
                </tr>
              </thead>
              <tbody>
                {data.map((dog) => (
                  <tr key={dog.id}>
                    <td>{dog.name}</td>
                    <td>
                      <img
                        src={dog.image.url}
                        alt={dog.name}
                        height={250}
                        width={300}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
