import React from 'react';
import throttle from '../utils/throttle';

const getList = () => {
  const arr = [];
  for (let i = 0; i <= 50; i++) {
    arr.push(`Hello World`);
  }
  return arr;
};

const list = getList();

function List() {
  const [data, setData] = React.useState(list);

  React.useEffect(() => {
    window.addEventListener(
      'scroll',
      throttle(() => {
        if (
          window.scrollY + window.innerHeight + 200 >=
          document.documentElement.scrollHeight
        ) {
          setData((prev) => {
            const copy = [...prev];
            for (let i = 0; i <= 20; i++) {
              copy.push(`Hello World`);
            }
            return copy;
          });
        }
      }, 50)
    );
  }, []);

  return (
    <div>
      {data.map((item, index) => (
        <h2 key={index}>{item}</h2>
      ))}
      <hr />
    </div>
  );
}

export default List;
