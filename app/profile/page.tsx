"use client"
// import React, { useState } from 'react';
// import Image from 'next/image';
// import { FaFire, FaBolt, FaGem, FaEdit, FaPuzzlePiece, FaRocket } from 'react-icons/fa';

// interface UserStats {
//   streak: number;
//   xp: number;
//   gems: number;
// }

// const ProfilePage: React.FC = () => {
//   const [username, setUsername] = useState('pookiebadmosh');
//   const [displayName, setDisplayName] = useState('Mussu don');
//   const [joinDate, setJoinDate] = useState('March 2025');
//   const [stats, setStats] = useState<UserStats>({
//     streak: 1,
//     xp: 12,
//     gems: 5
//   });
//   const [isEditingAvatar, setIsEditingAvatar] = useState(false);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-700 via-purple-800 to-blue-900 text-white">
//       <div className="container mx-auto p-4">
//         {/* Navigation */}
//         <nav className="flex items-center justify-between mb-8">
//           <div className="text-3xl font-bold text-green-400 flex items-center">
//             <FaPuzzlePiece className="mr-2" />
           
//           </div>
//           <div className="flex space-x-4">
//             <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-full flex items-center">
//               <FaGem className="mr-2" /> {stats.gems}
//             </button>
//             <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full">Profile</button>
//           </div>
//         </nav>

//         {/* Main Content */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {/* Left Column - Profile Info */}
//           <div className="bg-gray-900 bg-opacity-50 rounded-2xl p-6 col-span-1">
//             <div className="flex flex-col items-center mb-6">
//               {/* Avatar */}
//               <div className="relative w-40 h-40 mb-4">
//                 <div className="w-full h-full rounded-full bg-blue-400 flex items-center justify-center overflow-hidden border-4 border-blue-300 relative">
//                   {isEditingAvatar ? (
//                     <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//                       <div className="text-center">
//                         <p>Upload Avatar</p>
//                         <button 
//                           className="mt-2 bg-green-500 hover:bg-green-600 px-3 py-1 rounded-full"
//                           onClick={() => setIsEditingAvatar(false)}
//                         >
//                           Save
//                         </button>
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="text-6xl text-white">
//                       {displayName.charAt(0)}
//                     </div>
//                   )}
//                 </div>
                
//                 <button 
//                   className="absolute bottom-0 right-0 bg-purple-500 hover:bg-purple-600 rounded-full p-2"
//                   onClick={() => setIsEditingAvatar(!isEditingAvatar)}
//                 >
//                   <FaEdit />
//                 </button>
//               </div>
              
//               {/* Name and Username */}
//               <h1 className="text-2xl font-bold">{displayName}</h1>
//               <p className="text-gray-300">@{username}</p>
//               <p className="text-gray-400 text-sm">Joined {joinDate}</p>
              
//               {/* Country */}
//               <div className="mt-4 flex items-center">
//                 <div className="w-8 h-6 mr-2 overflow-hidden rounded-sm">
//                   <div className="relative w-full h-full">
//                     <div className="absolute inset-0 bg-orange-500 h-1/3 top-0"></div>
//                     <div className="absolute inset-0 bg-white h-1/3 top-1/3"></div>
//                     <div className="absolute inset-0 bg-green-500 h-1/3 top-2/3"></div>
//                     <div className="absolute inset-0 flex items-center justify-center">
//                       <div className="w-4 h-4 rounded-full border border-blue-900">
//                         <div className="w-full h-full flex items-center justify-center">
//                           <div className="w-1 h-1 bg-blue-900 rounded-full"></div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <span>India</span>
//               </div>
//             </div>
            
//             {/* Navigation Menu */}
//             <div className="space-y-2">
//               <button className="w-full text-left py-2 px-4 rounded-lg bg-purple-600 hover:bg-purple-700 flex items-center">
//                 <FaRocket className="mr-3" /> Learn
//               </button>
//               <button className="w-full text-left py-2 px-4 rounded-lg hover:bg-gray-800 flex items-center">
//                 <FaBolt className="mr-3" /> Practice
//               </button>
//               <button className="w-full text-left py-2 px-4 rounded-lg hover:bg-gray-800 flex items-center">
//                 <FaGem className="mr-3" /> Shop
//               </button>
//             </div>
//           </div>

//           {/* Middle and Right Columns */}
//           <div className="col-span-1 md:col-span-2">
//             {/* Stats Cards */}
//             <div className="bg-gray-900 bg-opacity-50 rounded-2xl p-6 mb-6">
//               <h2 className="text-xl font-bold mb-4 flex items-center">
//                 <FaBolt className="mr-2 text-yellow-400" /> Statistics
//               </h2>
              
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 {/* Streak Card */}
//                 <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-xl p-4 flex items-center">
//                   <div className="bg-orange-600 rounded-full p-3 mr-3">
//                     <FaFire className="text-2xl text-white" />
//                   </div>
//                   <div>
//                     <div className="text-2xl font-bold">{stats.streak}</div>
//                     <div className="text-sm text-orange-100">Day streak</div>
//                   </div>
//                 </div>
                
//                 {/* XP Card */}
//                 <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl p-4 flex items-center">
//                   <div className="bg-yellow-600 rounded-full p-3 mr-3">
//                     <FaBolt className="text-2xl text-white" />
//                   </div>
//                   <div>
//                     <div className="text-2xl font-bold">{stats.xp}</div>
//                     <div className="text-sm text-yellow-100">Total XP</div>
//                   </div>
//                 </div>
                
//                 {/* Gems Card */}
//                 <div className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl p-4 flex items-center">
//                   <div className="bg-purple-600 rounded-full p-3 mr-3">
//                     <FaGem className="text-2xl text-white" />
//                   </div>
//                   <div>
//                     <div className="text-2xl font-bold">{stats.gems}</div>
//                     <div className="text-sm text-purple-100">Total Gems</div>
//                   </div>
//                 </div>
//               </div>
//             </div>
            
//             {/* Quirky Elements Section */}
//             <div className="bg-gray-900 bg-opacity-50 rounded-2xl p-6">
//               <h2 className="text-xl font-bold mb-4">Learning Journey</h2>
              
//               <div className="relative">
//                 <div className="h-24 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl overflow-hidden relative">
//                   {/* Random quirky elements */}
//                   <div className="absolute -top-2 -right-2 transform rotate-12">
//                     <span className="text-2xl">🚀</span>
//                   </div>
//                   <div className="absolute bottom-2 left-4">
//                     <span className="text-2xl">📚</span>
//                   </div>
//                   <div className="absolute top-3 left-1/3">
//                     <span className="text-2xl">🧩</span>
//                   </div>
//                   <div className="absolute bottom-2 right-10">
//                     <span className="text-xl">💭</span>
//                   </div>
                  
//                   <div className="absolute inset-0 flex items-center justify-center">
//                     <p className="text-white text-xl font-bold">Continue Your Adventure!</p>
//                   </div>
//                 </div>
                
//                 <div className="mt-6 grid grid-cols-3 gap-3">
//                   <button className="bg-indigo-600 hover:bg-indigo-700 rounded-lg py-3 px-4 flex flex-col items-center">
//                     <span className="text-2xl mb-1">🇪🇸</span>
//                     <span>Spanish</span>
//                   </button>
//                   <button className="bg-indigo-600 hover:bg-indigo-700 rounded-lg py-3 px-4 flex flex-col items-center">
//                     <span className="text-2xl mb-1">🇫🇷</span>
//                     <span>French</span>
//                   </button>
//                   <button className="bg-indigo-600 hover:bg-indigo-700 rounded-lg py-3 px-4 flex flex-col items-center">
//                     <span className="text-2xl mb-1">🇩🇪</span>
//                     <span>German</span>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;

// ProfilePage.tsx
import React, { useState, useRef, ChangeEvent } from 'react';
import { FaFire, FaBolt, FaGem, FaEdit, FaPuzzlePiece, FaRocket, FaCamera, FaUser } from 'react-icons/fa';

interface UserStats {
  streak: number;
  xp: number;
  gems: number;
}

const ProfilePage: React.FC = () => {
  const [username, setUsername] = useState('pookiebadmosh');
  const [displayName, setDisplayName] = useState('Mussu Don');
  const [joinDate, setJoinDate] = useState('March 2025');
  const [stats, setStats] = useState<UserStats>({
    streak: 1,
    xp: 12,
    gems: 5
  });
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);
  const [avatarImage, setAvatarImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setAvatarImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const saveAvatar = () => {
    setIsEditingAvatar(false);
    // Here you would typically also save the image to your backend
  };

  const cancelAvatarEdit = () => {
    setIsEditingAvatar(false);
    // Optionally reset the avatar if cancel is pressed
    // setAvatarImage(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-purple-800 to-blue-900 text-white">
      <div className="container mx-auto p-4">
        {/* Navigation */}
        <nav className="flex items-center justify-between mb-8">
          <div className="text-3xl font-bold text-green-400 flex items-center">
            <FaPuzzlePiece className="mr-2" />
            
          </div>
          <div className="flex space-x-4">
            <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-full flex items-center">
              <FaGem className="mr-2" /> {stats.gems}
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full">Profile</button>
          </div>
        </nav>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column - Profile Info */}
          <div className="bg-gray-900 bg-opacity-50 rounded-2xl p-6 col-span-1">
            <div className="flex flex-col items-center mb-6">
              {/* Avatar */}
              <div className="relative w-40 h-40 mb-4">
                <div className="w-full h-full rounded-full bg-blue-400 flex items-center justify-center overflow-hidden border-4 border-blue-300 relative">
                  {isEditingAvatar ? (
                    <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center">
                      <div className="text-center p-4">
                        <input 
                          type="file" 
                          ref={fileInputRef}
                          className="hidden"
                          accept="image/*"
                          onChange={handleFileChange}
                        />
                        <button 
                          className="bg-indigo-500 hover:bg-indigo-600 rounded-full p-3 mb-2"
                          onClick={triggerFileInput}
                        >
                          <FaCamera className="text-xl" />
                        </button>
                        <p className="text-sm mb-4">Upload Photo</p>
                        <div className="flex space-x-2">
                          <button 
                            className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded-full text-sm"
                            onClick={saveAvatar}
                          >
                            Save
                          </button>
                          <button 
                            className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-full text-sm"
                            onClick={cancelAvatarEdit}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      {avatarImage ? (
                        <img 
                          src={avatarImage} 
                          alt="User avatar" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full">
                          <div className="text-6xl text-white">
                            {displayName.charAt(0)}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
                
                <button 
                  className="absolute bottom-0 right-0 bg-purple-500 hover:bg-purple-600 rounded-full p-2"
                  onClick={() => setIsEditingAvatar(!isEditingAvatar)}
                >
                  <FaEdit />
                </button>
              </div>
              
              {/* Name and Username */}
              <h1 className="text-2xl font-bold">{displayName}</h1>
              <p className="text-gray-300">@{username}</p>
              <p className="text-gray-400 text-sm">Joined {joinDate}</p>
              
              {/* Country */}
              <div className="mt-4 flex items-center">
                <div className="w-8 h-6 mr-2 overflow-hidden rounded-sm">
                  <div className="relative w-full h-full">
                    <div className="absolute inset-0 bg-orange-500 h-1/3 top-0"></div>
                    <div className="absolute inset-0 bg-white h-1/3 top-1/3"></div>
                    <div className="absolute inset-0 bg-green-500 h-1/3 top-2/3"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-4 h-4 rounded-full border border-blue-900">
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-1 h-1 bg-blue-900 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <span>India</span>
              </div>
            </div>
            
            {/* Navigation Menu */}
            <div className="space-y-2">
              <button className="w-full text-left py-2 px-4 rounded-lg bg-purple-600 hover:bg-purple-700 flex items-center">
                <FaRocket className="mr-3" /> Learn
              </button>
              <button className="w-full text-left py-2 px-4 rounded-lg hover:bg-gray-800 flex items-center">
                <FaBolt className="mr-3" /> Practice
              </button>
              <button className="w-full text-left py-2 px-4 rounded-lg hover:bg-gray-800 flex items-center">
                <FaGem className="mr-3" /> Shop
              </button>
            </div>
          </div>

          {/* Middle and Right Columns */}
          <div className="col-span-1 md:col-span-2">
            {/* Stats Cards */}
            <div className="bg-gray-900 bg-opacity-50 rounded-2xl p-6 mb-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <FaBolt className="mr-2 text-yellow-400" /> Statistics
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Streak Card */}
                <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-xl p-4 flex items-center">
                  <div className="bg-orange-600 rounded-full p-3 mr-3">
                    <FaFire className="text-2xl text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{stats.streak}</div>
                    <div className="text-sm text-orange-100">Day streak</div>
                  </div>
                </div>
                
                {/* XP Card */}
                <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl p-4 flex items-center">
                  <div className="bg-yellow-600 rounded-full p-3 mr-3">
                    <FaBolt className="text-2xl text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{stats.xp}</div>
                    <div className="text-sm text-yellow-100">Total XP</div>
                  </div>
                </div>
                
                {/* Gems Card */}
                <div className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl p-4 flex items-center">
                  <div className="bg-purple-600 rounded-full p-3 mr-3">
                    <FaGem className="text-2xl text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{stats.gems}</div>
                    <div className="text-sm text-purple-100">Total Gems</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Quirky Elements Section */}
            <div className="bg-gray-900 bg-opacity-50 rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-4">Learning Journey</h2>
              
              <div className="relative">
                <div className="h-24 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl overflow-hidden relative">
                  {/* Random quirky elements */}
                  <div className="absolute -top-2 -right-2 transform rotate-12">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <div className="absolute bottom-2 left-4">
                    <span className="text-2xl">📚</span>
                  </div>
                  <div className="absolute top-3 left-1/3">
                    <span className="text-2xl">🧩</span>
                  </div>
                  <div className="absolute bottom-2 right-10">
                    <span className="text-xl">💭</span>
                  </div>
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-white text-xl font-bold">Continue Your Adventure!</p>
                  </div>
                </div>
                
                <div className="mt-6 grid grid-cols-3 gap-3">
                  <button className="bg-indigo-600 hover:bg-indigo-700 rounded-lg py-3 px-4 flex flex-col items-center">
                    <span className="text-2xl mb-1">🇪🇸</span>
                    <span>Spanish</span>
                  </button>
                  <button className="bg-indigo-600 hover:bg-indigo-700 rounded-lg py-3 px-4 flex flex-col items-center">
                    <span className="text-2xl mb-1">🇫🇷</span>
                    <span>French</span>
                  </button>
                  <button className="bg-indigo-600 hover:bg-indigo-700 rounded-lg py-3 px-4 flex flex-col items-center">
                    <span className="text-2xl mb-1">🇩🇪</span>
                    <span>German</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;