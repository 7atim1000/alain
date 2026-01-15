import React from 'react';
import { 
  FiGrid,        // Applications
  FiLayers,      // Phases
  FiUser,        // Profile
} from 'react-icons/fi';

export const adminMenuLinks = [
  { 
    name: "Applications", 
    path: "/admin/apps", 
    icon: React.createElement(FiGrid)
  },
  { 
    name: "Phases", 
    path: "/admin/phases",
    icon: React.createElement(FiLayers)
  },
  { 
    name: "Profile", 
    path: "/admin/profile", 
    icon: React.createElement(FiUser)
  },
];

// import React from 'react';

// import { 
//   FiGrid,        // Applications
//   FiLayers,      // Phases
//   FiUser,        // Profile
// } from 'react-icons/fi';

// export const adminMenuLinks = [
//   { 
//     name: "Applications", 
//     path: "/admin/apps", 
//     icon: <FiGrid />
//   },
//   { 
//     name: "Phases", 
//     path: "/admin/phases",
//     icon: <FiLayers />
//   },
//   { 
//     name: "Profile", 
//     path: "/admin/profile", 
//     icon: <FiUser />
//   },
// ];


// export const adminMenuLinks = [
//     { 
//         name: "Applicatins", 
//         path: "/admin/apps", 
//         icon: "https://nq5udmrdco.ufs.sh/f/Kfo4jX11Imre0Qs16mZdWKx1SgnYe50PkAVuQcaX2JvTZrBj",
      
      
//     },
//     { 
//         name: "Phases", 
//         path: "/admin/phases" ,
      
//         icon: "https://nq5udmrdco.ufs.sh/f/Kfo4jX11ImreyaK9UjPtFyGrfM8CsxjlL0U2Xn15RPAwYZo6"
    
    
//     },
//     { 
//         name: "Profile", 
//         path: "/admin/profile", 
//         icon: "https://nq5udmrdco.ufs.sh/f/Kfo4jX11ImrerETCyteMWJ5zE2rwmADpd3ZCBFcShlTXeMvN" ,
       
//     },

// ];
