import React, { type ReactNode } from "react";
import { createPortal } from "react-dom";

type DialogProps = {
  money: number;
  memo: number;
  count: number;
  onSubmit: () => void;
  onClose: () => void;
  isOpen: boolean;
  isEnoughMoney: boolean;
  children: ReactNode;
};

const Dialog: React.FC<DialogProps> = ({
  money,
  memo,
  onSubmit,
  onClose,
  isOpen,
  children,
}) => {
  if (!isOpen) {
    return null;
  }

  const portalRoot = document.getElementById("portal-root");
  if (!portalRoot) return null;

  const handleBackdorpClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className="dialog-backdrop" onClick={handleBackdorpClick}>
      <div className="dialog-content">
        <h2>
          所持金：{money} 購入金額{memo}
        </h2>
        <div className="dialog-body">{children}</div>
        <button onClick={onClose}>閉じる</button>
      </div>
    </div>,
    portalRoot
  );
};

export default Dialog;
