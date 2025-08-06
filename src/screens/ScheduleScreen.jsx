import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from 'react-native';
import { fetchSchedule } from '../utils/api/service';
import LinearGradient from 'react-native-linear-gradient';
import ScheduleComponentList from '../components/ScheduleComponent/ScheduleComponentList';
import { useSelector } from 'react-redux';
import LoadingScreen from './LoadingScreen';

const { width } = Dimensions.get('window');

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

const getFormattedDateForDay = (dayName) => {
  const hariKeAngka = {
    'Minggu': 0,
    'Senin': 1,
    'Selasa': 2,
    'Rabu': 3,
    'Kamis': 4,
    'Jumat': 5,
    'Sabtu': 6,
  };

  const today = new Date();
  const currentDay = today.getDay();
  const targetDay = hariKeAngka[dayName];

  const diff = (targetDay - currentDay + 7) % 7; // biar ngga minus
  const targetDate = new Date(today);
  targetDate.setDate(today.getDate() + diff);

  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const formatted = targetDate.toLocaleDateString('id-ID', options);

  return `${dayName}, ${formatted}`;
};


const UploadedTab = ({ data }) => (
  <LinearGradient colors={['#000', 'rgba(81, 8, 10, 1)']} style={{ width, flex: 1 }}>
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ padding: 15 }}>
        <Text style={styles.header}>Anime Baru Diunggah</Text>
      </View>
      <ScheduleComponentList animeList={data} />
      <View style={{ height: 80 }} />
    </ScrollView>
  </LinearGradient>
);

const ScheduleTab = ({ data }) => (
  <LinearGradient colors={['#000', 'rgba(81, 8, 10, 1)']} style={{ width, flex: 1 }}>
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ padding: 15 }}>
        <Text style={styles.header}>Jadwal Tayang Mendatang</Text>
      </View>
        {data.map(day => (
          <ScheduleComponentList
            key={day.day}
            headerTitle={getFormattedDateForDay(day.day)}
            animeList={day.animeList}
          />
        ))}
      <View style={{ height: 80 }} />
    </ScrollView>
  </LinearGradient>
);

const ScheduleScreen = () => {
  const [uploadedAnime, setUploadedAnime] = useState([]);
  const [scheduleAnime, setScheduleAnime] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const scrollRef = useRef(null);
  const source = useSelector((state) => state.animeSource.source);

useEffect(() => {
  const loadSchedule = async () => {
    try {
      const response = await fetchSchedule(source);
      if (response.ok) {
        const rawDays = response.data.days;

        const uploaded = [];
        const schedule = [];

        rawDays.forEach(day => {
          const dayName = DAYS_TRANSLATION[day.day] || day.day;
          const withDayName = day.animeList.map(anime => ({ ...anime, day: dayName }));

          const uploadedList = withDayName.filter(a => a.estimation === 'Update');
          const scheduleList = withDayName.filter(a => a.estimation !== 'Update');

          uploaded.push(...uploadedList);
          schedule.push({ day: dayName, animeList: scheduleList }); // TETAP masukin walau kosong
        });

        // ✨ Algoritma sortir berdasarkan hari ini ✨
        const today = new Date().getDay(); // 0 (Minggu) - 6 (Sabtu)
        const translatedToday = DAYS_TRANSLATION[
          ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][today]
        ];

        const rotatedDays = [...DAYS_ORDER];
        const startIndex = rotatedDays.indexOf(translatedToday);
        const orderedDays = [...rotatedDays.slice(startIndex), ...rotatedDays.slice(0, startIndex)];

        const sortedSchedule = orderedDays.map(dayName => {
          const found = schedule.find(s => s.day === dayName);
          return found || { day: dayName, animeList: [] };
        });

        setUploadedAnime(uploaded);
        setScheduleAnime(sortedSchedule);
      }
    } catch (error) {
      console.error('Error fetching schedule:', error);
    } finally {
      setLoading(false);
    }
  };
  loadSchedule();
  }, []);


  const handleTabPress = index => {
    setActiveTab(index);
    scrollRef.current?.scrollTo({ x: index * width, animated: true });
  };

  const handleSwipe = e => {
    const pageIndex = Math.round(e.nativeEvent.contentOffset.x / width);
    setActiveTab(pageIndex);
  };

  if (loading) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {/* Tab Bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tabItem, activeTab === 0 ? styles.activeTab1 : styles.inactiveTab1]}
          onPress={() => handleTabPress(0)}
        >
          <Text style={[styles.tabText, activeTab === 0 && styles.activeTabText]}>Baru Diunggah</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabItem, activeTab === 1 ? styles.activeTab2 : styles.inactiveTab2]}
          onPress={() => handleTabPress(1)}
        >
          <Text style={[styles.tabText, activeTab === 1 && styles.activeTabText]}>Jadwal Tayang</Text>
        </TouchableOpacity>
      </View>

      {/* Scrollable Pages */}
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleSwipe}
        scrollEventThrottle={16}
      >
        <UploadedTab data={uploadedAnime} />
        <ScheduleTab data={scheduleAnime} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#000',
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 10,
  },
  tabItem: {
    paddingVertical: 8,
    paddingHorizontal: 18,
  },
  activeTab1: {
    backgroundColor: '#FFD700',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  inactiveTab1: {
    backgroundColor: 'rgba(78, 78, 78, 1)',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  activeTab2: {
    backgroundColor: '#FFD700',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  inactiveTab2: {
    backgroundColor: 'rgba(78, 78, 78, 1)',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  tabText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  activeTabText: {
    color: '#000',
  },
  header: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'NotoSans_SemiCondensed-Bold',
  },
});

export default ScheduleScreen;
