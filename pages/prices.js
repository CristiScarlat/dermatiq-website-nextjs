import { useContext } from "react";
import { Table } from "react-bootstrap";
import { prices, priceTable } from "../utils/uiConstants";
import { Ctx } from "../context/context";
import styles from "../styles/Prices.module.css";

const Prices = () => {
  const ctx = useContext(Ctx);
  const lang = ctx.state.lang;

  return (
    <div className={styles.wrapper}>
      <Table>
        <thead>
          <tr className="border-bottom border-light">
            {priceTable[lang].tableHeader.map((hd) => (
              <th key={hd} className="m-2">{hd}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.keys(prices[lang]).map((service) => (
            <tr key={service} className="border-bottom border-light">
              <td className="m-2">{service}</td> 
              <td className={`${styles["price-color-font"]}`}>{prices[lang][service]}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Prices;
