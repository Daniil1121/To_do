import { useEffect, useState } from "react";

import ReactDOM from "react-dom";
/**
 * @namespace Portal_Component
 */

/**
 * Компонент, используемый для добавления элемента в конец документа
 * @memberof Portal_Component
 * @returns {React.ReactElement} - Всплывающее окно
 * @param {ReactElement<JSXElementConstructor<any>>}
 */
const Portal = ({ children }) => {
  const [container] = useState(() => document.createElement("div"));
  useEffect(() => {
    document.body.appendChild(container);
    return () => {
      document.body.removeChild(container);
    };
  }, []);

  return ReactDOM.createPortal(children, container);
};

export default Portal;
