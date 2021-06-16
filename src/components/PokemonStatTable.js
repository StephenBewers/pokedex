import React from "react";
import "./PokemonStatTable.scss";

const PokemonStatTable = ({ stats, textCleanup }) => {

    // Gets the sum of all the base stat values
    const getTotalStatsValue = (stats) => {
        let totalStatsValue = 0;
        stats.forEach(stat => {
            totalStatsValue += stat.base_stat;
        });
        return totalStatsValue;
    }

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
          return (
            <tr key={`stat-${i}`}>
              <td className={`stat-name ${stat.stat.name}`}>{textCleanup(stat.stat.name)}</td>
              <td className="stat-value">
                {stat.base_stat}
                <span
                  className="stat-bar-outer"
                  style={{
                    paddingRight: (155 - stat.base_stat) + "px",
                  }}
                >
                  <span
                    className="stat-bar-inner"
                    style={{
                      paddingRight: stat.base_stat+ "px",
                    }}
                  ></span>
                </span>
              </td>
            </tr>
          );
        })}
    </tbody>
      <tfoot>
        <tr>
          <td>Total</td>
          <td>{getTotalStatsValue(stats)}</td>
        </tr>
      </tfoot>
    </table>
  );
};

export default PokemonStatTable;
