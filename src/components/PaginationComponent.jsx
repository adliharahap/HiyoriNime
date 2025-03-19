import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import NextIcon from '../assets/Icons/NextIcon';
import PrevIcon from '../assets/Icons/Previcon';

const PaginationComponent = ({currentPage, totalPages, onPageChange}) => {
  const generatePageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(
          1,
          '...',
          currentPage - 1,
          currentPage,
          currentPage + 1,
          '...',
          totalPages,
        );
      }
    }
    return pages;
  };

  return (
    <View style={{height: 80, width: '100%', justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 0, backgroundColor: 'rgb(54, 51, 56)', borderTopLeftRadius: 25, borderTopRightRadius: 25}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{width: 70, justifyContent: 'center', alignItems: 'center'}}>
          {/* Tombol Previous */}
          <TouchableOpacity
            onPress={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            style={{
              height: 40,
              width: 40,
              borderRadius: 30,
              backgroundColor: currentPage === 1 ? '#ddd' : '#ce009c',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <PrevIcon
              size={20}
              color={currentPage === totalPages ? '#aaa' : '#fff'}
            />
          </TouchableOpacity>
        </View>

        <View style={{flex:1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          {/* Nomor Halaman */}
          {generatePageNumbers().map((page, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => typeof page === 'number' && onPageChange(page)}
              disabled={page === '...'}
              style={{
                height: 34,
                width: 34,
                marginHorizontal: 3,
                borderRadius: 5,
                borderWidth: 2,
                borderColor: page === currentPage ? '#ce009c' : '#fff',
                justifyContent: 'center',
                alignItems: 'center',
                
              }}>
              <Text
                style={{
                  color: page === currentPage ? '#ce009c' : '#fff',
                  fontFamily: 'NotoSans_SemiCondensed-Bold',
                  fontSize: 15,
                }}>
                {page}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{width: 70, justifyContent: 'center', alignItems: 'center'}}>
          {/* Tombol Next */}
          <TouchableOpacity
            onPress={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            style={{
              height: 40,
              width: 40,
              borderRadius: 30,
              backgroundColor: currentPage === totalPages ? '#ddd' : '#ce009c',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <NextIcon
              size={20}
              color={currentPage === totalPages ? '#aaa' : '#fff'}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PaginationComponent;
