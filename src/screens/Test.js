
import { useState } from 'react';


// const Aaaaa = () => {
//   return (
//     <>
      
//     </>
//   );
// }
const Test = (props)=> {
  const [coinValue, setCoinValue] = useState(props.pop)
  return (
    <>
      <p>{coinValue}</p>


      <input type="text" value={props.value} onChange={props.onInputChange} />

      <input type="text" value={coinValue}/>
    </>
  );
}

export default Test