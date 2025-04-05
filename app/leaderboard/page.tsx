"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function Page() {
  return (
    <Card className="bg-gradient-to-br from-gray-900/95 to-gray-900/95 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">Unlock Leaderboards!</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="h-screen w-screen flex flex-1">
          <div className="w-12 h-12 bg-gray-800 rounded-md flex items-center justify-center">
            <Shield className="h-6 w-6 text-gray-600" />
          </div>

          <div className="flex-1">
            <p className="text-white mb-1">Complete 9 more lessons to start competing</p>
            <Progress value={10} className="h-1 bg-gray-800" />
          </div>
        </div>

        <div className="mt-4 opacity-80">
          <p className="text-sm text-gray-400">
            Compete with other tax learners and climb to the top of the leaderboards to earn exclusive badges and
            rewards!
          </p>
        </div>
        
      </CardContent>
    </Card>
  )
}




// // pages/index.tsx
// import React from 'react';
// import { Bar } from 'react-chartjs-2';
// import 'chart.js/auto';

// const Leaderboard = () => {
//   const players = [
//     { name: 'Player 1', score: 90 },
//     { name: 'Player 2', score: 80 },
//     { name: 'Player 3', score: 70 },
//     { name: 'Player 4', score: 60 },
//     { name: 'Player 5', score: 50 },
//     { name: 'Player 6', score: 40 },
//     { name: 'Player 7', score: 30 },
//     { name: 'Player 8', score: 20 },
//     { name: 'Player 9', score: 10 },
//     { name: 'Player 10', score: 5 },
//   ];

//   const userRank = {
//     name: 'You',
//     rank: players.length + 1,
//     score: 15,
//   };

//   const data = {
//     labels: [...players.map((player) => player.name), userRank.name],
//     datasets: [
//       {
//         label: 'Scores',
//         data: [...players.map((player) => player.score), userRank.score],
//         backgroundColor: [
//           ...Array(players.length).fill('rgba(75,192,192,0.6)'),
//           'rgba(255,99,132,0.6)',
//         ],
//       },
//     ],
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-purple-500 to-blue-500 flex flex-col items-center justify-center">
//       <h1 className="text-4xl font-bold text-white mb-8">Leaderboard</h1>
//       <div className="w-3/4 lg:w-1/2">
//         <Bar data={data} />
//       </div>
//       <div className="mt-8 text-white">
//         <p>Your Rank: {userRank.rank}</p>
//         <p>Your Score: {userRank.score}</p>
//       </div>
//     </div>
//   );
// };

// export default Leaderboard;
