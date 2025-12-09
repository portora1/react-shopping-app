import { useMemo, useState } from "react";
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

  const handleClick = (product: Product) => {
    const findedItem = bag.find((bagItem) => bagItem.id === product.id);

    console.log(findedItem);

    // addTotal(product);
    if (findedItem) {
      handleAddCount(findedItem);

      return;
    }

    setBag((item) => [
      ...item,
      {
        ...product,
        count: 1,
      },
    ]);
  };

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
  };
  const handleSub = (selectedItem: Bag) => {
    setBag((items) => {
      const newBag = items.map((item) =>
        selectedItem.id === item.id
          ? {
              ...item,
              count: item.count - 1,
            }
          : item
    )
    return newBag.filter(item => item.count > 0)
  });
  };

  const memoResult = useMemo(() => {
    const result = bag.map((item) => item.price * item.count);
    return result.reduce((sum, value) => {
      return sum + value;
    }, 0);
  }, [bag]);

  return (
    <>
      <div className="title">
        <h1>買い物APP</h1>
        <h2>所持金:{money}円</h2>
      </div>

      <div className="imageArea">
        {products.map((product) => (
          <div key={product.id} onClick={() => handleClick(product)}>
            <div className="imgs">
              {<img id={product.id} src={product.src} />}
            </div>
            <p>{product.name}:{product.price}円</p>
          </div>
        ))}
      </div>
      <div className="bag-container">
        <h2>買い物かご</h2>
        <h3>合計:{memoResult}円</h3>
        <ul>
          {bag.map((item) =>
            item.count > 0 ? (
                <li key={item.id}>
                  <div className="item-info">
                    <p>
                      {item.name}:{item.price}円
                    </p>
                  </div>
                  <div className="item-actions">
                    <button onClick={() => deleteItem(item)}>キャンセル</button>
                    <p>個数:{item.count}</p>
                    <button onClick={() => handleAddCount(item)}>+</button>
                    <button onClick={() => handleSub(item)}>-</button>
                  </div>
                </li>
            ) : (
              <div key={item.id}></div>
            )
          )}
        </ul>
      </div>
    </>
  );
}

export default App;

// useMemoを使ってバッグの中身の監視して、中身が変わったらTotalを描画する
// bagのcountが変わった時に、countが増えたら何かにcountが動いた物のpriceを増やす、減ったら減らす
// 別ファイルにコードを保存
