// firebase-import.js
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

// 🔐 Vervang dit door jouw Firebase-projectconfiguratie
const firebaseConfig = {
  apiKey: "AIzaSyBbvJB-qg98LJJCEIPsuNiqxo05_y12cqw",
  authDomain: "realestatecare-abdullah.firebaseapp.com",
  projectId: "realestatecare-abdullah",
  storageBucket: "realestatecare-abdullah.firebasestorage.app",
  messagingSenderId: "521326084040",
  appId: "1:521326084040:web:2f13e9e84f98a70eef0afd"
};
// ✅ Firebase initialiseren
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 📦 Jouw JSON-data met adressen en inspecties
const data = {
    "addresses": [
        {
            "id": 1,
            "street": "Limburglaan 2",
            "city": "Eindhoven",
            "inspections": [
                {
                    "id": 102,
                    "date": "2025-06-04",
                    "completion": false,
                    "inspector": 2,
                    "damage": [],
                    "maintenance": [],
                    "installations": [],
                    "modifications": [],
                    "cleanlinessScore": 0,
                    "somethingBroken": false
                },
                {
                    "id": 103,
                    "date": "2025-06-04",
                    "completion": true,
                    "inspector": 3,
                    "damage": [
                        {
                        "location": "Bedroom",
                        "new": false,
                        "type": "accidental",
                        "date": "2025-06-04",
                        "acuteAction": false,
                        "description": "Water damage",
                        "photos": []
                        }
                    ],
                    "maintenance": [],
                    "installations": [],
                    "modifications": [],
                    "cleanlinessScore": 6,
                    "somethingBroken": true
                },
                {
                    "id": 104,
                    "date": "2025-06-04",
                    "completion": true,
                    "inspector": 4,
                    "damage": [],
                    "maintenance": [
                        {
                            "location": "Bathroom",
                            "type": "plumbing",
                            "acuteAction": true,
                            "costEstimate": "1000-2000",
                            "photos": []
                        }
                    ],
                    "installations": [],
                    "modifications": [],
                    "cleanlinessScore": 9,
                    "somethingBroken": false
                },
                {
                    "id": 105,
                    "date": "2025-06-04",
                    "completion": false,
                    "inspector": 5,
                    "damage": [],
                    "maintenance": [],
                    "installations": [
                        {
                            "location": "Attic",
                            "type": "insulation",
                            "reportedErrors": "",
                            "testProcedure": "",
                            "approved": false,
                            "comments": "",
                            "photos": []
                        }
                    ],
                    "modifications": [],
                    "cleanlinessScore": 0,
                    "somethingBroken": false
                },
                {
                    "id": 106,
                    "date": "2025-06-04",
                    "completion": true,
                    "inspector": 6,
                    "damage": [],
                    "maintenance": [],
                    "installations": [],
                    "modifications": [
                        {
                            "location": "Garage",
                            "type": "electrical",
                            "date": "2025-06-04",
                            "description": "Rewiring",
                            "photos": []
                        }
                    ],
                    "cleanlinessScore": 10,
                    "somethingBroken": false
                }
            ]
        },
        {
            "id": 3,
            "street": "Limburglaan 2",
            "city": "Eindhoven",
            "inspections": [
                {
                    "id": 112,
                    "date": "2025-06-04",
                    "completion": true,
                    "inspector": 2,
                    "damage": [
                      {
                        "location": "Driveway",
                        "new": true,
                        "type": "vehicular",
                        "date": "2025-06-04",
                        "acuteAction": true,
                        "description": "Oil leak",
                        "photos": []
                      }
                    ],
                    "maintenance": [],
                    "installations": [],
                    "modifications": []
                },
                {
                    "id": 113,
                    "date": "2025-06-04",
                    "completion": false,
                    "inspector": 3,
                    "damage": [],
                    "maintenance": [],
                    "installations": [],
                    "modifications": [],
                    "cleanlinessScore": 0,
                    "somethingBroken": false
                },
                {
                    "id": 114,
                    "date": "2025-06-04",
                    "completion": true,
                    "inspector": 4,
                    "damage": [
                        {
                            "location": "Porch",
                            "new": false,
                            "type": "accidental",
                            "date": "2025-06-04",
                            "acuteAction": false,
                            "description": "Broken step",
                            "photos": []
                        }
                    ],
                    "maintenance": [],
                    "installations": [],
                    "modifications": [],
                    "cleanlinessScore": 5,
                    "somethingBroken": true
                },
                {
                    "id": 115,
                    "date": "2025-06-04",
                    "completion": true,
                    "inspector": 5,
                    "damage": [],
                    "maintenance": [
                        {
                            "location": "Pool",
                            "type": "pool cleaning",
                            "acuteAction": true,
                            "costEstimate": "1000-3000",
                            "photos": []
                        }
                    ],
                    "installations": [],
                    "modifications": [],
                    "cleanlinessScore": 8,
                    "somethingBroken": false
                },
                {
                    "id": 116,
                    "date": "2025-06-04",
                    "completion": false,
                    "inspector": 6,
                    "damage": [],
                    "maintenance": [],
                    "installations": [
                        {
                            "location": "Shed",
                            "type": "electrical",
                            "reportedErrors": "",
                            "testProcedure": "",
                            "approved": false,
                            "comments": "",
                            "photos": []
                        }
                    ],
                    "modifications": [],
                    "cleanlinessScore": 0,
                    "somethingBroken": false
                }
            ]
        },
        {
            "id": 4,
            "street": "Limburglaan 3",
            "city": "Eindhoven",
            "inspections": [
                {
                    "id": 121,
                    "date": "2025-06-04",
                    "completion": true,
                    "inspector": 2,
                    "damage": [
                        {
                            "location": "Living Room",
                            "new": true,
                            "type": "fire",
                            "date": "2025-06-04",
                            "acuteAction": true,
                            "description": "Burn marks",
                            "photos": []
                        }
                    ],
                    "maintenance": [],
                    "installations": [],
                    "modifications": [],
                    "cleanlinessScore": 7,
                    "somethingBroken": true
                },
                {
                    "id": 122,
                    "date": "2025-06-04",
                    "completion": false,
                    "inspector": 2,
                    "damage": [],
                    "maintenance": [],
                    "installations": [],
                    "modifications": [],
                    "cleanlinessScore": 0,
                    "somethingBroken": false
                },
                {
                    "id": 123,
                    "date": "2025-06-04",
                    "completion": true,
                    "inspector": 3,
                    "damage": [
                        {
                            "location": "Bathroom",
                            "new": false,
                            "type": "water",
                            "date": "2025-06-04",
                            "acuteAction": false,
                            "description": "Mold",
                            "photos": []
                        }
                    ],
                    "maintenance": [],
                    "installations": [],
                    "modifications": [],
                    "cleanlinessScore": 5,
                    "somethingBroken": true
                },
                {
                    "id": 124,
                    "date": "2025-06-04",
                    "completion": true,
                    "inspector": 4,
                    "damage": [],
                    "maintenance": [
                        {
                            "location": "Bedroom",
                            "type": "carpet cleaning",
                            "acuteAction": true,
                            "costEstimate": "1000-3000",
                            "photos": []
                        }
                    ],
                    "installations": [],
                    "modifications": [],
                    "cleanlinessScore": 8,
                    "somethingBroken": false
                },
                {
                    "id": 125,
                    "date": "2025-06-04",
                    "completion": false,
                    "inspector": 5,
                    "damage": [],
                    "maintenance": [],
                    "installations": [
                        {
                            "location": "Attic",
                            "type": "insulation",
                            "reportedErrors": "",
                            "testProcedure": "",
                            "approved": false,
                            "comments": "",
                            "photos": []
                        }
                    ],
                    "modifications": [],
                    "cleanlinessScore": 0,
                    "somethingBroken": false
                }
            ]
        },
        {
            "id": 6,
            "street": "Limburglaan 4",
            "city": "Eindhoven",
            "inspections": [
                {
                    "id": 131,
                    "date": "2025-06-06",
                    "completion": true,
                    "inspector": 1,
                    "damage": [
                      {
                        "location": "Kitchen",
                        "new": true,
                        "type": "willful",
                        "date": "2025-06-06",
                        "acuteAction": true,
                        "description": "Broken window",
                        "photos": []
                      }
                    ],
                    "maintenance": [],
                    "installations": [],
                    "modifications": []
                  },
                  {
                    "id": 132,
                    "date": "2025-06-06",
                    "completion": false,
                    "inspector": 2,
                    "damage": [],
                    "maintenance": [],
                    "installations": [],
                    "modifications": [],
                    "cleanlinessScore": 0,
                    "somethingBroken": false
                  },
                  {
                    "id": 133,
                    "date": "2025-06-04",
                    "completion": true,
                    "inspector": 3,
                    "damage": [
                      {
                        "location": "Living Room",
                        "new": false,
                        "type": "vandalism",
                        "date": "2025-06-04",
                        "acuteAction": false,
                        "description": "Broken furniture",
                        "photos": []
                      }
                    ],
                    "maintenance": [],
                    "installations": [],
                    "modifications": [],
                    "cleanlinessScore": 5,
                    "somethingBroken": true
                  },
                  {
                    "id": 134,
                    "date": "2025-06-04",
                    "completion": true,
                    "inspector": 4,
                    "damage": [],
                    "maintenance": [
                      {
                        "location": "Bathroom",
                        "type": "pressure washing",
                        "acuteAction": true,
                        "costEstimate": "1000-3000",
                        "photos": []
                      }
                    ],
                    "installations": [],
                    "modifications": [],
                    "cleanlinessScore": 8,
                    "somethingBroken": false
                  },
                  {
                    "id": 135,
                    "date": "2025-06-04",
                    "completion": false,
                    "inspector": 5,
                    "damage": [],
                    "maintenance": [],
                    "installations": [
                      {
                        "location": "Basement",
                        "type": "cooling",
                        "reportedErrors": "Temperature not consistent",
                        "testProcedure": "https://example.com/cooling-test-procedure.pdf",
                        "approved": false,
                        "comments": "System needs maintenance",
                        "photos": []
                      }
                    ],
                    "modifications": [],
                    "cleanlinessScore": 0,
                    "somethingBroken": false
                  }
            ]
        },
        {
            "id": 8,
            "street": "Limburglaan 5",
            "city": "Eindhoven",
            "inspections": [
                {
                    "id": 141,
                    "date": "2025-06-04",
                    "completion": true,
                    "inspector": 1,
                    "damage": [
                      {
                        "location": "Kitchen",
                        "new": true,
                        "type": "willful",
                        "date": "2025-06-04",
                        "acuteAction": true,
                        "description": "Broken window",
                        "photos": []
                      }
                    ],
                    "maintenance": [],
                    "installations": [],
                    "modifications": []
                  },
                  {
                    "id": 142,
                    "date": "2025-06-04",
                    "completion": false,
                    "inspector": 2,
                    "damage": [],
                    "maintenance": [],
                    "installations": [],
                    "modifications": [],
                    "cleanlinessScore": 0,
                    "somethingBroken": false
                  },
                  {
                    "id": 143,
                    "date": "2025-06-04",
                    "completion": true,
                    "inspector": 3,
                    "damage": [
                      {
                        "location": "Living Room",
                        "new": false,
                        "type": "vandalism",
                        "date": "2025-06-04",
                        "acuteAction": false,
                        "description": "Broken furniture",
                        "photos": []
                      }
                    ],
                    "maintenance": [],
                    "installations": [],
                    "modifications": [],
                    "cleanlinessScore": 5,
                    "somethingBroken": true
                  },
                  {
                    "id": 144,
                    "date": "2025-06-04",
                    "completion": true,
                    "inspector": 4,
                    "damage": [],
                    "maintenance": [
                      {
                        "location": "Bathroom",
                        "type": "pressure washing",
                        "acuteAction": true,
                        "costEstimate": "1000-3000",
                        "photos": []
                      }
                    ],
                    "installations": [],
                    "modifications": [],
                    "cleanlinessScore": 8,
                    "somethingBroken": false
                  },
                  {
                    "id": 145,
                    "date": "2025-06-04",
                    "completion": false,
                    "inspector": 5,
                    "damage": [],
                    "maintenance": [],
                    "installations": [
                      {
                        "location": "Basement",
                        "type": "cooling",
                        "reportedErrors": "Temperature not consistent",
                        "testProcedure": "https://example.com/cooling-test-procedure.pdf",
                        "approved": false,
                        "comments": "System needs maintenance",
                        "photos": []
                      }
                    ],
                    "modifications": [],
                    "cleanlinessScore": 0,
                    "somethingBroken": false
                  }
            ]
        },
        {
            "id": 10,
            "street": "Limburglaan 6",
            "city": "Eindhoven",
            "inspections": [
                {
                    "id": 151,
                    "date": "2025-06-04",
                    "completion": true,
                    "inspector": 1,
                    "damage": [
                      {
                        "location": "Kitchen",
                        "new": true,
                        "type": "willful",
                        "date": "2025-06-04",
                        "acuteAction": true,
                        "description": "Broken window",
                        "photos": []
                      }
                    ],
                    "maintenance": [],
                    "installations": [],
                    "modifications": []
                  },
                  {
                    "id": 152,
                    "date": "2025-06-04",
                    "completion": false,
                    "inspector": 2,
                    "damage": [],
                    "maintenance": [],
                    "installations": [],
                    "modifications": [],
                    "cleanlinessScore": 0,
                    "somethingBroken": false
                  },
                  {
                    "id": 153,
                    "date": "2025-06-04",
                    "completion": true,
                    "inspector": 3,
                    "damage": [
                      {
                        "location": "Living Room",
                        "new": false,
                        "type": "vandalism",
                        "date": "2025-06-04",
                        "acuteAction": false,
                        "description": "Broken furniture",
                        "photos": []
                      }
                    ],
                    "maintenance": [],
                    "installations": [],
                    "modifications": [],
                    "cleanlinessScore": 5,
                    "somethingBroken": true
                  },
                  {
                    "id": 154,
                    "date": "2025-06-04",
                    "completion": true,
                    "inspector": 4,
                    "damage": [],
                    "maintenance": [
                      {
                        "location": "Bathroom",
                        "type": "pressure washing",
                        "acuteAction": true,
                        "costEstimate": "1000-3000",
                        "photos": []
                      }
                    ],
                    "installations": [],
                    "modifications": [],
                    "cleanlinessScore": 8,
                    "somethingBroken": false
                  },
                  {
                    "id": 154,
                    "date": "2025-06-04",
                    "completion": false,
                    "inspector": 5,
                    "damage": [],
                    "maintenance": [],
                    "installations": [
                      {
                        "location": "Basement",
                        "type": "cooling",
                        "reportedErrors": "Temperature not consistent",
                        "testProcedure": "https://example.com/cooling-test-procedure.pdf",
                        "approved": false,
                        "comments": "System needs maintenance",
                        "photos": []
                      }
                    ],
                    "modifications": [],
                    "cleanlinessScore": 0,
                    "somethingBroken": false
                  }
            ]
        }
    ]
  }


async function importToFirestore() {
  for (const address of data.addresses) {
    const addressRef = doc(db, 'addresses', String(address.id));

    // 💾 Adresdocument opslaan (alleen basisgegevens)
    await setDoc(addressRef, {
      street: address.street,
      city: address.city
    });

    for (const inspection of address.inspections) {
      const inspectionRef = doc(db, 'addresses', String(address.id), 'inspections', String(inspection.id));
      await setDoc(inspectionRef, inspection);
    }
  }
console.log('✅ Import voltooid. Controleer Firestore!');
  }
