import React, { useState } from 'react'
import { Plus, X, Copy } from 'lucide-react'

interface SlotData {
  type: string;
  start: string;
  end: string;
  placeLimit: number;
}

interface DayData {
  day: string;
  available: boolean;
  slots: SlotData[];
}

const Availability = () => {
  const [selectedArea, setSelectedArea] = useState('Restaurant')

  const areas = ['Restaurant', 'Table 01', 'Table 02']

  const initialData: DayData[] = [
    { day: 'SUN', available: false, slots: [] },
    { day: 'MON', available: true, slots: [{ type: 'Lunch', start: '09:00', end: '12:00', placeLimit: 15 }] },
    { day: 'TUE', available: true, slots: [{ type: 'Lunch', start: '09:00', end: '12:00', placeLimit: 15 }] },
    { day: 'WED', available: true, slots: [{ type: 'Lunch', start: '09:00', end: '12:00', placeLimit: 15 }] },
    { day: 'THU', available: true, slots: [{ type: 'Lunch', start: '09:00', end: '12:00', placeLimit: 15 }] },
    { day: 'FRI', available: true, slots: [{ type: 'Lunch', start: '09:00', end: '12:00', placeLimit: 15 }] },
    { day: 'SAT', available: false, slots: [] },
  ]

  const [data, setData] = useState<DayData[]>(initialData)

  const toggleAvailability = (index: number) => {
    const newData = [...data]
    newData[index].available = !newData[index].available
    if (!newData[index].available) newData[index].slots = []
    setData(newData)
  }

  const addSlot = (dayIndex: number) => {
    const newData = [...data]
    newData[dayIndex].slots.push({ type: 'Lunch', start: '09:00', end: '12:00', placeLimit: 15 })
    setData(newData)
  }

  const removeSlot = (dayIndex: number, slotIndex: number) => {
    const newData = [...data]
    newData[dayIndex].slots.splice(slotIndex, 1)
    setData(newData)
  }

  const updateSlot = (
    dayIndex: number,
    slotIndex: number,
    field: keyof SlotData,
    value: string | number
  ) => {
    const newData = [...data];
  
    if (field === 'type' || field === 'start' || field === 'end') {
      newData[dayIndex].slots[slotIndex][field] = value as string;
    } else if (field === 'placeLimit') {
      newData[dayIndex].slots[slotIndex][field] = value as number;
    }
  
    setData(newData);
  };
  

  return (
    <div className="bg-white rounded-lg p-6 w-full ">
      <h2 className="text-2xl font-bold text-center mb-4">Availability</h2>
      <div className="flex justify-center gap-2 mb-6">
        {areas.map((area) => (
          <button
            key={area}
            className={`btn-secondary ${
              selectedArea === area
                ? 'bg-[#88AB61] text-white'
                : 'bg-[#E8F0DE] text-[#88AB61]'
            }`}
            onClick={() => setSelectedArea(area)}
          >
            {area}
          </button>
        ))}
        
      </div>
      <div className="space-y-4 mx-20">
        {data.map((day, dayIndex) => (
          <div key={day.day} className="flex items-start">
            <div className="flex mt-3 items-center gap-2 w-20">
              <input
                type="checkbox"
                checked={day.slots.length > 0}
                onChange={() => toggleAvailability(dayIndex)}
                className="w-5 h-5 rounded border-gray-300 text-[#88AB61] focus:ring-[#88AB61]"
              />
              <span className="font-medium">{day.day}</span>
            </div>
            
            <div className="flex-1 ">
              {day.slots.length > 0 ? (
                day.slots.map((slot, slotIndex) => (
                  <div key={slotIndex} className="flex  items-center gap-2 mb-2">
                    <input
                      type="text"
                      value={slot.type}
                      onChange={(e) => updateSlot(dayIndex, slotIndex, 'type', e.target.value)}
                      className="inputs "
                    />
                    <input
                      type="time"
                      value={slot.start}
                      onChange={(e) => updateSlot(dayIndex, slotIndex, 'start', e.target.value)}
                      className="inputs"
                    />
                    <span>-</span>
                    <input
                      type="time"
                      value={slot.end}
                      onChange={(e) => updateSlot(dayIndex, slotIndex, 'end', e.target.value)}
                      className="inputs"
                    />
                    <span className="text-sm text-gray-500 w-[300px] ml-2">Place limit number</span>
                    <input
                      type="number"
                      value={slot.placeLimit}
                      onChange={(e) => updateSlot(dayIndex, slotIndex, 'placeLimit', parseInt(e.target.value))}
                      className="inputs w-20"
                    />
                    <button
                      onClick={() => removeSlot(dayIndex, slotIndex)}
                      className="text-redtheme hover:text-gray-600"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-gray-500 mt-3">Unavailable</div>
              )}
            </div>
            <div className='flex mt-[.3em] items-center'>
              <button
                onClick={() => addSlot(dayIndex)}
                className="text-[#88AB61] hover:text-[#6A8A43] ml-2"
              >
                <Plus size={16} />
              </button>
              <button className="p-2 hover:bg-softgreytheme transition duration-400 rounded">
                <Copy className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  )
}

export default Availability
