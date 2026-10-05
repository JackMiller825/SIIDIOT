import { BrainScan } from './components/BrainScan'
import { Community } from './components/Community'
import { ErrorBoundary } from './components/ErrorBoundary'
import { FailedTests } from './components/FailedTests'
import { FindEsc } from './components/FindEsc'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Hoard } from './components/Hoard'
import { Incident } from './components/Incident'
import { LabLog } from './components/LabLog'
import { MemeKit } from './components/MemeKit'
import { TokenFacts } from './components/TokenFacts'
import { MotionProvider } from './motion'

function Page() {
  return (
    <>
      <a className="skip" href="#content">
        Skip to content
      </a>
      <Header />
      <main id="content" tabIndex={-1}>
        <Hero />
        <Incident />
        <BrainScan />
        <FailedTests />
        <FindEsc />
        <Hoard />
        <LabLog />
        <TokenFacts />
        <Community />
        <MemeKit />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <ErrorBoundary>
      <MotionProvider>
        <Page />
      </MotionProvider>
    </ErrorBoundary>
  )
}
