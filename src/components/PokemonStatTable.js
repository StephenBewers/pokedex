import React from "react";
import "./PokemonStatTable.scss";
import { textCleanup } from "../helpers.js";

const PokemonStatTable = ({ stats, types }) => {
  // Gets the sum of all the base stat values
  const getTotalStatsValue = (stats) => {
    let totalStatsValue = 0;
    stats.forEach((stat) => {
      totalStatsValue += stat.base_stat;
    });
    return totalStatsValue;
  };

  const totalStatsValue = getTotalStatsValue(stats);

  // Get the types
  const type1 = types[0].type.name;
  const type2 = types.length > 1 ? types[1].type.name : type1;

  return (
    <table className="pokemon-stat-table">
      <caption>The base stats of this pokémon.</caption>
      <thead>
        <tr>
          <th scope="col" className="modal-info-sublabel">
            Stat
          </th>
          <th scope="col" className="modal-info-sublabel">
            Value
          </th>
        </tr>
      </thead>
      <tbody>
        {stats.map((stat, i) => {
          if (stat.stat.name.includes("special")) {
            stat.stat.name = stat.stat.name.replace("special", "Sp.");
          }
          return (
            <tr key={`stat-${i}`}>
              <td className={`stat-name ${stat.stat.name}`}>
                {textCleanup(stat.stat.name)}
              </td>
              <td className="stat-value">
                <div>
                  {stat.base_stat}
                  <span
                    className="stat-bar-outer"
                    style={{
                      paddingRight: 150 - (stat.base_stat / 255) * 150 + "px",
                    }}
                  >
                    <span
                      className={`stat-bar-inner ${type1}`}
                      style={{
                        paddingRight: (stat.base_stat / 255) * 150 + "px",
                      }}
                    ></span>
                  </span>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        <tr>
          <td className="stat-name total">Total</td>
          <td className="stat-value total">
            <div>
              {totalStatsValue}
              <span
                className="stat-bar-outer total"
                style={{
                  paddingRight: 150 - (totalStatsValue / 6 / 255) * 150 + "px",
                }}
              >
                <span
                  className={`stat-bar-inner total ${type2}`}
                  style={{
                    paddingRight: (totalStatsValue / 6 / 255) * 150 + "px",
                  }}
                ></span>
              </span>
            </div>
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default PokemonStatTable;
