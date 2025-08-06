import FastImage from '@d11/react-native-fast-image';
import React from 'react';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import IdIcon from '../../assets/Icons/IdIcon';
import EmailIcon from '../../assets/Icons/EmailIcon';

const HeaderProfilePicture = ({ dataUser, navigation }) => {
    const getInitials = (name) => {
        if (!name) return 'U';
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const displayName = dataUser?.name || dataUser?.displayName || dataUser?.username || 'User';
    const displayEmail = dataUser?.email || `Login via ${dataUser?.provider}`;

    return (
        <View style={styles.container}>
            {/* Header Section */}
            <View style={styles.headerSection}>
                {/* Profile Picture Container */}
                <View style={styles.profilePictureContainer}>
                    <View style={styles.profilePictureWrapper}>
                        {dataUser?.photo || dataUser?.photoURL ? (
                            <FastImage
                                style={styles.profileImage}
                                source={{
                                    uri: dataUser.photo || dataUser.photoURL,
                                    priority: FastImage.priority.normal
                                }}
                                resizeMode={FastImage.resizeMode.cover}
                            />
                        ) : (
                            <View style={styles.initialsContainer}>
                                <Text style={styles.initialsText}>
                                    {getInitials(displayName)}
                                </Text>
                            </View>
                        )}
                    </View>
                </View>

                {/* User Information */}
                <View style={styles.userInfoSection}>
                    <Text style={styles.userName} numberOfLines={1}>
                        {displayName}
                    </Text>

                    {/* Email */}
                    <View style={styles.infoRow}>
                        {dataUser?.provider !== 'google.com' ? (
                            <EmailIcon color='rgba(255,255,255,0.8)' size={18} />
                        ) : (
                            <Image source={require('../../assets/Icons/google.png')} style={{ height: 16, width: 16 }} />
                        )}
                        <Text style={styles.emailText} numberOfLines={1}>
                            {'  ' + displayEmail}
                        </Text>
                    </View>

                    {/* User ID */}
                    <View style={styles.infoRow}>
                        <IdIcon color='rgba(255,255,255,0.8)' size={18} />
                        <Text style={styles.uidText} numberOfLines={1}>
                            {' ' + dataUser?.uid}
                        </Text>
                    </View>
                </View>
            </View>

            {/* Edit Profile Button */}
            <Pressable
                android_ripple={{
                    color: 'rgba(255,255,255,0.1)',
                    borderless: false,
                }}
                style={({ pressed }) => [
                    styles.editButton,
                    { opacity: pressed ? 0.8 : 1 }
                ]}
                onPress={() => navigation.navigate('EditProfile')}
            >
                <Text style={styles.editButtonText}>Edit Profile</Text>
            </Pressable>

            {/* Stats Section
            <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>24</Text>
                    <Text style={styles.statLabel}>Friends</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>1.2k</Text>
                    <Text style={styles.statLabel}>Followers</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>486</Text>
                    <Text style={styles.statLabel}>Following</Text>
                </View>
            </View> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        marginHorizontal: 16,
    },

    headerSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },

    profilePictureContainer: {
        position: 'relative',
        marginRight: 16,
    },

    profilePictureWrapper: {
        width: 100,
        height: 100,
        borderRadius: 100,
        backgroundColor: '#3b82f6',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.2)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },

    profileImage: {
        width: '100%',
        height: '100%',
    },

    initialsContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
    },

    initialsText: {
        color: '#ffffff',
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'NotoSans_SemiCondensed-Bold',
    },

    verifiedBadge: {
        position: 'absolute',
        top: -4,
        right: -4,
        width: 24,
        height: 24,
        backgroundColor: '#10b981',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#1e293b',
    },

    verifiedIcon: {
        color: '#ffffff',
        fontSize: 12,
        fontWeight: 'bold',
    },

    userInfoSection: {
        flex: 1,
        paddingTop: 4,
    },

    userName: {
        color: '#ffffff',
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'Poppins-Bold',
        marginBottom: 8,
    },

    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },

    infoIcon: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 14,
        marginRight: 8,
        width: 16,
    },

    emailText: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 13,
        fontFamily: 'Poppins-Regular',
        flex: 1,
    },

    uidText: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 13,
        fontFamily: 'Poppins-Regular',
        flex: 1,
    },

    editButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.1)',
        paddingVertical: 10,
        paddingHorizontal: 24,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },

    editIcon: {
        color: '#ffffff',
        fontSize: 16,
        marginRight: 8,
    },

    editButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
        fontFamily: 'Poppins-Medium',
    },

    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.1)',
    },

    statItem: {
        alignItems: 'center',
        flex: 1,
    },

    statDivider: {
        width: 1,
        height: 32,
        backgroundColor: 'rgba(255,255,255,0.1)',
        marginHorizontal: 8,
    },

    statNumber: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'NotoSans_SemiCondensed-Bold',
        marginBottom: 2,
    },

    statLabel: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 12,
        fontFamily: 'NotoSans_SemiCondensed-Regular',
    },
});

export default HeaderProfilePicture;