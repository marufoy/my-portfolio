import React from 'react';

type ButtonProps = {
    children: React.ReactNode;// ボタンの中に表示するテキストやアイコン
    onClick: () => void;// ボタンがクリックされたときに実行する関数
};

const Button: React.FC<ButtonProps> = ({children, onClick}) => {
    return (
        <button onClick={onClick}>{children}</button>
    );
};

export default Button;