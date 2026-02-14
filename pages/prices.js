import { useContext } from "react";
import { Table } from "react-bootstrap";
import { prices } from "../utils/uiConstants";
import { Ctx } from "../context/context";
import styles from "../styles/Prices.module.css";

const Prices = () => {
  const ctx = useContext(Ctx);
  const lang = ctx.state.lang;
  return Object.keys(prices[lang]).map(cat => {
      console.log(Object.keys(prices[lang][cat]))
      return(
          <div className={styles.wrapper} key={cat}>
              <Table>
                  <thead>
                  <tr className="border-bottom border-light">
                      {[cat, "Preț"].map((hd) => (
                          <th key={hd} className="m-2">{hd}</th>
                      ))}
                  </tr>
                  </thead>
                  <tbody>
                  {Object.keys(prices[lang][cat]).map((service) => (
                      <tr key={service} className="border-bottom border-light">
                          <td className="m-2">{service}</td>
                          <td className={`${styles["price-color-font"]}`}>{prices[lang][cat][service]}</td>
                      </tr>
                  ))}
                  </tbody>
              </Table>
          </div>
      )})
};

export default Prices;
