type cartProps = {
  money: number;
  memo: number;
  enoughCheck: () => void;
  openDialog: () => void;
  deleteBag: () => void;
};

const Cart = (cartProps) => {
  return (
    <div>
      <h2>買い物かご</h2>
      <h3>合計:{memo}円</h3>
      <button
        onClick={() => {
          enoughCheck(money, memo);
          openDialog();
        }}
      >
        購入
      </button>
      <button onClick={deleteBag}>かごを空にする</button>
    </div>
  );
};

export default Cart;
