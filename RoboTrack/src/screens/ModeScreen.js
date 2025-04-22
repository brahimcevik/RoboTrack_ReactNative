import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert
} from 'react-native';
import { useTheme } from '../components/ThemeContext';
import getApiUrl from '../components/MainPage/api';

const ModeScreen = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const backgroundColor = isDark ? '#121212' : '#ffffff';
  const textColor = isDark ? '#ffffff' : '#000000';

  const [selectedMode, setSelectedMode] = useState(null);
  const [selectedRobot, setSelectedRobot] = useState(null);
  const [robots, setRobots] = useState([]);
  
  // Mod 1 için form değerleri
  const [mod1Values, setMod1Values] = useState({
    siraUzunlugu: '',
    ikiSiraArasiMesafe: '',
    toplamSiraSayisi: '',
    donusDerecesi: '',
    ilkDonusAcisi: '',
  });

  // Mod 2 için form değerleri
  const [koordinatSayisi, setKoordinatSayisi] = useState('');
  const [coordinates, setCoordinates] = useState([]);

  useEffect(() => {
    fetchRobots();
  }, []);

  const fetchRobots = async () => {
    try {
      const response = await fetch(getApiUrl());
      if (!response.ok) throw new Error('API isteği başarısız oldu');
      const data = await response.json();
      setRobots(data);
    } catch (error) {
      console.error('Robot verisi çekilemedi:', error);
      Alert.alert('Hata', 'Robotlar yüklenirken bir hata oluştu');
    }
  };

  const handleMod1Submit = async () => {
    if (!selectedRobot) {
      Alert.alert('Uyarı', 'Lütfen bir robot seçin');
      return;
    }

    try {
      const response = await fetch(`${getApiUrl()}/update-mod/${selectedRobot.no}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...mod1Values,
          mod2: '',
          status: true,
          onlineStatus: true,
        }),
      });

      if (!response.ok) throw new Error('API isteği başarısız oldu');
      Alert.alert('Başarılı', 'Mod 1 ayarları güncellendi');
    } catch (error) {
      console.error('Mod 1 güncellenemedi:', error);
      Alert.alert('Hata', 'Ayarlar güncellenirken bir hata oluştu');
    }
  };

  const handleMod2Submit = async () => {
    if (!selectedRobot) {
      Alert.alert('Uyarı', 'Lütfen bir robot seçin');
      return;
    }

    if (coordinates.length === 0) {
      Alert.alert('Uyarı', 'Lütfen en az bir koordinat girin');
      return;
    }

    // Koordinatları API'nin beklediği formata çeviriyoruz
    const coordinateString = coordinates.map(coord => `${coord.lat},${coord.long}`).join(';');

    try {
      const response = await fetch(`${getApiUrl()}/update-mod2/${selectedRobot.no}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          siraUzunlugu: 0,
          ikiSiraArasiMesafe: 0,
          toplamSiraSayisi: 0,
          donusDerecesi: 0,
          ilkDonusAcisi: "string",
          mod2: coordinateString,
          status: true,
          onlineStatus: true
        }),
      });

      if (!response.ok) throw new Error('API isteği başarısız oldu');
      Alert.alert('Başarılı', 'Mod 2 ayarları güncellendi');
    } catch (error) {
      console.error('Mod 2 güncellenemedi:', error);
      Alert.alert('Hata', 'Ayarlar güncellenirken bir hata oluştu');
    }
  };

  const updateKoordinatSayisi = (value) => {
    const sayi = parseInt(value) || 0;
    setKoordinatSayisi(value);
    setCoordinates(Array(sayi).fill().map(() => ({ lat: '', long: '' })));
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor }]}>
      {/* Robot Seçimi */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: textColor }]}>Robot Seçimi</Text>
        <ScrollView horizontal style={styles.robotList}>
          {robots.map((robot) => (
            <TouchableOpacity
              key={robot.id}
              style={[
                styles.robotCard,
                selectedRobot?.id === robot.id && styles.selectedRobot,
                { backgroundColor: isDark ? '#333' : '#f0f0f0' }
              ]}
              onPress={() => setSelectedRobot(robot)}
            >
              <Text style={[styles.robotName, { color: textColor }]}>
                {robot.ugvName}
              </Text>
              <Text style={[styles.robotNo, { color: textColor }]}>
                No: {robot.no}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Mod Seçimi */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: textColor }]}>Mod Seçimi</Text>
        <View style={styles.modeButtons}>
          <TouchableOpacity
            style={[
              styles.modeButton,
              selectedMode === 'mod1' && styles.selectedMode,
              { backgroundColor: isDark ? '#333' : '#f0f0f0' }
            ]}
            onPress={() => setSelectedMode('mod1')}
          >
            <Text style={[styles.modeButtonText, { color: textColor }]}>
              Mod 1: Karık Açma Modu
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.modeButton,
              selectedMode === 'mod2' && styles.selectedMode,
              { backgroundColor: isDark ? '#333' : '#f0f0f0' }
            ]}
            onPress={() => setSelectedMode('mod2')}
          >
            <Text style={[styles.modeButtonText, { color: textColor }]}>
              Mod 2: Bitki Analiz Modu
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Mod 1 Formu */}
      {selectedMode === 'mod1' && (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>Mod 1 Ayarları</Text>
          <View style={styles.form}>
            <TextInput
              style={[styles.input, { color: textColor, borderColor: isDark ? '#666' : '#ccc' }]}
              placeholder="Sıra Uzunluğu"
              placeholderTextColor={isDark ? '#888' : '#666'}
              value={mod1Values.siraUzunlugu}
              onChangeText={(text) => setMod1Values({...mod1Values, siraUzunlugu: text})}
              keyboardType="numeric"
            />
            <TextInput
              style={[styles.input, { color: textColor, borderColor: isDark ? '#666' : '#ccc' }]}
              placeholder="İki Sıra Arası Mesafe"
              placeholderTextColor={isDark ? '#888' : '#666'}
              value={mod1Values.ikiSiraArasiMesafe}
              onChangeText={(text) => setMod1Values({...mod1Values, ikiSiraArasiMesafe: text})}
              keyboardType="numeric"
            />
            <TextInput
              style={[styles.input, { color: textColor, borderColor: isDark ? '#666' : '#ccc' }]}
              placeholder="Toplam Sıra Sayısı"
              placeholderTextColor={isDark ? '#888' : '#666'}
              value={mod1Values.toplamSiraSayisi}
              onChangeText={(text) => setMod1Values({...mod1Values, toplamSiraSayisi: text})}
              keyboardType="numeric"
            />
            <TextInput
              style={[styles.input, { color: textColor, borderColor: isDark ? '#666' : '#ccc' }]}
              placeholder="Dönüş Derecesi"
              placeholderTextColor={isDark ? '#888' : '#666'}
              value={mod1Values.donusDerecesi}
              onChangeText={(text) => setMod1Values({...mod1Values, donusDerecesi: text})}
              keyboardType="numeric"
            />
            <TextInput
              style={[styles.input, { color: textColor, borderColor: isDark ? '#666' : '#ccc' }]}
              placeholder="İlk Dönüş Açısı"
              placeholderTextColor={isDark ? '#888' : '#666'}
              value={mod1Values.ilkDonusAcisi}
              onChangeText={(text) => setMod1Values({...mod1Values, ilkDonusAcisi: text})}
            />
            <TouchableOpacity
              style={[styles.submitButton, { backgroundColor: '#4CAF50' }]}
              onPress={handleMod1Submit}
            >
              <Text style={styles.submitButtonText}>Gönder</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Mod 2 Formu */}
      {selectedMode === 'mod2' && (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>Mod 2 Ayarları</Text>
          <View style={styles.form}>
            <TextInput
              style={[styles.input, { color: textColor, borderColor: isDark ? '#666' : '#ccc' }]}
              placeholder="Koordinat Sayısı"
              placeholderTextColor={isDark ? '#888' : '#666'}
              value={koordinatSayisi}
              onChangeText={updateKoordinatSayisi}
              keyboardType="numeric"
            />
            {coordinates.map((coord, index) => (
              <View key={index} style={styles.coordinateContainer}>
                <Text style={[styles.coordinateTitle, { color: textColor }]}>
                  Koordinat {index + 1}
                </Text>
                <TextInput
                  style={[styles.input, { color: textColor, borderColor: isDark ? '#666' : '#ccc' }]}
                  placeholder="Enlem"
                  placeholderTextColor={isDark ? '#888' : '#666'}
                  value={coord.lat}
                  onChangeText={(text) => {
                    const newCoordinates = [...coordinates];
                    newCoordinates[index].lat = text;
                    setCoordinates(newCoordinates);
                  }}
                  keyboardType="numeric"
                />
                <TextInput
                  style={[styles.input, { color: textColor, borderColor: isDark ? '#666' : '#ccc' }]}
                  placeholder="Boylam"
                  placeholderTextColor={isDark ? '#888' : '#666'}
                  value={coord.long}
                  onChangeText={(text) => {
                    const newCoordinates = [...coordinates];
                    newCoordinates[index].long = text;
                    setCoordinates(newCoordinates);
                  }}
                  keyboardType="numeric"
                />
              </View>
            ))}
            <TouchableOpacity
              style={[styles.submitButton, { backgroundColor: '#4CAF50' }]}
              onPress={handleMod2Submit}
            >
              <Text style={styles.submitButtonText}>Gönder</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  robotList: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  robotCard: {
    padding: 10,
    marginRight: 10,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  selectedRobot: {
    borderColor: '#4CAF50',
    borderWidth: 2,
  },
  robotName: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  robotNo: {
    fontSize: 12,
  },
  modeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modeButton: {
    flex: 1,
    padding: 15,
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: 'center',
  },
  selectedMode: {
    borderColor: '#4CAF50',
    borderWidth: 2,
  },
  modeButtonText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  form: {
    marginTop: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  coordinateContainer: {
    marginBottom: 15,
  },
  coordinateTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
  },
  submitButton: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ModeScreen; 