import { useEffect, useMemo, useState } from "react";
import "./style/App.css";
import Dialog from "./components/Dialogs/Dialog";
import CancelDialog from "./components/Dialogs/CancelDialog";
import { supabase } from "./lib/supabaseClient";
import type { Bag,Products } from "./types";
import Cart from "./components/Cart";

function App() {
  const [money, setMoney] = useState(1000);
  const [bag, setBag] = useState<Bag[]>([]);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [isEnoughMoney, setIsEnoughMoney] = useState(false);
  const [products, setProducts] = useState<Products[]>([]);
  // const products: Products[] = [
  //   { id: "01", name: "コーヒー", src: "src/assets/coffee.png", price: 100 },
  //   {
  //     id: "02",
  //     name: "ミルクティー",
  //     src: "src/assets/tea_straight.png",
  //     price: 150,
  //   },
  //   {
  //     id: "03",
  //     name: "メロンソーダ",
  //     src: "src/assets/melonsoda.png",
  //     price: 500,
  //   },
  // ];

  useEffect(() => {
    const fetchProducts = async () => {
        const { data, error } = await supabase.from("Products").select("*");
        console.log(typeof(data)+"data")
        if (error) {
          console.error("Error fetching products:", error);
          return;
        }
        setProducts(data ?? []);
      }
      fetchProducts()
      // console.log("fecthOK!");
      // console.log(products[0])
  },[])

  const handleClick = (product: Products) => {
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
  const deleteBag = () => {
    setBag([]);
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
      );
      return newBag.filter((item) => item.count > 0);
    });
  };

  const openDialog = () => {
    setIsOpenDialog(true);
  };

  const onSubmit = () => {};
  const onClose = () => {
    setIsOpenDialog(false)
  };
  const bagTotalCount = useMemo(() => {
    const result = bag.map((items) => items.count);
    return result.reduce((sum, value) => {
      return sum + value;
    }, 0);
  }, [bag]);

  const memoResult = useMemo(() => {
    const result = bag.map((item) => item.price * item.count);

    return result.reduce((sum, value) => {
      return sum + value;
    }, 0);
  }, [bag]);

  const enoughCheck = (money:number,memo:number) => {

    if(money < memo || memo <= 0) {
      setIsEnoughMoney(false)
    } else {
      setIsEnoughMoney(true)
    }
    openDialog()
  }

  return (
    <>
      <div className="title">
        <h1>買い物APP</h1>
        <h2>所持金:{money}円</h2>
      </div>

      {isEnoughMoney && (
        <Dialog
          money={money}
          memo={memoResult}
          count={bagTotalCount}
          onSubmit={onSubmit}
          onClose={onClose}
          isOpen={isOpenDialog}
          isEnoughMoney={isEnoughMoney}
        >
          <>
            <p>ご購入を確定しますか？</p>
            <p>
              総額 {memoResult} 円：計 {bagTotalCount} 点
            </p>
            <button onClick={onSubmit}>はい</button>
            <button onClick={onClose}>いいえ</button>
          </>
        </Dialog>
      )}
      {!isEnoughMoney && (
        <CancelDialog
          money={money}
          memo={memoResult}
          onSubmit={onSubmit}
          onClose={onClose}
          isOpen={isOpenDialog}
          isEnoughMoney={isEnoughMoney}
        >
          <>
            <p>所持金が不足しています。</p>
            <p>
              所持金: {money} 円 総額:{memoResult} 円
            </p>
          </>
        </CancelDialog>
      )}

      <div className="imageArea">
        {products.map((product) => (
          <div key={product.id} onClick={() => handleClick(product)}>
            <div className="imgs">
              {<img id={product.id} src={product.src} />}
            </div>
            <p>
              {product.name}:{product.price}円
            </p>
          </div>
        ))}
      </div>
      <div className="bag-container">
        {bag.map((item) =>
          item.count > 0 ? (
            // <Cart
            //   money={money}
            //   memo={memoResult}
            //   enoughCheck={enoughCheck(money,memoResult)}
            //   openDialog={openDialog}
            //   deleteBag={deleteBag}
            // >
            // </Cart>
            <>
            <h2>買い物かご</h2>
            <h3>合計:{memoResult}円</h3>
            <button onClick={() => {enoughCheck(money,memoResult);openDialog()}}>購入</button>
            <button onClick={deleteBag}>かごを空にする</button>
            </>
          ) : (
            <div key={item.id}></div>
          )
        )}
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
// webソケットでdatabaseに接続