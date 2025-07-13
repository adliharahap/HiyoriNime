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
    <View
      style={{
        height: 60,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'rgb(54, 51, 56)',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        {currentPage !== 1 && (
          <View
            style={{width: 70, justifyContent: 'center', alignItems: 'center'}}>
            {/* Tombol Previous */}
            <TouchableOpacity
              onPress={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              style={{
                height: 40,
                width: 40,
                borderRadius: 30,
                justifyContent: 'center',
                alignItems: 'center',
                opacity: currentPage === 1 ? 0.3 : 1,
              }}>
              <PrevIcon
                size={20}
                color={currentPage === totalPages ? '#aaa' : '#fff'}
              />
            </TouchableOpacity>
          </View>
        )}

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
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
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: page === currentPage ? '#f33421' : '#fff',
                  fontFamily: 'Poppins-Regular',
                  fontSize: 16,
                }}>
                {page}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

          {currentPage !== totalPages && (
        <View
          style={{width: 70, justifyContent: 'center', alignItems: 'center'}}>
          {/* Tombol Next */}
          <TouchableOpacity
            onPress={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            style={{
              height: 40,
              width: 40,
              borderRadius: 30,
              justifyContent: 'center',
              alignItems: 'center',
              opacity: currentPage === totalPages ? 0.3 : 1,
            }}>
            <NextIcon
              size={20}
              color={currentPage === totalPages ? '#aaa' : '#fff'}
            />
          </TouchableOpacity>
        </View>
          )}
      </View>
    </View>
  );
};

export default PaginationComponent;
