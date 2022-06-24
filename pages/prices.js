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
      <Table hover>
        <thead>
          <tr>
            {priceTable[lang].tableHeader.map((hd) => (
              <th className="m-5">{hd}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.keys(prices[lang]).map((service) => (
            <tr>
              <td className="m-5">{service}</td> 
              <td className={`m-5 ${styles["price-color-font"]}`}>{prices[lang][service]}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Prices;
