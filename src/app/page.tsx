// app/page.tsx
import { HeroSection } from '@/components/home/HeroSection'
import { InfoSection } from '@/components/home/InfoSection'

export default function Home() {
  return (
      <main>
        <HeroSection />
        <InfoSection />
      </main>
  )
}