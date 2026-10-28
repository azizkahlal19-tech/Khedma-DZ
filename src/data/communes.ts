export interface Commune {
  code: string;
  nameAr: string;
  nameFr: string;
  dairaAr: string;
  dairaFr: string;
  wilayaCode: string;
  postalCode: string;
  lat: number;
  lng: number;
}

// Representative detailed communes across Algerian Wilayas (focusing on major hubs and key regions)
export const ALGERIAN_COMMUNES: Commune[] = [
  // 16 - Alger
  { code: '1601', nameAr: 'الجزائر الوسطى', nameFr: 'Alger Centre', dairaAr: 'سيدي امحمد', dairaFr: 'Sidi M\'Hamed', wilayaCode: '16', postalCode: '16000', lat: 36.7729, lng: 3.0588 },
  { code: '1602', nameAr: 'سيدي امحمد', nameFr: 'Sidi M\'Hamed', dairaAr: 'سيدي امحمد', dairaFr: 'Sidi M\'Hamed', wilayaCode: '16', postalCode: '16001', lat: 36.7584, lng: 3.0558 },
  { code: '1603', nameAr: 'المدنية', nameFr: 'El Madania', dairaAr: 'سيدي امحمد', dairaFr: 'Sidi M\'Hamed', wilayaCode: '16', postalCode: '16015', lat: 36.7456, lng: 3.0612 },
  { code: '1604', nameAr: 'حيدرة', nameFr: 'Hydra', dairaAr: 'بئر مراد رايس', dairaFr: 'Bir Mourad Raïs', wilayaCode: '16', postalCode: '16035', lat: 36.7431, lng: 3.0425 },
  { code: '1605', nameAr: 'بن عكنون', nameFr: 'Ben Aknoun', dairaAr: 'بوزريعة', dairaFr: 'Bouzaréah', wilayaCode: '16', postalCode: '16028', lat: 36.7562, lng: 3.0189 },
  { code: '1606', nameAr: 'الشراقة', nameFr: 'Chéraga', dairaAr: 'الشراقة', dairaFr: 'Chéraga', wilayaCode: '16', postalCode: '16014', lat: 36.7667, lng: 2.9500 },
  { code: '1607', nameAr: 'دالي براهيم', nameFr: 'Dely Ibrahim', dairaAr: 'الشراقة', dairaFr: 'Chéraga', wilayaCode: '16', postalCode: '16020', lat: 36.7521, lng: 2.9856 },
  { code: '1608', nameAr: 'باب الزوار', nameFr: 'Bab Ezzouar', dairaAr: 'الدار البيضاء', dairaFr: 'Dar El Beïda', wilayaCode: '16', postalCode: '16042', lat: 36.7167, lng: 3.1833 },
  { code: '1609', nameAr: 'الدار البيضاء', nameFr: 'Dar El Beïda', dairaAr: 'الدار البيضاء', dairaFr: 'Dar El Beïda', wilayaCode: '16', postalCode: '16033', lat: 36.7133, lng: 3.2125 },
  { code: '1610', nameAr: 'الرويبة', nameFr: 'Rouïba', dairaAr: 'الرويبة', dairaFr: 'Rouïba', wilayaCode: '16', postalCode: '16012', lat: 36.7383, lng: 3.2842 },
  { code: '1611', nameAr: 'الرغاية', nameFr: 'Reghaïa', dairaAr: 'الرويبة', dairaFr: 'Rouïba', wilayaCode: '16', postalCode: '16011', lat: 36.7333, lng: 3.3417 },
  { code: '1612', nameAr: 'بئر توتة', nameFr: 'Birtouta', dairaAr: 'بئر توتة', dairaFr: 'Birtouta', wilayaCode: '16', postalCode: '16044', lat: 36.6436, lng: 3.0033 },
  { code: '1613', nameAr: 'زرالدة', nameFr: 'Zéralda', dairaAr: 'زرالدة', dairaFr: 'Zéralda', wilayaCode: '16', postalCode: '16063', lat: 36.7167, lng: 2.8500 },
  { code: '1614', nameAr: 'القبة', nameFr: 'Kouba', dairaAr: 'حسين داي', dairaFr: 'Hussein Dey', wilayaCode: '16', postalCode: '16050', lat: 36.7300, lng: 3.0800 },
  { code: '1615', nameAr: 'الحراش', nameFr: 'El Harrach', dairaAr: 'الحراش', dairaFr: 'El Harrach', wilayaCode: '16', postalCode: '16200', lat: 36.7200, lng: 3.1300 },

  // 31 - Oran
  { code: '3101', nameAr: 'وهران', nameFr: 'Oran', dairaAr: 'وهران', dairaFr: 'Oran', wilayaCode: '31', postalCode: '31000', lat: 35.6969, lng: -0.6331 },
  { code: '3102', nameAr: 'السانية', nameFr: 'Es Sénia', dairaAr: 'السانية', dairaFr: 'Es Sénia', wilayaCode: '31', postalCode: '31100', lat: 35.6500, lng: -0.6167 },
  { code: '3103', nameAr: 'بئر الجير', nameFr: 'Bir El Djir', dairaAr: 'بئر الجير', dairaFr: 'Bir El Djir', wilayaCode: '31', postalCode: '31130', lat: 35.7167, lng: -0.5667 },
  { code: '3104', nameAr: 'عين الترك', nameFr: 'Aïn El Turk', dairaAr: 'عين الترك', dairaFr: 'Aïn El Turk', wilayaCode: '31', postalCode: '31300', lat: 35.7444, lng: -0.7500 },
  { code: '3105', nameAr: 'أرزيو', nameFr: 'Arzew', dairaAr: 'أرزيو', dairaFr: 'Arzew', wilayaCode: '31', postalCode: '31200', lat: 35.8500, lng: -0.3167 },
  { code: '3106', nameAr: 'بطيوة', nameFr: 'Béthious', dairaAr: 'بطيوة', dairaFr: 'Béthioua', wilayaCode: '31', postalCode: '31230', lat: 35.8000, lng: -0.2667 },

  // 25 - Constantine
  { code: '2501', nameAr: 'قسنطينة', nameFr: 'Constantine', dairaAr: 'قسنطينة', dairaFr: 'Constantine', wilayaCode: '25', postalCode: '25000', lat: 36.3650, lng: 6.6147 },
  { code: '2502', nameAr: 'الخروب', nameFr: 'El Khroub', dairaAr: 'الخروب', dairaFr: 'El Khroub', wilayaCode: '25', postalCode: '25100', lat: 36.2625, lng: 6.6931 },
  { code: '2503', nameAr: 'علي منجلي', nameFr: 'Ali Mendjeli', dairaAr: 'الخروب', dairaFr: 'El Khroub', wilayaCode: '25', postalCode: '25016', lat: 36.2417, lng: 6.5708 },
  { code: '2504', nameAr: 'حامة بوزيان', nameFr: 'Hamma Bouziane', dairaAr: 'حامة بوزيان', dairaFr: 'Hamma Bouziane', wilayaCode: '25', postalCode: '25230', lat: 36.4069, lng: 6.5936 },

  // 19 - Sétif
  { code: '1901', nameAr: 'سطيف', nameFr: 'Sétif', dairaAr: 'سطيف', dairaFr: 'Sétif', wilayaCode: '19', postalCode: '19000', lat: 36.1905, lng: 5.4106 },
  { code: '1902', nameAr: 'العلمة', nameFr: 'El Eulma', dairaAr: 'العلمة', dairaFr: 'El Eulma', wilayaCode: '19', postalCode: '19600', lat: 36.1528, lng: 5.6908 },
  { code: '1903', nameAr: 'عين ولمان', nameFr: 'Aïn Oulmene', dairaAr: 'عين ولمان', dairaFr: 'Aïn Oulmene', wilayaCode: '19', postalCode: '19200', lat: 35.9189, lng: 5.2975 },
  { code: '1904', nameAr: 'عين الكبيرة', nameFr: 'Aïn El Kebira', dairaAr: 'عين الكبيرة', dairaFr: 'Aïn El Kebira', wilayaCode: '19', postalCode: '19400', lat: 36.3644, lng: 5.5031 },

  // 09 - Blida
  { code: '0901', nameAr: 'البليدة', nameFr: 'Blida', dairaAr: 'البليدة', dairaFr: 'Blida', wilayaCode: '09', postalCode: '09000', lat: 36.4700, lng: 2.8300 },
  { code: '0902', nameAr: 'بوفاريك', nameFr: 'Boufarik', dairaAr: 'بوفاريك', dairaFr: 'Boufarik', wilayaCode: '09', postalCode: '09400', lat: 36.5750, lng: 2.9125 },
  { code: '0903', nameAr: 'أولاد يعيش', nameFr: 'Ouled Yaïch', dairaAr: 'أولاد يعيش', dairaFr: 'Ouled Yaïch', wilayaCode: '09', postalCode: '09001', lat: 36.4917, lng: 2.8583 },
  { code: '0904', nameAr: 'العفرون', nameFr: 'El Affroun', dairaAr: 'العفرون', dairaFr: 'El Affroun', wilayaCode: '09', postalCode: '09300', lat: 36.4667, lng: 2.6333 },

  // 06 - Béjaïa
  { code: '0601', nameAr: 'بجاية', nameFr: 'Béjaïa', dairaAr: 'بجاية', dairaFr: 'Béjaïa', wilayaCode: '06', postalCode: '06000', lat: 36.7511, lng: 5.0642 },
  { code: '0602', nameAr: 'أقبو', nameFr: 'Akbou', dairaAr: 'أقبو', dairaFr: 'Akbou', wilayaCode: '06', postalCode: '06200', lat: 36.4578, lng: 4.5406 },
  { code: '0603', nameAr: 'أميزور', nameFr: 'Amizour', dairaAr: 'أميزور', dairaFr: 'Amizour', wilayaCode: '06', postalCode: '06300', lat: 36.6433, lng: 4.9083 },

  // 15 - Tizi Ouzou
  { code: '1501', nameAr: 'تيزي وزو', nameFr: 'Tizi Ouzou', dairaAr: 'تيزي وزو', dairaFr: 'Tizi Ouzou', wilayaCode: '15', postalCode: '15000', lat: 36.7119, lng: 4.0453 },
  { code: '1502', nameAr: 'ذراع بن خدة', nameFr: 'Draâ Ben Khedda', dairaAr: 'ذراع بن خدة', dairaFr: 'Draâ Ben Khedda', wilayaCode: '15', postalCode: '15100', lat: 36.7333, lng: 3.9667 },
  { code: '1503', nameAr: 'عزازقة', nameFr: 'Azazga', dairaAr: 'عزازقة', dairaFr: 'Azazga', wilayaCode: '15', postalCode: '15300', lat: 36.7447, lng: 4.3722 },

  // 02 - Chlef
  { code: '0201', nameAr: 'الشلف', nameFr: 'Chlef', dairaAr: 'الشلف', dairaFr: 'Chlef', wilayaCode: '02', postalCode: '02000', lat: 36.1647, lng: 1.3317 },
  { code: '0202', nameAr: 'واد الفضة', nameFr: 'Oued Fodda', dairaAr: 'واد الفضة', dairaFr: 'Oued Fodda', wilayaCode: '02', postalCode: '02100', lat: 36.1833, lng: 1.5333 },
  { code: '0203', nameAr: 'تنس', nameFr: 'Ténès', dairaAr: 'تنس', dairaFr: 'Ténès', wilayaCode: '02', postalCode: '02200', lat: 36.5111, lng: 1.3056 },

  // 23 - Annaba
  { code: '2301', nameAr: 'عنابة', nameFr: 'Annaba', dairaAr: 'عنابة', dairaFr: 'Annaba', wilayaCode: '23', postalCode: '23000', lat: 36.9000, lng: 7.7667 },
  { code: '2302', nameAr: 'البوني', nameFr: 'El Bouni', dairaAr: 'البوني', dairaFr: 'El Bouni', wilayaCode: '23', postalCode: '23005', lat: 36.8589, lng: 7.7289 },
  { code: '2303', nameAr: 'الحجار', nameFr: 'El Hadjar', dairaAr: 'الحجار', dairaFr: 'El Hadjar', wilayaCode: '23', postalCode: '23200', lat: 36.8000, lng: 7.7333 },

  // 30 - Ouargla
  { code: '3001', nameAr: 'ورقلة', nameFr: 'Ouargla', dairaAr: 'ورقلة', dairaFr: 'Ouargla', wilayaCode: '30', postalCode: '30000', lat: 31.9539, lng: 5.3203 },
  { code: '3002', nameAr: 'حاسي مسعود', nameFr: 'Hassi Messaoud', dairaAr: 'حاسي مسعود', dairaFr: 'Hassi Messaoud', wilayaCode: '30', postalCode: '30500', lat: 31.6803, lng: 6.0728 },

  // 07 - Biskra
  { code: '0701', nameAr: 'بسكرة', nameFr: 'Biskra', dairaAr: 'بسكرة', dairaFr: 'Biskra', wilayaCode: '07', postalCode: '07000', lat: 34.8500, lng: 5.7333 },
  { code: '0702', nameAr: 'طولقة', nameFr: 'Tolga', dairaAr: 'طولقة', dairaFr: 'Tolga', wilayaCode: '07', postalCode: '07100', lat: 34.7222, lng: 5.3806 },

  // 47 - Ghardaïa
  { code: '4701', nameAr: 'غرداية', nameFr: 'Ghardaïa', dairaAr: 'غرداية', dairaFr: 'Ghardaïa', wilayaCode: '47', postalCode: '47000', lat: 32.4900, lng: 3.6736 },
  { code: '4702', nameAr: 'بني يزقن', nameFr: 'Beni Isguen', dairaAr: 'بني يزقن', dairaFr: 'Beni Isguen', wilayaCode: '47', postalCode: '47001', lat: 32.4789, lng: 3.6822 },

  // 01 - Adrar
  { code: '0101', nameAr: 'أدرار', nameFr: 'Adrar', dairaAr: 'أدرار', dairaFr: 'Adrar', wilayaCode: '01', postalCode: '01000', lat: 27.8742, lng: -0.2939 },
  { code: '0102', nameAr: 'رقان', nameFr: 'Reggane', dairaAr: 'رقان', dairaFr: 'Reggane', wilayaCode: '01', postalCode: '01200', lat: 26.7192, lng: 0.1708 },

  // 58 - In Guezzam
  { code: '5801', nameAr: 'عين قزام', nameFr: 'In Guezzam', dairaAr: 'عين قزام', dairaFr: 'In Guezzam', wilayaCode: '58', postalCode: '58000', lat: 19.5694, lng: 5.7694 }
];

export function getCommunesByWilaya(wilayaCode: string): Commune[] {
  return ALGERIAN_COMMUNES.filter(c => c.wilayaCode === wilayaCode);
}
