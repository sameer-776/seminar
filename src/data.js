// src/data.js

import { Wind, Video, Mic, Users, Tv, Settings, Star } from 'lucide-react';

export const SEMINAR_HALLS = [
  "VIP Lounge",
  "Basement seminar hall",
  "Ground Floor seminar hall",
  "1st Floor seminar hall",
  "2nd Floor seminar hall",
  "3rd Floor seminar hall",
  "4th Floor seminar hall",
  "5th Floor seminar hall",
  "6th Floor seminar hall"
];

export const HALL_FACILITIES = {
  "VIP Lounge": [
    { name: "Luxury Sofa Seating", icon: Star, description: "Comfortable sofas for executive meetings, guest interviews, or podcasts." },
    { name: "Podcast & Recording Setup", icon: Mic, description: "Equipped with high-quality microphones and recording interfaces." },
    { name: "4K Display Screen", icon: Tv, description: "Ultra high-definition screen for presentations and media." },
    { name: "Climate Control AC", icon: Wind, description: "Fully air-conditioned with precise temperature control." },
    { name: "Seating Capacity: 10", icon: Users, description: "Intimate setting suitable for up to 10 guests." },
  ],
  "Basement seminar hall": [
    { name: "Seating Capacity: 300", icon: Users, description: "Accommodates up to 300 guests with comfortable seating." },
    { name: "Air Conditioning", icon: Wind, description: "Fully air-conditioned for comfort." },
    { name: "Projector System", icon: Video, description: "Standard HD projector for presentations." },
    { name: "Mic & Podium", icon: Mic, description: "Includes a podium and standard microphone setup." },
  ],
  "Ground Floor seminar hall": [
    { name: "Seating Capacity: 300", icon: Users, description: "Customizable and comfortable seating for up to 300 guests." },
    { name: "Air Conditioning", icon: Wind, description: "Centrally air-conditioned with climate control." },
    { name: "Large Screen Projector", icon: Video, description: "High-definition, large-format projection system." },
    { name: "Advanced Audio & Mic System", icon: Mic, description: "State-of-the-art sound system with a podium and wireless microphones." },
  ],
  "1st Floor seminar hall": [
    { name: "Seating Capacity: 300", icon: Users, description: "Accommodates up to 300 guests with comfortable seating." },
    { name: "Smart Interactive Board", icon: Tv, description: "Engage your audience with our new interactive smart board and projector." },
    { name: "Mic & Podium", icon: Mic, description: "Includes a podium and standard microphone setup." },
    { name: "Video Conferencing", icon: Video, description: "Equipped for seamless remote meetings." },
  ],
  "2nd Floor seminar hall": [
    { name: "Seating Capacity: 300", icon: Users, description: "Accommodates up to 300 guests with comfortable seating." },
    { name: "Air Conditioning", icon: Wind, description: "Fully air-conditioned." },
    { name: "Dual HD Projectors", icon: Video, description: "Dual projectors for enhanced visibility." },
    { name: "Mic & Podium", icon: Mic, description: "Includes a podium and standard microphone setup." },
  ],
  "3rd Floor seminar hall": [
    { name: "Seating Capacity: 300", icon: Users, description: "Accommodates up to 300 guests with comfortable seating." },
    { name: "Air Conditioning", icon: Wind, description: "Fully air-conditioned." },
    { name: "Projector System", icon: Video, description: "Standard HD projector for presentations." },
    { name: "Mic & Podium", icon: Mic, description: "Includes a podium and standard microphone setup." },
  ],
  "4th Floor seminar hall": [
    { name: "Seating Capacity: 300", icon: Users, description: "Accommodates up to 300 guests with comfortable seating." },
    { name: "Air Conditioning", icon: Wind, description: "Fully air-conditioned." },
    { name: "Projector System", icon: Video, description: "Standard HD projector for presentations." },
    { name: "Mic & Podium", icon: Mic, description: "Includes a podium and standard microphone setup." },
  ],
  "5th Floor seminar hall": [
    { name: "Seating Capacity: 300", icon: Users, description: "Accommodates up to 300 guests with comfortable seating." },
    { name: "Air Conditioning", icon: Wind, description: "Fully air-conditioned." },
    { name: "Smart Interactive Board", icon: Tv, description: "Interactive smart board with a projector for dynamic presentations." },
    { name: "Mic & Podium", icon: Mic, description: "Includes a podium and standard microphone setup." },
  ],
  "6th Floor seminar hall": [
    { name: "Luxury Seating: 300", icon: Users, description: "Comfortable, premium seating for up to 300 guests in an executive setting." },
    { name: "Air Conditioning", icon: Wind, description: "Climate-controlled environment." },
    { name: "4K Projector System", icon: Video, description: "Ultra high-definition 4K projector." },
    { name: "Premium Audio System", icon: Mic, description: "Surround sound with high-fidelity microphones and a podium." },
  ]
};

export const initialSeminars = [
  { id: 1, title: "AI in Modern Business", date: "2025-10-15", hall: "Ground Floor seminar hall", capacity: 150, description: "Exploring the impact of artificial intelligence on today's business landscape." },
  { id: 2, title: "Advanced Web Development", date: "2025-10-20", hall: "1st Floor seminar hall", capacity: 100, description: "A deep dive into the latest frameworks and techniques in web development." },
];

export const initialBookings = {
  "2025-10-20": [
    { id: 1, title: "Advanced Web Development", hall: "1st Floor seminar hall", startTime: "14:00", endTime: "16:00", status: "booked", requestedBy: "Dr. Alan Grant", department: "Computer Science", expectedAttendees: 80, additionalRequirements: "Need 2 wireless mics." },
  ],
  "2025-11-12": [
    { id: 2, title: "Quantum Computing Explained", hall: "Ground Floor seminar hall", startTime: "10:00", endTime: "13:00", status: "booked", requestedBy: "Dr. Ellie Sattler", department: "Physics", expectedAttendees: 120, additionalRequirements: "" },
  ],
  "2025-10-22": [
    { id: 3, title: "Intro to Machine Learning", hall: "Ground Floor seminar hall", startTime: "11:00", endTime: "12:00", status: "pending", requestedBy: "John Hammond", department: "Data Science", expectedAttendees: 50, additionalRequirements: "Podium required." }
  ]
};