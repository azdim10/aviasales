import React from "react";
import { addMinutes, format } from "date-fns";
import "./ticketitem.css";
import { Ticket } from "../../store/types";

interface TicketItemProps {
  ticket: Ticket;
}

const TicketItem: React.FC<TicketItemProps> = ({ ticket: { price, carrier, segments } }) => {

  return (
    <li className="ticket_item">
      <span className="ticket_price">{price} Р</span>
      <img className="ticket_logo" src={`//pics.avs.io/99/36/${carrier}.png`} alt={"Logo"} />

      {segments.map(({ date, duration, stops, origin, destination }, index) => {
        const departureDate = new Date(date);
        const arrivalTime = addMinutes(departureDate, duration);
        const departureTimeFormatted = format(departureDate, "HH:mm");
        const arrivalTimeFormatted = format(arrivalTime, "HH:mm");
        const flightDurationHours = Math.floor(duration / 60);
        const flightDurationMinutes = duration % 60;
        const flightDurationFormatted = `${flightDurationHours.toString().padStart(2, "0")}ч ${flightDurationMinutes
          .toString()
          .padStart(2, "0")}м`;
        const stopsCount = stops.length;
        const stopsText = stopsCount === 1 ? "пересадка" : "пересадки";

        return (
          <React.Fragment key={index}>
            <tr>
              <th className="ticket_upper">
                {origin} - {destination}
              </th>
              <th className="ticket_upper">В пути</th>
              {stopsCount > 0 && (
                <th className="ticket_upper">
                  {stopsCount} {stopsText}
                </th>
              )}
            </tr>
            <tr>
              <th className="ticket_foot">
                {departureTimeFormatted} - {arrivalTimeFormatted}
              </th>
              <th className="ticket_foot">{flightDurationFormatted}</th>
              <th className="ticket_foot">{stops.join(", ")}</th>
            </tr>
          </React.Fragment>
        );
      })}
    </li>
  );
};

export default TicketItem;