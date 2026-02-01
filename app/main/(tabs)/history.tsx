import { useRouter } from 'expo-router';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS } from '../../../constants/theme';

interface Guru {
  id: string;
  name: string;
  timeline: string;
  photo: string;
}

export default function HistoryScreen() {
  const router = useRouter();

  const gurus: Guru[] = [
    { id: '1', name: 'Sri Vishnu Teertharu', timeline: '1200-1250', photo: 'https://via.placeholder.com/100/FF9933/FFFFFF?text=VT' },
    { id: '2', name: 'Sri Sureendra Teertharu', timeline: '1250-1310', photo: 'https://via.placeholder.com/100/FF9933/FFFFFF?text=ST' },
    { id: '3', name: 'Sri Suvidya Teertharu', timeline: '1310-1365', photo: 'https://via.placeholder.com/100/FF9933/FFFFFF?text=SVT' },
    { id: '4', name: 'Sri Vidyanidhi Teertharu', timeline: '1365-1424', photo: 'https://via.placeholder.com/100/FF9933/FFFFFF?text=VNT' },
    { id: '5', name: 'Sri Rajendra Teertharu', timeline: '1424-1480', photo: 'https://via.placeholder.com/100/FF9933/FFFFFF?text=RT' },
    { id: '6', name: 'Sri Vibudhendra Teertharu', timeline: '1480-1535', photo: 'https://via.placeholder.com/100/FF9933/FFFFFF?text=VBT' },
    { id: '7', name: 'Sri Vadiraja Teertharu', timeline: '1480-1600', photo: 'https://via.placeholder.com/100/FF9933/FFFFFF?text=VDT' },
    { id: '8', name: 'Sri Vadhirajapada Teertharu', timeline: '1600-1650', photo: 'https://via.placeholder.com/100/FF9933/FFFFFF?text=VPT' },
    { id: '9', name: 'Sri Vigneshwara Teertharu', timeline: '1650-1710', photo: 'https://via.placeholder.com/100/FF9933/FFFFFF?text=VGT' },
    { id: '10', name: 'Sri Vishwa Teertharu', timeline: '1710-1771', photo: 'https://via.placeholder.com/100/FF9933/FFFFFF?text=VST' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>History & Parampara</Text>
        <Text style={styles.subtitle}>Sri Sode Vadiraja Matha</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>History of Sri Matha</Text>
        <View style={styles.historyCard}>
          <Text style={styles.historyText}>
            Sode Sri Vadiraja Matha is one of the eight Mutts (Mathas) of Udupi established by
            Sri Madhwacharya. The matha is currently headed by Sri Sri Vishwavallabha Theertha Swamiji.
            {'\n\n'}
            The matha has a rich history spanning over 700 years and has produced many great saints
            and scholars. The most revered among them is Sri Vadiraja Swamiji, whose teachings and
            compositions continue to inspire millions of devotees.
            {'\n\n'}
            The matha actively participates in the Paryaya system, where it takes turns managing
            the Krishna Temple in Udupi for a period of two years.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Guru Parampara</Text>
        <Text style={styles.subtitle2}>From Sri Vishnu Teertharu to present</Text>

        <View style={styles.guruGrid}>
          {gurus.map((guru, index) => (
            <TouchableOpacity
              key={guru.id}
              style={styles.guruCard}
              onPress={() => {
                // Navigate to guru detail screen
              }}
            >
              <View style={styles.guruImageContainer}>
                <Image
                  source={{ uri: guru.photo }}
                  style={styles.guruImage}
                />
                <View style={styles.guruNumber}>
                  <Text style={styles.guruNumberText}>{index + 1}</Text>
                </View>
              </View>
              <Text style={styles.guruName}>{guru.name}</Text>
              <Text style={styles.guruTimeline}>{guru.timeline}</Text>
              <View style={styles.viewButton}>
                <Text style={styles.viewButtonText}>View Details →</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About Sri Madhwacharya</Text>
        <View style={styles.madhwaCard}>
          <View style={styles.madhwaImagePlaceholder}>
            <Text style={styles.photoPlaceholder}>Sri Madhwacharya</Text>
          </View>
          <Text style={styles.madhwaText}>
            Sri Madhwacharya (1238-1317 CE) was a Hindu philosopher and the chief proponent of the
            Dvaita (dualism) school of Vedanta. He founded the eight Mathas in Udupi and established
            the Paryaya system for the management of the Krishna Temple.
            {'\n\n'}
            His philosophical works and commentaries on the Vedas and Upanishads form the foundation
            of Dvaita Vedanta philosophy.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About Sri Bhootarajaru</Text>
        <View style={styles.bhootarajaCard}>
          <View style={styles.bhootarajaImagePlaceholder}>
            <Text style={styles.photoPlaceholder}>Sri Bhootarajaru</Text>
          </View>
          <Text style={styles.bhootarajaText}>
            Sri Sripadaraja, popularly known as Sri Bhootarajaru or Lakshminarayana Tirtha, was a
            renowned Haridasa and the Guru of Sri Vyasaraja. He lived during the 15th century and composed
            many devotional songs in Kannada.
            {'\n\n'}
            His contributions to Carnatic music and Dvaita philosophy are immense. He is credited with
            composing the famous devotional composition "Venkatachala Nilayam."
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    backgroundColor: COLORS.primary,
    padding: 20,
    paddingTop: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.white,
  },
  subtitle2: {
    fontSize: 13,
    color: COLORS.gray,
    marginBottom: 15,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 12,
  },
  historyCard: {
    backgroundColor: '#FFF5E6',
    padding: 15,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.secondary,
  },
  historyText: {
    fontSize: 14,
    color: COLORS.black,
    lineHeight: 22,
  },
  guruGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  guruCard: {
    width: '48%',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  guruImageContainer: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: 10,
  },
  guruImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  guruNumber: {
    position: 'absolute',
    bottom: -5,
    right: '30%',
    backgroundColor: COLORS.secondary,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  guruNumberText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  guruName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.black,
    textAlign: 'center',
    marginBottom: 4,
  },
  guruTimeline: {
    fontSize: 11,
    color: COLORS.gray,
    textAlign: 'center',
    marginBottom: 8,
  },
  viewButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  viewButtonText: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: '600',
  },
  madhwaCard: {
    backgroundColor: '#F8F9FA',
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  madhwaImagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 15,
  },
  photoPlaceholder: {
    color: COLORS.white,
    fontSize: 11,
    textAlign: 'center',
    fontWeight: '600',
  },
  madhwaText: {
    fontSize: 14,
    color: COLORS.black,
    lineHeight: 22,
  },
  bhootarajaCard: {
    backgroundColor: '#F8F9FA',
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  bhootarajaImagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 15,
  },
  bhootarajaText: {
    fontSize: 14,
    color: COLORS.black,
    lineHeight: 22,
  },
});
