import { LearningPath } from "@/components/learning-path"
//import { PromotionCard } from "@/components/promotion-card"
import { DailyQuests } from "@/components/daily-quests"
import { LeaderboardTeaser } from "@/components/leaderboard-teaser"
import { TechTermCard } from "@/components/tech-term-card"
import { StatsOverview } from "@/components/stats-overview"
// import { Chatbot } from "@/components/chatbot/chatbot"
import { AchievementsPreview } from "@/components/achievements-preview"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-6 animate-fadeIn">Welcome to TaxMate!</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <LearningPath />
        </div>

        <div className="flex flex-col space-y-6">
          
          <TechTermCard />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <StatsOverview />
        <DailyQuests />
        <LeaderboardTeaser />
      </div>

      <div className="mt-8">
        <AchievementsPreview />
      </div>

      {/* <Chatbot />/ */}
    </div>
  )
}

