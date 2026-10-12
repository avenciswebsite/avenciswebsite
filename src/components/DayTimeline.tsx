import React from 'react';
import { Clock } from 'lucide-react';
import type { TimeOfDay } from '../types';

interface DayTimelineProps {
  currentTime: TimeOfDay;
  onSelectTime: (time: TimeOfDay) => void;
}

export const DayTimeline: React.FC<DayTimelineProps> = ({ currentTime, onSelectTime }) => {
  const timeSlots: Array<{ key: TimeOfDay; label: string; stage: string }> = [
    { key: '9:30am', label: '9:30 AM', stage: 'Morning' },
    { key: '12:30pm', label: '12:30 PM', stage: 'Mid-Day' },
    { key: '3:00pm', label: '3:00 PM', stage: 'Afternoon' },
    { key: '5:00pm', label: '5:00 PM', stage: 'Workday End' },
    { key: '7:00pm', label: '7:00 PM', stage: 'Evening' },
  ];

  return (
    <div className="timeline-stepper" role="tablist" aria-label="Founder Day Timeline Selector">
      {timeSlots.map((slot) => {
        const isActive = currentTime === slot.key;
        return (
          <button
            key={slot.key}
            role="tab"
            aria-selected={isActive}
            className={`time-step-btn ${isActive ? 'active' : ''}`}
            onClick={() => onSelectTime(slot.key)}
          >
            <Clock size={16} />
            <span>{slot.label}</span>
          </button>
        );
      })}
    </div>
  );
};
