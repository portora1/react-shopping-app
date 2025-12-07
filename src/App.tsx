import { useState } from "react";
import "./style/App.css";

type Product = {
  id: string;
  name: string;
  src: string;
  price: number;
};

type Bag = {
  id:string
  name:string
  src:string
  price:number
  count:number
}

function App() {
  const [money, setMoney] = useState(1000);
  const [bag,setBag] = useState<Bag[]>([]);
  const [total,setTotal] = useState(0)
  const products = [
    { id: "01", name: "コーヒー", scr: "src/assets/coffee.png", price: 100 },
    {
      id: "02",
      name: "ミルクティー",
      scr: "src/assets/tea_straight.png",
      price: 150,
    },
    {
      id: "03",
      name: "メロンソーダ",
      scr: "src/assets/melonsoda.png",
      price: 500,
    },
  ];

  const handleClick = (product: Product) => {

    // const newItem = {
    //   id:product.id,
    //   name:product.name,
    //   src:product.src,
    //   price:product.price,
    //   count:1,
    // }
    // setBag((item) => [...item, newItem]);

    //     setBag((item) => [
    //       ...item,
    //       {
    //         id: product.id,
    //         name: product.name,
    //         src: product.src,
    //         price: product.price,
    //         count: 1,
    //       },
    //     ]);


        setBag((item) => [
          ...item,
          {
            ...product,
            count: 1,
          },
        ]);

        // setBag((item) => [
        //   ...item,
        //   // bag.filter((item) => product.id === item.id){

        //   // }
        //   {
        //     ...product,
        //     count: 1,
        //   },
        // ]);

    setTotal((total) => total + product.price);
  };

    const deleteItem = (item: Bag) => {
      const deleteItem = bag.filter((b) => b.id !== item.id);

      setBag(deleteItem);
    };
    const handleAdd = (selectedItem:Bag) => {
     setBag(items => items.map(item => 
     (selectedItem.id === item.id) ?
     ({
      ...item,
      count: item.count+1
    }) : item))
    }
    const handleSub = (selectedItem:Bag) => {
     setBag(items => items.map(item => 
     (selectedItem.id === item.id) ?
     ({
      ...item,
      count: item.count-1
    }) : item))
    }

  // useEffect(() => {
  //   return () => {

  //   }
  // },[bag])
  return (
    <>
      <h1>{money}</h1>
      <div></div>
      <div className="imageArea">
        {products.map((product) => (
          <div onClick={() => handleClick(product)}>
            <div className="imgs">
              {<img id={product.id} src={product.scr} />}
            </div>
          </div>
        ))}
      </div>
      <div>
        <h2>買い物かご</h2>
        <h3>合計:{total}円</h3>
        <ul>
          {bag.map((item) => (
            <div>
              <li>
                <p>
                  {item.name}:{item.price}円
                </p>
              <button 
              onClick={() => deleteItem(item)}
              >キャンセル</button>
              <p>個数:{item.count}</p>
              <button onClick={() => handleAdd(item)}>+</button>
              <button onClick={() => handleSub(item)}>-</button>
              </li>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
