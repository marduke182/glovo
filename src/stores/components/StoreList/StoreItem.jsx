import React from 'react';
import { dayToString } from '@/shared/libs/date-fns';

export default function({id, name, description, tags, storeIsOpen, nextOpeningSchedule, }) {
  return (
    <article className="StoreList-item">
      <header>
        <h3>{name}</h3>
        <sub>{description}</sub>
      </header>
      {storeIsOpen &&
        <p>
          Open right now
        </p>
      }
      {
        !storeIsOpen && nextOpeningSchedule &&
          <p>
            Next opening time: {dayToString(nextOpeningSchedule.day)} at {nextOpeningSchedule.open}
          </p>
      }
    </article>
  )
}
