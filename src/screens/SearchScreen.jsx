import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SearchIcon from '../assets/Icons/SearchIcon';
import HeaderProfileSearch from '../components/SearchComponent/HeaderProfileSearch';
import SearchHistoryList from '../components/SearchComponent/SearchHistoryList';
import GenreComponentList from '../components/SearchComponent/GenreComponentList';
import PaginationComponent from '../components/PaginationComponent';
import { searchAnime } from '../utils/api/service';
import ListAnimeSearch from '../components/SearchComponent/ListAnimeSearch';
import CloseIcon from '../assets/Icons/CloseIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SearchScreen = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigation = useNavigation();

    useEffect(() => {
        if (isSearching) handleSearch(currentPage);
    }, [currentPage]);

    const handleSearch = async (page = 1) => {
        if (searchQuery.trim() === '') return;
    
        setIsSearching(true);
        setLoading(true);
    
        try {
            // Simpan history pencarian di AsyncStorage
            const storedHistory = await AsyncStorage.getItem('searchHistory');
            let searchHistory = storedHistory ? JSON.parse(storedHistory) : [];
    
            // Cek apakah query sudah ada dalam history, jika ada hapus dulu
            searchHistory = searchHistory.filter(item => item !== searchQuery);
    
            // Tambahkan query baru di awal array
            searchHistory.unshift(searchQuery);
    
            // Batasi hanya 10 pencarian terbaru
            if (searchHistory.length > 10) {
                searchHistory.pop();
            }
    
            // Simpan kembali ke AsyncStorage
            await AsyncStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    
            // Lakukan pencarian anime
            const response = await searchAnime(searchQuery, page);
            if (response && response.data) {
                setSearchResults(response.data.animeList || []);
                setTotalPages(response.pagination.totalPages || 1);
            }
        } catch (error) {
            console.log('Error fetching anime:', error);
    
            if (error.response && error.response.status === 404) {
                setSearchResults([]); // Set hasil pencarian kosong
                setTotalPages(1);
            }
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <View style={{ flex: 1, backgroundColor: 'rgb(12, 2, 27)'}}>
            <HeaderProfileSearch />
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderRadius: 20,
                    marginTop: 15,
                    marginBottom: 20,
                    marginHorizontal: 10,
                }}>
                <SearchIcon color="#ccc" size={24} />
                <TextInput
                    style={{ flex: 1, color: '#fff', marginLeft: 10, fontSize: 14, paddingVertical: 5 }}
                    placeholder="Cari anime..."
                    placeholderTextColor="#aaa"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    onSubmitEditing={() => handleSearch(1)}
                />
                <Pressable
                  onPress={() => {
                    setSearchQuery('');
                    setIsSearching(false);
                  }}
                  style={{backgroundColor: 'rgba(255,255,255,0.2)', padding: 2.5, borderRadius: 30}}>
                  <CloseIcon size={18} color='#ccc' />
                </Pressable>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                {!isSearching && (
                    <>
                        <SearchHistoryList />
                        <GenreComponentList />
                        <TouchableOpacity
                            style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                paddingVertical: 10,
                                borderRadius: 15,
                                alignItems: 'center',
                                marginVertical: 20,
                            }}
                            onPress={() => navigation.navigate('ListAllAnime')}>
                            <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Lihat Semua Anime</Text>
                        </TouchableOpacity>
                    </>
                )}
                {isSearching && (
                    loading ? (
                        <ActivityIndicator size="large" color="#fff" style={{ marginTop: 20 }} />
                    ) : searchResults.length > 0 ? (
                      <ListAnimeSearch animeList={searchResults} />
                    ) : (
                        <Text style={{ color: '#aaa', textAlign: 'center', marginTop: 20 }}>Anime tidak ditemukan.</Text>
                    )
                )}
                {isSearching && totalPages > 1 && (
                    <PaginationComponent currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                )}
                <View style={{height: 90}}></View>
            </ScrollView>
        </View>
    );
};

export default SearchScreen;