import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import ScheduleComponentList from '../components/ScheduleComponent/ScheduleComponentList';
import { fetchSchedule } from '../utils/api/service';

const DAYS_TRANSLATION = {
  Monday: 'Senin',
  Tuesday: 'Selasa',
  Wednesday: 'Rabu',
  Thursday: 'Kamis',
  Friday: 'Jumat',
  Saturday: 'Sabtu',
  Sunday: 'Minggu',
};

const DAYS_ORDER = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

const ScheduleScreen = () => {
  const [scheduleData, setScheduleData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSchedule = async () => {
      try {
        const response = await fetchSchedule();
        if (response.ok) {
          const translatedData = response.data.days.map((day) => ({
            ...day,
            day: DAYS_TRANSLATION[day.day] || day.day,
          }));

          const sortedData = translatedData.sort(
            (a, b) => DAYS_ORDER.indexOf(a.day) - DAYS_ORDER.indexOf(b.day)
          );

          setScheduleData(sortedData);
        }
      } catch (error) {
        console.error('Error fetching schedule:', error);
      } finally {
        setLoading(false);
      }
    };
    loadSchedule();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#FFD700" />
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'rgb(12, 2, 27)', paddingTop: 15 }} scrollEventThrottle={80} showsVerticalScrollIndicator={false}>
      <View style={{ height: 50, justifyContent: 'center', paddingHorizontal: 15 }}>
        <Text style={{ color: '#fff', fontFamily: "NotoSans_SemiCondensed-Bold", fontSize: 20 }} numberOfLines={2}>
          Jadwal Tayang Mendatang
        </Text>
      </View>
      {scheduleData.map((day) => (
        <ScheduleComponentList key={day.day} headerTitle={day.day} animeList={day.animeList} />
      ))}
      <View style={{ height: 80 }} />
    </ScrollView>
  );
};

export default ScheduleScreen;
