import {React, useState} from 'react';
import badge1 from '../../data/achievement1.png';
import badge2 from '../../data/achievement2.png';
import badge3 from '../../data/achievement3.png';
import badge4 from '../../data/achievement4.png';
import badge5 from '../../data/achievement5.png';
import badge6 from '../../data/achievement6.png';
import badge7 from '../../data/achievement7.png';
import badge8 from '../../data/achievement8.png';
import badge9 from '../../data/achievement9.png';

const AchievementList = ({ searchQuery }) => {
  const [expandedAchievement, setExpandedAchievement] = useState(null);

  const achievementsData = [
    { id: 1, name: 'Quiz Fever', date: '11 February 2024', description: 'Berhasil meraih Top 3 sebanyak 10 kali', image: badge1, status: 'Complete' },
    { id: 2, name: 'Helpful Helper', date: '14 February 2024', description: 'Berhasil mendapatkan total like sebanyak 100', image: badge2, status: 'Complete' },
    { id: 3, name: 'Nama Achievement', date: 'Tanggal diraih', description: 'Detail achievement detail achievement detail achievement detail achievement', image: badge3, status: 'Incomplete' },
    { id: 4, name: 'Nama Achievement', date: 'Tanggal diraih', description: 'Detail achievement detail achievement detail achievement detail achievement', image: badge4, status: 'Incomplete' },
    { id: 5, name: 'Nama Achievement', date: 'Tanggal diraih', description: 'Detail achievement detail achievement detail achievement detail achievement', image: badge5, status: 'Incomplete' },
    { id: 6, name: 'Nama Achievement', date: 'Tanggal diraih', description: 'Detail achievement detail achievement detail achievement detail achievement', image: badge6, status: 'Incomplete' },
    { id: 7, name: 'Nama Achievement', date: 'Tanggal diraih', description: 'Detail achievement detail achievement detail achievement detail achievement', image: badge7, status: 'Incomplete' },
    { id: 8, name: 'Nama Achievement', date: 'Tanggal diraih', description: 'Detail achievement detail achievement detail achievement detail achievement', image: badge8, status: 'Incomplete' },
    // { id: 9, name: 'Nama Achievement', date: 'Tanggal diraih', description: 'Detail achievement detail achievement detail achievement detail achievement', image: badge9, status: 'Incomplete' },
    // other achievements...
  ];

  const countAchievements = achievementsData.filter((achievement) =>
    achievement.status === 'Complete'
  );

  const filteredAchievements = achievementsData.filter((achievement) =>
    achievement.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleDescription = (id) => {
    setExpandedAchievement(expandedAchievement === id ? null : id);
  };

  return (
    <div>
      <p className='font-bold uppercase mb-6'>{`${countAchievements.length}/${achievementsData.length} Unlocked Achievements`}</p>
      <div className='grid grid-cols-4 gap-x-6 gap-y-8 text-center'>
        {filteredAchievements.map(achievement => (
          <div key={achievement.id} className={`bg-white border-1 border-slate-200 shadow-sm rounded-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ${achievement.status === 'Incomplete' ? 'bg-slate-200 border-slate-100 grayscale' : ''}`}
            onClick={() => toggleDescription(achievement.id)}
          >
            <div className='h-20 m-4 flex justify-center rounded-2xl'>
              <img className='' src={achievement.image} alt={`badge-${achievement.id}`} />
            </div>
            <div className='mx-4 my-4'>
              <p className='font-bold text-lg'>{achievement.name}</p>
              <p className='font-semibold text-slate-400'>{achievement.status}</p>
              <p className='text-xs hidden'>{achievement.date}</p>
              <p className={`font-semibold text-sm my-4 ${expandedAchievement === achievement.id ? '' : 'hidden'}`}>{achievement.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementList;
