import React, { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';

import { useTranslation } from 'react-i18next';

import DraggableItem from '../../components/places/DraggableItem';
import DropTarget from '../../components/places/DropTarget';
import SearchBar from '../../components/header/SearchBar';
import { Link } from 'react-router-dom';
import { getHours, set, format } from 'date-fns';

import { useDateContext } from '../../context/DateContext'; // Import the date context hook

function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}


const PlacePage: React.FC = () => {

  const {t}= useTranslation()

  const [focusedRoof, setFocusedRoof] = useState<string | null>('Main Room');
  const [roofs, setRoofs] = useState<string[]>(['Main Room', 'Outdoor', 'Terrace']);
  const { chosenDay } = useDateContext(); // Access chosenDay from DateContext

  const data = [
    { id: 1, name: 'Caprim Zack', time: '12:00 PM', date: '26 oct 2024', guests: 4, occasion: 'Birthday', tableNumber: 1 },
    { id: 2, name: 'Alfred Destivan', time: '14:00 PM', date: '25 oct 2024', guests: 2, occasion: 'Birthday', tableNumber: 2 },
    { id: 3, name: 'Sam Sulek', time: '17:00 PM', date: '25 oct 2024', guests: 1, occasion: 'none', tableNumber: 3 },
    { id: 4, name: 'Christopher Bums', time: '13:00 PM', date: '25 oct 2024', guests: 5, occasion: 'none', tableNumber: 4 },
    { id: 5, name: 'Alfred Zack', time: '12:00 PM', date: '25 oct 2024', guests: 4, occasion: 'Birthday', tableNumber: 5 },
    { id: 5, name: 'Alfred Zack', time: '12:00 PM', date: '25 oct 2024', guests: 4, occasion: 'Birthday', tableNumber: 7 },
  ];


  const initialShapes = [
      {
          "id": "T-01",
          "x": 248.99999999999994,
          "y": 69.99999999999999,
          "width": 217.00000000000003,
          "height": 99.99999999999986,
          "type": "rectangle",
          "max": 6,
          "min":2,
          "floor":'Main Room',
          "reservedBy": {
              "name": "",
              "time": "",
              "date": "",
              "guests": 0,
              "occasion": "",
              "tableNumber": 0
          }
      },
      {
          "id": "T-02",
          "x": 107,
          "y": 122,
          "width": 100,
          "height": 100,
          "type": "circle",
          "max": 2,
          "min":1,
          "floor":'Main Room',
          "reservedBy":
              {
                  "name": "Alfred Destivan",
                  "time": "14:00",
                  "date": "25 oct 2024",
                  "guests": 2,
                  "occasion": "Birthday",
                  "tableNumber": 2
              },
      },
      {
          "id": "T3",
          "x": 45.99999999999997,
          "y": 250,
          "type": "rectangle",
          "width": 99.99999999999997,
          "height": 130,
          "max": 4,
          "min":2,
          "floor":'Main Room',
          "reservedBy": {
              "name": "",
              "time": "",
              "date": "",
              "guests": 0,
              "occasion": "",
              "tableNumber": 0
          }
      },
      {
          "id": "T4",
          "x": 249.89485159562548,
          "y": 222.75538049542064,
          "type": "rectangle",
          "width": 99.99999999999991,
          "height": 100.00000000000031,
          "max": 5,
          "min":2,
          "floor":'Main Room',
          "reservedBy": {
              "name": "Christopher Bums",
              "time": "13:00",
              "date": "25 oct 2024",
              "guests": 5,
              "occasion": "none",
              "tableNumber": 4
          }
      },
      {
        "id": "T5",
        "x": 249.89485159562548,
        "y": 222.75538049542064,
        "type": "rectangle",
        "width": 130,
        "height": 200,
        "max": 6,
        "min":4,
        "floor":'Outdoor',
        "reservedBy": {
            "name": "Christopher Bums",
            "time": "13:00",
            "date": "25 oct 2024",
            "guests": 5,
            "occasion": "none",
            "tableNumber": 4
        }
      },
      {
        "id": "T6",
        "x": 700,
        "y": 100,
        "type": "rectangle",
        "width": 200,
        "height": 100.00000000000031,
        "max": 5,
        "min":2,
        "floor":'Outdoor',
        "reservedBy": {
              "name": "",
              "time": "",
              "date": "",
              "guests": 0,
              "occasion": "",
              "tableNumber": 0
          }
      },
      {
        "id": "T7",
        "x": 500,
        "y": 300,
        "type": "rectangle",
        "width": 100,
        "height": 100.00000000000031,
        "max": 5,
        "min":2,
        "floor":'Outdoor',
        "reservedBy": {
              "name": "",
              "time": "",
              "date": "",
              "guests": 0,
              "occasion": "",
              "tableNumber": 0
          }
      },
      {
        "id": "T8",
        "x": 20,
        "y": 100,
        "type": "cirlce",
        "width": 100,
        "height": 100.00000000000031,
        "max": 5,
        "min":2,
        "floor":'Terrace',
        "reservedBy":{
          "name": "Sam Sulek",
          "time": "17:00",
          "date": "25 oct 2024",
          "guests": 1,
          "occasion": "none",
          "tableNumber": 3
        }
      },
      {
        "id": "T9",
        "x": 20,
        "y": 300,
        "type": "rectangle",
        "width": 400,
        "height": 100.00000000000031,
        "max": 7,
        "min":2,
        "floor":'Terrace',
        "reservedBy":{
          "name": "Sam Sulek",
          "time": "19:00",
          "date": "25 oct 2024",
          "guests": 1,
          "occasion": "none",
          "tableNumber": 3
        }
      },
      {
        "id": "T9",
        "x": 20,
        "y": 60,
        "type": "rectangle",
        "width": 400,
        "height": 100.00000000000031,
        "max": 7,
        "min":2,
        "floor":'Outdoor',
        "reservedBy":{
          "name": "Sam Sulek",
          "time": "19:00",
          "date": "25 oct 2024",
          "guests": 1,
          "occasion": "none",
          "tableNumber": 3
        }
      }
  ];

  const getCurrentHour = () => {
    const currentHour = getHours(new Date());
    console.log(`Current hour: ${currentHour}`);
    return currentHour;
  };

  const hours = [];
  for (let i = 0; i < 24; i++) {
    hours.push({ id: i.toString(), time: `${i}:00` });
  }

  const [filteringHour, setFilteringHour] = useState(hours[0].time);
  const [searchResults, setSearchResults] = useState(data);

  const searchFilter = (e: any) => {
    const keyword = e.target.value;
    const results = data.filter((item) => {
      return item.name.toLowerCase().includes(keyword.toLowerCase());
    });
    setSearchResults(results);
  };

  const formattedChosenDay = format(chosenDay, 'dd MMM yyyy'); // Format chosenDay for comparison

  return (
    <div>
      <div className='flex justify-between mb-2'>
        <h1 className='text-3xl font-[700]'>{t('placeManagement.title')}</h1>
        
        <Link to='/places/design' className='btn-primary flex gap-2 items-center lt-sm:hidden'>
          {t('placeManagement.buttons.designPlace')}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.71 7.04006C21.1 6.65006 21.1 6.00006 20.71 5.63006L18.37 3.29006C18 2.90006 17.35 2.90006 16.96 3.29006L15.12 5.12006L18.87 8.87006M3 17.2501V21.0001H6.75L17.81 9.93006L14.06 6.18006L3 17.2501Z" fill="white" />
          </svg>
        </Link>
      </div>
      <p className='text-redtheme bg-softredtheme p-2 rounded-md opacity-70 mb-2 font-[400] sm:hidden'>
        {t('placeManagement.warning.1')}<br />{t('placeManagement.warning.2')}
      </p>
      <DndProvider backend={isTouchDevice() ? TouchBackend : HTML5Backend}>
        <div className="flex gap-[10px]">
          <div className={`lt-sm:hidden rounded-[10px] p-[1em] ${localStorage.getItem('darkMode')==='true'?'bg-bgdarktheme':'bg-white '}`}>
            <SearchBar SearchHandler={searchFilter} />
            <div className='grid grid-flow-col gap-3 font-[500]  my-3 justify-between'>
              <button className='btn-primary'>{t('placeManagement.filters.confirmed')}</button>
              <button className='btn-secondary '>{t('placeManagement.filters.canceled')}</button>
              <button className='btn-secondary'>{t('placeManagement.filters.waiting')}</button>
            </div>
            <div className='overflow-y-auto h-[55vh]  bar-hide'>
              {searchResults.map((item) => (
                <DraggableItem itemData={item} key={item.id} />
              ))}
            </div>
          </div>
          <div className='w-full sm:overflow-auto'>
            <div className='flex lt-sm:flex-wrap lt-sm:gap-2 justify-between'>
              <div className='flex gap-2 w-full overflow-x-auto'>
                {roofs.map((roof) => (
                  <button
                    className={` ${focusedRoof === roof ? 'btn-primary ' : 'btn-secondary'}`}
                    key={roof}
                    onClick={() => setFocusedRoof(roof)}
                  >
                    {roof}
                  </button>
                ))}
              </div>
              <div>
                <select className={`inputs ${localStorage.getItem('darkMode')==='true'?'bg-black':'bg-white'}`}  onChange={(e) => setFilteringHour(e.target.value)}>
                  {hours.map((hour) => (
                    <option key={hour.id} value={hour.time} >
                      {hour.time}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className='relative  lt-sm:h-[55vh] lt-sm:overflow-x-auto'>
              {initialShapes
                .filter(
                  (shape) =>
                    shape.floor === focusedRoof 
                  
                )
                .map(({ id, x, y, type, height, width, max, min, reservedBy }) => (
                  <DropTarget
                    min={min}
                    hourChosen={filteringHour}
                    reservedBy={reservedBy}
                    max={max}
                    type={type as 'rectangle' || 'circle'}
                    x={x}
                    y={y}
                    id={id}
                    height={height}
                    width={width}
                    key={id}
                  />
                ))}
            </div>
          </div>
        </div>
      </DndProvider>
    </div>
  );
};

export default PlacePage;
