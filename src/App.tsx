import { useState } from "react";
import "./style/App.css";

type Product = {
  id: string;
  name: string;
  src: string;
  price: number;
};

type Bag = {
  id: string;
  name: string;
  src: string;
  price: number;
  count: number;
};

function App() {
  const [money, setMoney] = useState(1000);
  const [bag, setBag] = useState<Bag[]>([]);
  const [total, setTotal] = useState(0);
  const products: Product[] = [
    { id: "01", name: "コーヒー", src: "src/assets/coffee.png", price: 100 },
    {
      id: "02",
      name: "ミルクティー",
      src: "src/assets/tea_straight.png",
      price: 150,
    },
    {
      id: "03",
      name: "メロンソーダ",
      src: "src/assets/melonsoda.png",
      price: 500,
    },
  ];

  // const handleClick = (product: Product) => {
  //   bag.map((bagItem) =>
  //     product.id === bagItem.id
  //       ? //  既に同じIDがある時の処理
  //         { ...bagItem, count: bagItem.count + 1 }
  //       : //  新しく増やす処理
  //         setBag((item) => [
  //           ...item,
  //           {
  //             ...product,
  //             count: 1,
  //           },
  //         ])
  //   );

  //   setTotal((total) => total + product.price);
  // };
  const handleClick = (product: Product) => {
    // const isAlreadyExtisits = bag.some((bagItem) => bagItem.id === product.id);
    const findedItem = bag.find((bagItem) => bagItem.id === product.id);

    console.log(findedItem);

    addTotal(product);
    if (findedItem) {
      handleAddCount(findedItem);

      // setTotal((total) => total + product.price);
      return;
    }

    setBag((item) => [
      ...item,
      {
        ...product,
        count: 1,
      },
    ]);

    // setTotal((total) => total + product.price);

    // isAlreadyExtisits  ? (
    //   handleAddCount({...product,count:1})
    // ):(
    //           setBag((item) => [
    //           ...item,
    //           {
    //             ...product,
    //             count: 1,
    //           },
    //         ]))
  };

  const addTotal = (item: Product | Bag) => {
    setTotal((total) => total + item.price);
  };

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

  // setBag((item) => [
  //   ...item,
  //   {
  //     ...product,
  //     count: 1,
  //   },
  // ]);

  // setBag((item) => [
  //   ...item,
  //   // bag.filter((item) => product.id === item.id){

  //   // }
  //   {
  //     ...product,
  //     count: 1,
  //   },
  // ]);

  // setTotal((total) => total + product.price);
  // };

  const deleteItem = (item: Bag) => {
    const deleteItem = bag.filter((b) => b.id !== item.id);

    setBag(deleteItem);
  };
  const handleAddCount = (selectedItem: Bag) => {
    setBag((items) =>
      items.map((item) =>
        selectedItem.id === item.id
          ? {
              ...item,
              count: item.count + 1,
            }
          : item
      )
    );
    addTotal(selectedItem);
  };
  const handleSub = (selectedItem: Bag) => {
    setBag((items) =>
      items.map((item) =>
        selectedItem.id === item.id
          ? {
              ...item,
              count: item.count - 1,
            }
          : item
      )
    );
    setTotal((total) => total - selectedItem.price);
  };

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
          <div key={product.id} onClick={() => handleClick(product)}>
            <div className="imgs">
              {<img id={product.id} src={product.src} />}
            </div>
          </div>
        ))}
      </div>
      <div>
        <h2>買い物かご</h2>
        <h3>合計:{total}円</h3>
        <ul>
          {bag.map((item) => (
            <div key={item.id}>
              <li>
                <p>
                  {item.name}:{item.price}円
                </p>
                <button onClick={() => deleteItem(item)}>キャンセル</button>
                <p>個数:{item.count}</p>
                <button onClick={() => handleAddCount(item)}>+</button>
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

// useMemoを使ってバッグの中身の監視して、中身が変わったらTotalを描画するだけ